import { 
  IMembershipRepository, 
  IVisitRepository, 
  IRewardRepository, 
  IRedemptionRepository, 
  IAuditRepository,
  IProgramRepository
} from '../repositories/base';
import { Membership, LoyaltyProgram, Visit, Reward, Redemption } from '../types';
import { WhatsAppService } from './whatsapp-service';

export class LoyaltyService {
  constructor(
    private programs: IProgramRepository,
    private memberships: IMembershipRepository,
    private visits: IVisitRepository,
    private rewards: IRewardRepository,
    private redemptions: IRedemptionRepository,
    private audit: IAuditRepository
  ) {}

  async recordVisit(membershipId: string, locationId: string, staffId: string, notes?: string): Promise<{ success: boolean; message: string; rewardUnlocked?: boolean }> {
    const membership = await this.memberships.getById(membershipId);
    if (!membership) return { success: false, message: 'Membresía no encontrada' };

    const program = await this.programs.getById(membership.programId);
    if (!program) return { success: false, message: 'Programa no encontrado' };

    // Check cooldown
    if (membership.lastVisitAt) {
      const lastVisit = new Date(membership.lastVisitAt).getTime();
      const now = Date.now();
      const diffMinutes = (now - lastVisit) / (1000 * 60);
      if (diffMinutes < program.visitCooldownMinutes) {
        const remaining = Math.ceil(program.visitCooldownMinutes - diffMinutes);
        return { 
          success: false, 
          message: `Límite de tiempo: Faltan ${remaining} min. para el siguiente registro.` 
        };
      }
    }

    // Add visit record
    await this.visits.create({
      membershipId,
      locationId,
      recordedBy: staffId,
      visitType: 'visit',
      pointsAdded: program.programType === 'points' ? (program.pointsPerUnit || 1) : 0,
      idempotencyKey: `v_${Date.now()}`,
      notes
    });

    // Update membership
    const updates: Partial<Membership> = {
      currentVisits: membership.currentVisits + 1,
      totalVisits: membership.totalVisits + 1,
      lastVisitAt: new Date().toISOString()
    };

    let rewardUnlocked = false;
    if (updates.currentVisits! >= program.goalValue) {
      rewardUnlocked = true;
      await this.rewards.create({
        membershipId,
        programId: program.id,
        status: 'available'
      });
      // Optionally reset current visits if "multiple rewards" is not enabled, 
      // but usually we keep them and allow redemption.
      // For this MVP, we'll keep the visits and just check total rewards.
      updates.rewardsEarned = membership.rewardsEarned + 1;
    }

    await this.memberships.update(membershipId, updates);

    // Log activity
    await this.audit.log({
      businessId: membership.businessId,
      userId: staffId,
      action: 'RECORD_VISIT',
      entityType: 'membership',
      entityId: membershipId,
      metadata: { locationId, rewardUnlocked }
    });

    // Trigger WhatsApp Notification
    WhatsAppService.sendVisitNotification(membershipId, 'visit_recorded').catch(console.error);

    return { 
      success: true, 
      message: rewardUnlocked ? '¡Visita registrada y recompensa desbloqueada!' : '¡Visita registrada con éxito!',
      rewardUnlocked 
    };
  }

  async redeemReward(membershipId: string, locationId: string, staffId: string, notes?: string): Promise<{ success: boolean; message: string }> {
    const rewards = await this.rewards.getByMembership(membershipId);
    const availableReward = rewards.find(r => r.status === 'available');

    if (!availableReward) {
      return { success: false, message: 'No hay recompensas disponibles para canjear.' };
    }

    const membership = await this.memberships.getById(membershipId);
    if (!membership) return { success: false, message: 'Membresía no encontrada' };

    const program = await this.programs.getById(membership.programId);
    if (!program) return { success: false, message: 'Programa no encontrado' };

    // Mark reward as redeemed
    await this.rewards.update(availableReward.id, { status: 'redeemed' });

    // Create redemption record
    await this.redemptions.create({
      rewardId: availableReward.id,
      membershipId,
      locationId,
      redeemedBy: staffId,
      notes
    });

    // Update membership counters
    await this.memberships.update(membershipId, {
      currentVisits: Math.max(0, membership.currentVisits - program.goalValue),
      rewardsRedeemed: membership.rewardsRedeemed + 1
    });

    // Log activity
    await this.audit.log({
      businessId: membership.businessId,
      userId: staffId,
      action: 'REDEEM_REWARD',
      entityType: 'reward',
      entityId: availableReward.id,
      metadata: { locationId, membershipId }
    });

    // Trigger WhatsApp Notification
    if (membership.id) {
       WhatsAppService.sendVisitConfirmation(
         '5551234567', // Mock phone
         'Cliente', 
         'Tarjeta', 
         'Progress'
       ).catch(console.error);
    }

    return { success: true, message: '¡Recompensa canjeada con éxito!' };
  }
}
