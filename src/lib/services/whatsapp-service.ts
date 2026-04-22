// ============================================================
// DeVuelta — WhatsApp API Mock Service (Meta Integration)
// ============================================================

export interface WhatsAppMessage {
  to: string;
  templateName: string;
  language: string;
  components: any[];
}

export class WhatsAppService {
  /**
   * Simulates sending a message via Meta WhatsApp Business API
   */
  static async sendMessage(payload: WhatsAppMessage): Promise<{ success: boolean; messageId: string }> {
    console.log('--- WhatsApp API MOCK ---');
    console.log('Sending to:', payload.to);
    console.log('Template:', payload.templateName);
    console.log('Components:', JSON.stringify(payload.components, null, 2));
    console.log('-------------------------');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      success: true,
      messageId: `wa_msg_${Math.random().toString(36).slice(2, 9)}`
    };
  }

  /**
   * Helper to send a visit confirmation
   */
  static async sendVisitConfirmation(phone: string, customerName: string, cardName: string, progress: string) {
    return this.sendMessage({
      to: phone,
      templateName: 'visit_confirmation',
      language: 'es_MX',
      components: [
        { type: 'body', parameters: [
          { type: 'text', text: customerName },
          { type: 'text', text: cardName },
          { type: 'text', text: progress }
        ]}
      ]
    });
  }

  /**
   * Helper to send a reward unlocked notification
   */
  static async sendRewardNotification(phone: string, customerName: string, prize: string) {
    return this.sendMessage({
      to: phone,
      templateName: 'reward_unlocked',
      language: 'es_MX',
      components: [
        { type: 'body', parameters: [
          { type: 'text', text: customerName },
          { type: 'text', text: prize }
        ]}
      ]
    });
  }
}
