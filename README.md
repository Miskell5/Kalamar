# Kalamar 🦑

Control de gastos personal con voz e IA. Clon web de MonAi.

---

## 🚀 Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | React 19 + TypeScript 6 |
| Build | Vite 8 |
| Estilos | Tailwind CSS 4 |
| Base de datos local | Dexie (IndexedDB) |
| Backend / Auth | Supabase (PostgreSQL + Auth) |
| PWA | vite-plugin-pwa (instalable en móvil) |
| Voz | Web Speech API (SpeechRecognition) |
| Hosting | Vercel |

## 📁 Estructura del proyecto

```
src/
├── components/       # Componentes React
│   ├── AuthPage.tsx           # Login / Registro
│   ├── Header.tsx             # Balance total
│   ├── TransactionList.tsx    # Lista de movimientos
│   ├── VoiceModal.tsx         # Modal de entrada por voz/texto
│   ├── EditTransactionModal.tsx # Editar/eliminar movimientos
│   ├── BudgetList.tsx         # Presupuestos con barras de progreso
│   └── BudgetModal.tsx        # Crear/editar presupuestos
├── contexts/
│   └── AuthContext.tsx         # Contexto de autenticación
├── db/
│   ├── database.ts            # Conexión Dexie + esquemas
│   ├── types.ts               # Tipos de datos
│   └── categories.ts          # Categorías por defecto
├── hooks/
│   └── useVoiceInput.ts       # Reconocimiento de voz + parser NLP
├── lib/
│   └── supabase.ts            # Cliente Supabase
├── types/
│   └── speech.d.ts            # Tipos para Web Speech API
├── App.tsx                    # Componente principal
├── main.tsx                   # Punto de entrada
└── index.css                  # Estilos globales
```

## ✅ Funcionalidades implementadas

### 1. Entrada por voz y texto
- Reconocimiento de voz (Web Speech API) con español latino
- Parser NLP que interpreta lenguaje natural:
  - `"gasté 45 en uber"` → Gasto, $45, Transporte
  - `"recibí 1500 de salario"` → Ingreso, $1500, Salario
  - `"cena 32 ayer"` → Gasto, $32, Comida
- 15 categorías predefinidas con detección automática
- Modal de confirmación antes de guardar

### 2. Balance y movimientos
- Balance total (ingresos - gastos)
- Resumen de ingresos y gastos del período
- Lista en tiempo real con iconos por categoría
- Al hacer tap: editar todos los campos (tipo, monto, descripción, categoría, fecha)
- Eliminar con confirmación

### 3. Autenticación (Supabase)
- Login / Registro con email y contraseña
- Sesión persistente
- Datos protegidos por usuario (Row Level Security en Supabase)

### 4. Presupuestos mensuales
- Crear presupuesto por categoría de gasto
- Barra de progreso visual:
  - 🟢 Verde = dentro del límite
  - 🟡 Amarillo = >80% usado
  - 🔴 Rojo = excedido
- Editar o eliminar presupuesto al tocar la tarjeta
- El botón "+ Nuevo" siempre visible

### 5. PWA
- Instalable en la pantalla de inicio (como app nativa)
- Service worker con auto-actualización
- Modo standalone sin barra de navegación

## 📋 Funcionalidades pendientes

### Prioridad media
- **Gastos recurrentes** — Suscripciones que se agregan automáticamente cada mes
- **IA / Insights** — Chat tipo "¿cuánto gasté en comida este mes?" con respuestas inteligentes

### Prioridad baja
- **Multi-moneda** — Soporte para diferentes divisas
- **Listas compartidas** — Gastos en pareja/grupo
- **Exportación de datos** — PDF, CSV
- **OCR de recibos** — Escanear ticket y extraer datos
- **Widgets** — Atajos desde la pantalla de inicio
- **Tema claro/oscuro**

## 🔧 Cómo desarrollar

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Type-check
npx tsc --noEmit

# Build de producción
npm run build

# Lint
npm run lint
```

## ☁️ Cómo desplegar

### Vercel (producción)

```bash
# Login (una vez)
npx vercel login

# Deploy a producción
npm run build && npx vercel --prod
```

### Supabase (base de datos + auth)

1. Crear proyecto en [supabase.com](https://supabase.com)
2. En **Project Settings → API** copiar URL y anon key
3. Crear `.env`:
   ```
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key
   ```
4. En el **SQL Editor** ejecutar `supabase-schema.sql`
5. En **Authentication → Providers** activar **Email**
6. En **Authentication → Settings** configurar:
   - **Site URL**: `https://kalamar.vercel.app`
   - **Redirect URLs**: `https://kalamar.vercel.app/**`

### Variables de entorno en Vercel

Agregar en **Project → Settings → Environment Variables**:

| Name | Value |
|---|---|
| `VITE_SUPABASE_URL` | URL del proyecto |
| `VITE_SUPABASE_ANON_KEY` | Anon key pública |

## 🌐 URLs

| Entorno | URL |
|---|---|
| Producción | https://kalamar.vercel.app |
| GitHub | https://github.com/Miskell5/Kalamar |
| Supabase | https://supabase.com/dashboard/project/ygohliketkbtedkhxdhh |

## 🤖 Reglas para la IA al retomar

- **Siempre leer este README primero** antes de continuar
- Los datos se guardan en IndexedDB (Dexie) localmente + Supabase en la nube
- El parser NLP está en `src/hooks/useVoiceInput.ts` — expandir diccionario de categorías ahí
- Los componentes nuevos van en `src/components/`
- Los tipos nuevos en `src/db/types.ts`
- Los schemas de Dexie se versionan en `src/db/database.ts` (incrementar versión al agregar tablas)
- Mantener el diseño minimalista / dark theme / colores rosa y esmeralda
- CSS con Tailwind únicamente (no CSS modules ni archivos de estilo separados)
- Commit y push después de cada feature completa
- Preguntar al usuario antes de cambios arquitectónicos grandes
- La app es mobile-first (PWA para iPhone/Android)
