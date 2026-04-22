# DeVuelta

**Haz que tus clientes regresen.**

Programas de lealtad digitales en Apple Wallet y Google Wallet, sin app propia.

---

## 🛠 Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Motion | Framer Motion |
| Icons | Lucide React |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| State | React Context |
| Fonts | Inter + Instrument Serif |

## ✅ Estado actual del proyecto

La base visual y funcional está lista para demo, preventa y despliegue en Vercel:
- `npm run build` compila correctamente
- Landing pública mejorada con propuesta de valor más clara
- Onboarding, dashboard, programas, clientes y operaciones corren en modo demo
- El proyecto usa almacenamiento local/mock para demo, no backend multiusuario real todavía

## ⚠️ Limitaciones antes de vender como SaaS fully-managed

Estas piezas aún deben conectarse a infraestructura real antes de cobrar a múltiples negocios en producción:
- autenticación real
- persistencia real en base de datos
- integración real de Apple Wallet / Google Wallet
- integración real de WhatsApp / notificaciones
- manejo multi-tenant y auditoría persistente

## 🚀 Cómo correr localmente

```bash
# Clonar el repo
git clone <repo-url>
cd devuelta

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local

# Iniciar desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## ▲ Deploy en Vercel

El proyecto está configurado para construir con:

```bash
npm run build
```

Checklist recomendado para Vercel:

1. Importa el repositorio en Vercel.
2. Framework preset: `Next.js`.
3. Build command: `npm run build`
4. Install command: `npm install`
5. Output directory: dejar vacío
6. Configura las variables de entorno necesarias desde `.env.example`

Si de momento solo quieres demo comercial, puede desplegarse sin Supabase siempre que no dependas de backend real.

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── (app)/            # App layout con sidebar
│   │   └── app/
│   │       ├── dashboard/
│   │       ├── programs/
│   │       ├── customers/
│   │       ├── operations/
│   │       ├── analytics/
│   │       └── settings/
│   ├── (auth)/           # Auth layout
│   │   ├── login/
│   │   └── signup/
│   ├── onboarding/       # 7-step onboarding wizard
│   ├── enroll/           # Public customer enrollment
│   │   └── [businessSlug]/[programSlug]/
│   ├── pass/             # Public pass view
│   │   └── [membershipId]/
│   ├── globals.css       # Design system tokens
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/
│   ├── features/
│   │   └── pass/         # DigitalPassCard
│   └── landing/          # Landing page sections
└── lib/
    ├── demo/             # Demo data & templates
    ├── wallet/           # Wallet abstraction layer
    ├── types.ts          # Domain types
    └── utils.ts          # Utilities
```

## 🎭 Modo Demo

La app funciona completamente sin una instancia real de Supabase:
- Auth simulada: login redirige al dashboard sin verificación
- Datos demo: 30 clientes, 3 programas, 42 membresías, actividad realista
- Wallet demo: botones de Apple/Google Wallet con mensajería clara
- Persistencia local: los cambios viven en el navegador vía Zustand persist

## 🔗 Conectar backend real

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ejecuta el schema SQL en la base de datos
3. Configura las variables en `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
4. Instala `@supabase/supabase-js` y `@supabase/ssr`
5. Crea los clientes en `lib/supabase/`

## 📱 Wallet Integration

La app usa una capa de abstracción desacoplada:

```typescript
interface WalletService {
  createPass(data: WalletPassData): Promise<WalletPassResult>;
  updatePass(serialNumber: string, updates): Promise<void>;
  revokePass(serialNumber: string): Promise<void>;
  getPassStatus(serialNumber: string): Promise<PassStatus>;
}
```

**Para activar Apple Wallet:**
1. Obtén un Pass Type ID y certificado en Apple Developer
2. Configura las variables `APPLE_WALLET_*` en `.env`
3. Implementa `AppleWalletAdapter` usando `passkit-generator`

**Para activar Google Wallet:**
1. Crea una cuenta de servicio en Google Cloud
2. Configura `GOOGLE_WALLET_*` en `.env`
3. Implementa `GoogleWalletAdapter` usando `@googleapis/walletobjects`

## 🗂 Rutas principales

| Ruta | Descripción |
|------|-------------|
| `/` | Landing pública |
| `/login` | Iniciar sesión |
| `/signup` | Crear cuenta |
| `/onboarding` | Setup del negocio (7 pasos) |
| `/app/dashboard` | Dashboard principal |
| `/app/programs` | Gestión de programas |
| `/app/programs/new` | Crear programa |
| `/app/customers` | CRM de clientes |
| `/app/operations` | Terminal staff (POS) |
| `/app/analytics` | Métricas y charts |
| `/app/settings` | Configuración |
| `/enroll/[biz]/[prog]` | Inscripción pública |
| `/pass/[id]` | Vista del pase |

## 📐 Database Schema

Ver `src/lib/types.ts` para los tipos completos. Entidades principales:
- `businesses` (multi-tenant)
- `locations`
- `users` (roles: superadmin, business_admin, staff)
- `loyalty_programs` (visits, points, fixed_reward)
- `customers`
- `memberships` (con wallet tracking)
- `visits` (con idempotency key)
- `rewards` / `redemptions`
- `audit_logs`

## 🔒 Seguridad

- Auth por Supabase (cuando se conecte)
- Validación de formularios con Zod
- Slugs business-scoped (no globales)
- Idempotency keys anti-duplicado en visitas
- Cooldown configurable por programa
- Reward redemption single-use (unique FK)
- Tenant isolation en base de datos

---

Built with 💚 by the DeVuelta team.
