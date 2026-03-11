# Crealo — Deploy en Vercel (10 minutos)

## Lo que necesitás
- Cuenta en vercel.com (gratis)
- Cuenta en console.anthropic.com (para la API key)
- Esta carpeta

---

## Paso 1 — Conseguí tu API Key de Anthropic
1. Entrá a https://console.anthropic.com
2. Registrate o iniciá sesión
3. Andá a **API Keys** en el menú lateral
4. Hacé click en **Create Key**
5. Copiá la key (empieza con `sk-ant-...`) — guardala, la usás en el Paso 3

---

## Paso 2 — Subí el proyecto a Vercel
1. Entrá a https://vercel.com y creá una cuenta (gratis)
2. En el dashboard, hacé click en **Add New → Project**
3. Elegí **"Deploy without Git"** o arrastrá esta carpeta
   - También podés subir a GitHub primero y conectar el repo
4. Vercel detecta automáticamente la estructura

---

## Paso 3 — Configurá la API Key como variable de entorno
1. En Vercel, antes de hacer deploy, buscá la sección **Environment Variables**
2. Agregá:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** tu key (`sk-ant-...`)
3. Hacé click en **Deploy**

---

## Paso 4 — Configurá tu número de WhatsApp
1. Una vez deployado, abrí el archivo `index.html`
2. Buscá esta línea:
   ```
   const WAPP = '5491100000000';
   ```
3. Reemplazá con tu número:
   - Formato: `549` + código de área sin 0 + número sin 15
   - Ejemplo CABA: `5491155554444`
4. Volvé a hacer deploy

---

## Estructura del proyecto
```
crealo/
├── api/
│   └── generate.js     ← Backend (llama a Anthropic de forma segura)
├── index.html          ← El app completo
├── vercel.json         ← Configuración de Vercel
└── INSTRUCCIONES.md    ← Este archivo
```

---

## ¿Por qué este enfoque?
Tu API key nunca queda expuesta en el browser.
El frontend llama a `/api/generate` (tu propio servidor en Vercel),
que a su vez llama a Anthropic con la key guardada de forma segura.
