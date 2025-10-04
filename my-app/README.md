# 🐷 Chanchito App - Aplicación de Ahorro

Una moderna aplicación de ahorro desarrollada con Next.js, React y Tailwind CSS que permite a los usuarios crear metas de ahorro individuales y grupales, mientras que las empresas pueden ofrecer productos y descuentos exclusivos.

## 🌟 Características Principales

### Para Usuarios
- **Registro e Inicio de Sesión**: Formulario elegante con validaciones
- **Dashboard Personal**: Vista de saldo, metas y estadísticas
- **Metas de Ahorro**: 
  - Individuales y grupales
  - Iconos personalizables
  - Seguimiento visual del progreso
  - Alimentar metas con dinero
- **Unirse a Metas**: Código para metas grupales
- **Ofertas Exclusivas**: Descuentos de empresas para ahorradores

### Para Empresas
- **Registro de Empresa**: Con selección de sector
- **Dashboard Empresarial**: Estadísticas y gestión de productos
- **Gestión de Productos**: Agregar productos con descuentos
- **Ofertas para Ahorradores**: Crear promociones especiales

## 🎨 Diseño y UX

- **Gradientes Modernos**: Colores vibrantes inspirados en las imágenes de referencia
- **Animaciones Suaves**: Transiciones y efectos hover
- **Ventanas Flotantes**: Modales elegantes para formularios
- **Diseño Responsivo**: Adaptable a todos los dispositivos
- **Iconografía Rica**: Emojis y iconos de Lucide React

## 🛠️ Tecnologías Utilizadas

- **Next.js 15**: Framework de React con TypeScript
- **React 19**: Biblioteca de UI
- **Tailwind CSS**: Framework de estilos utilitarios
- **Lucide React**: Iconos modernos
- **Framer Motion**: Animaciones avanzadas

## 📂 Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx                 # Página principal con navegación
│   ├── layout.tsx              # Layout global
│   └── globals.css             # Estilos globales
└── components/
    ├── usuario/
    │   ├── form_usuario_inicial.tsx    # Registro/Login de usuario
    │   ├── ventana_meta.tsx           # Dashboard principal
    │   ├── form_agregar_meta.tsx      # Modal crear meta
    │   ├── form_alimentar.tsx         # Modal agregar dinero
    │   └── form_codigo_meta.tsx       # Modal unirse a meta
    └── emprendedor/
        └── form.tsx                   # Registro/Dashboard empresa
```

## 🚀 Funcionalidades Implementadas

### Componentes de Usuario

1. **FormUsuarioInicial**
   - Toggle entre registro e inicio de sesión
   - Validación de email y contraseña
   - Diseño con gradientes y animaciones

2. **VentanaMeta**
   - Dashboard con saldo total y estadísticas
   - Grid de metas con progreso visual
   - Acciones rápidas (agregar meta, unirse, ofertas)
   - Cards de ofertas destacadas

3. **FormAgregarMeta**
   - Selección de iconos predefinidos
   - Metas individuales o grupales
   - Validación de formularios
   - Interfaz intuitiva

4. **FormAlimentar**
   - Vista previa del progreso
   - Montos rápidos
   - Barra de progreso animada
   - Cálculo automático de porcentajes

5. **FormCodigoMeta**
   - Validación de código
   - Instrucciones claras
   - Formato automático de código

### Componentes de Empresa

1. **FormEmprendedor**
   - Registro con selección de sector
   - Dashboard con estadísticas
   - Gestión de productos
   - Modal para agregar productos

## 🎯 Cómo Usar la Aplicación

### Vista Usuario
1. **Registro**: Completa nombre, email y contraseña
2. **Dashboard**: Ve tu saldo y metas actuales
3. **Crear Meta**: Elige objetivo, monto, icono y tipo
4. **Alimentar Meta**: Agrega dinero a tus objetivos
5. **Unirse a Meta**: Usa código para metas grupales
6. **Ver Ofertas**: Descuentos exclusivos para ahorradores

### Vista Empresa
1. **Registro**: Nombre, sector, email y contraseña
2. **Dashboard**: Ve estadísticas de ventas y productos
3. **Agregar Productos**: Nombre, imagen, precio y descuento
4. **Gestionar Ofertas**: Crear promociones para usuarios

## 🔄 Navegación

- **Botón "Vista Empresa"**: Cambia a la interfaz empresarial
- **Botón "Vista Usuario"**: Cambia a la interfaz de usuario
- **Botón "Cerrar Sesión"**: Vuelve al login

## 🎨 Paleta de Colores

- **Primarios**: Rosa (#ec4899) y Violeta (#8b5cf6)
- **Secundarios**: Cian (#06b6d4) y Esmeralda (#10b981)
- **Acentos**: Azul (#3b82f6) y Púrpura (#a855f7)

## 📱 Características de UX

- **Animaciones de entrada**: Ventanas flotantes con efectos suaves
- **Hover effects**: Escalado y cambios de color
- **Feedback visual**: Estados de loading y validación
- **Gradientes**: Fondos atractivos en headers y botones
- **Tipografía**: Jerarquía clara con Inter font

## 🔧 Instalación y Desarrollo

1. Clona el repositorio
2. Instala dependencias: `npm install`
3. Ejecuta el servidor de desarrollo: `npm run dev`
4. Abre `http://localhost:3000`

## 🚀 Próximas Mejoras

- Autenticación real con base de datos
- Integración con pasarelas de pago
- Notificaciones push
- Chat grupal para metas compartidas
- Analytics avanzados para empresas
- API REST para integración móvil

---

Desarrollado con ❤️ usando las mejores prácticas de desarrollo web moderno.
