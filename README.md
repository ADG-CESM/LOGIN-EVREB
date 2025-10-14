Este repositorio contiene la aplicación de ejemplo para el portal de autenticación del CCH, creada con Next.js (App Router) y NextAuth para el manejo de sesiones.

## Instalación y uso

Primero instala las dependencias:

```bash
npm install
```

### Instalación detallada

Si quieres una instalación reproducible en CI o entornos limpios, usa:

```bash
npm ci
```

Nota para Windows: algunas dependencias (por ejemplo `bcrypt`) tienen módulos nativos y requieren herramientas de compilación (Build Tools). Si la instalación falla en Windows, asegúrate de tener instaladas las "Build Tools for Visual Studio" o usa la alternativa `bcryptjs` durante desarrollo:

```powershell
# instalar las Build Tools (si no las tienes)
# desde PowerShell (ejecutar como administrador)
npm install --global windows-build-tools
```

O bien reemplazar `bcrypt` por `bcryptjs` en `package.json` para evitar builds nativos en entornos de desarrollo:

```bash
npm install bcryptjs
# y actualizar el import en código si es necesario
```

### Instalación en Linux (Debian/Ubuntu / Fedora)

Recomendado: instala Node.js con `nvm` o usando los paquetes oficiales de NodeSource para asegurar una versión compatible (Node 18+).

Debian / Ubuntu (ejemplo):

```bash
# instalar dependencias de compilación y libpq (necesario para pg)
sudo apt update
sudo apt install -y build-essential libpq-dev python3

# instalar nvm (opcional) y Node 18+
curl -fsSL https://fnm.vercel.app/install | bash # alternativa: fnm (Fast Node Manager)
# o usar NodeSource (ejemplo para Node 18)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

Fedora / CentOS (ejemplo):

```bash
sudo dnf install -y gcc-c++ make libpq-devel python3
# instalar Node (ejemplo con NodeSource)
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo dnf install -y nodejs
```

Después de preparar el sistema, instala dependencias del proyecto:

```bash
npm install
```

Notas sobre `bcrypt` en Linux: suele compilar correctamente con `build-essential` y `python3` instalados. Si prefieres evitar compilación nativa en entornos de desarrollo, usa `bcryptjs`.

Variables de entorno:

Crea `.env.local` en la raíz del proyecto con al menos las siguientes variables (ejemplo):

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
NEXTAUTH_SECRET=una_frase_secreta_larga
NEXTAUTH_URL=http://localhost:3000
```

## Scripts útiles

Scripts disponibles (desde `package.json`):

```bash
npm run dev    # desarrollo (puerto 3000)
npm run build  # construir para producción
npm run start  # iniciar versión construida
npm run lint   # ejecutar eslint
```

Abre http://localhost:3000 en tu navegador para ver la aplicación en desarrollo.

## Despliegue

Para ejecutar en un servidor de producción local:

```bash
npm run build
npm run start
```

En plataformas como Vercel basta con configurar las variables de entorno en el dashboard y desplegar; Vercel detecta Next.js automáticamente.

## Estructura y puntos importantes

- `src/app` — rutas y páginas (App Router).
- `src/app/api/auth/[...nextauth]/route.ts` — configuración de NextAuth (proveedores, adaptador, callbacks).
- `src/lib/db.ts` — conexión y utilidades para PostgreSQL.
- `src/app/ui` — componentes UI reutilizables (por ejemplo, `header.tsx`).

## Solución de problemas comunes

- Error de conexión a PostgreSQL: revisa que `DATABASE_URL` sea correcto y que el servidor acepte conexiones.
- Sesiones no persistentes o errores de cookie: asegúrate de `NEXTAUTH_SECRET` y `NEXTAUTH_URL` configurados.
- Problemas al instalar dependencias: verifica la versión de Node.js (usar Node 18+ recomendado).

Si necesitas ayuda adicional, crea un issue describiendo el problema y los pasos para reproducirlo.

```

```
