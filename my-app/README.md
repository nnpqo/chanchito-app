# 🐷 Chanchito App - La Mejor App de Ahorro de Bolivia

Una revolucionaria aplicación de ahorro desarrollada con Next.js, React y Tailwind CSS que transforma la manera de ahorrar en Bolivia. Con funcionalidades de metas individuales y grupales, pagos QR, ofertas exclusivas y mucho más.

## 🌟 Características Principales

### 🏠 Landing Page Impresionante
- **Diseño Moderno**: Gradientes vibrantes y animaciones suaves
- **Empresas Aliadas**: Showcase de más de 200 empresas partners
- **Testimonios Reales**: Historias de usuarios satisfechos
- **Sección QR**: Explicación del sistema de pagos
- **Call-to-Actions**: Botones intuitivos para registro

### 👤 Para Usuarios
- **Registro Elegante**: Formulario con toggle login/registro
- **Dashboard Interactivo**: Vista de saldo, metas y estadísticas en tiempo real
- **Metas de Ahorro Inteligentes**: 
  - Individuales y grupales con códigos de invitación
  - 8 iconos personalizables (🏠🚗✈️🎓⚕️💼💒🆘)
  - Barras de progreso animadas
  - Sistema de alimentación con animación del chanchito
- **Transferencias QR**: 
  - Integración simulada con bancos bolivianos
  - Proceso paso a paso (Monto → QR → Confirmación)
  - Soporte para 6 montos rápidos (50-2000 Bs)
- **Gestión de Metas**: 
  - Eliminar metas con reembolso automático
  - Dinero estático hasta completar o cancelar meta
- **Ofertas Exclusivas**: Marketplace con filtros y búsqueda avanzada

### 🏢 Para Empresas
- **Registro Empresarial**: 12 sectores disponibles
- **Dashboard Avanzado**: Estadísticas de ventas, productos y conversión
- **Gestión de Productos**: 
  - Subida de imágenes con preview
  - Precios en Bolivianos (Bs)
  - Sistema de descuentos
  - Categorización automática
- **Panel de Ofertas**: Crear promociones para usuarios ahorradores

## 🎨 Experiencia de Usuario (UX/UI)

### Animaciones y Efectos
- **Chanchito Animado**: Aparece al alimentar metas con mensajes motivacionales
- **Micro-interacciones**: Hover effects, escalado y rotaciones suaves
- **Transiciones Fluidas**: Entre pantallas y estados
- **Elementos Flotantes**: Ventanas modales con backdrop blur

### Paleta de Colores Boliviana
- **Primarios**: Rosa (#ec4899), Violeta (#8b5cf6), Cian (#06b6d4)
- **Gradientes**: Combinaciones armoniosas inspiradas en el atardecer altiplánico
- **Acentos**: Verde esmeralda para éxito, rojo para alertas

### Tipografía y Legibilidad
- **Inputs Mejorados**: Texto oscuro visible, placeholders claros
- **Jerarquía Visual**: Tamaños y pesos coherentes
- **Íconos Expresivos**: Emojis + Lucide React para máxima claridad

## 🛠️ Tecnologías de Vanguardia

- **Next.js 15** con App Router
- **React 19** con hooks modernos
- **TypeScript** para desarrollo robusto
- **Tailwind CSS** con configuración personalizada
- **Framer Motion** para animaciones profesionales
- **Lucide React** para iconografía consistente

## 💳 Sistema de Pagos QR (Simulado)

### Bancos Compatibles Simulados
- 🏦 Banco Nacional de Bolivia
- 🏪 Banco Mercantil Santa Cruz  
- 🏛️ Banco de Crédito
- 💳 Banco Económico

### Flujo de Pago
1. **Selección de Monto**: Input inteligente + montos rápidos
2. **Generación QR**: Código visual animado
3. **Simulación**: 90% éxito, 10% error para realismo
4. **Confirmación**: Animación de éxito con actualización de saldo

*Nota: En producción se integraría con APIs bancarias reales*

## 📱 Funcionalidades Destacadas

### Metas de Ahorro
- **Progreso Visual**: Barras animadas con porcentajes
- **Estados Dinámicos**: Pendiente → En Progreso → Completada
- **Reembolsos**: Sistema de cancelación con devolución automática
- **Códigos Grupales**: Sistema alfanumérico de 6-10 caracteres

### Ofertas Marketplace
- **Filtros Avanzados**: Por categoría, precio, rating, descuento
- **Búsqueda Inteligente**: Por nombre de producto o empresa
- **Ordenamiento**: Descuento, precio, valoración
- **Vigencia**: Contador de días restantes

### Dashboard Empresarial
- **KPIs en Tiempo Real**: Productos, ventas, clientes, conversión
- **Gestión Visual**: Grid de productos con imágenes
- **Upload de Archivos**: Drag & drop con preview instantáneo

## 🏗️ Arquitectura del Proyecto

```
src/
├── app/
│   ├── page.tsx              # Orquestador principal
│   ├── layout.tsx           # Layout global
│   └── globals.css          # Estilos personalizados
└── components/
    ├── LandingPage.tsx      # Página de inicio
    ├── OfertasPage.tsx      # Marketplace de ofertas
    ├── QRPayment.tsx        # Sistema de pagos QR
    ├── usuario/
    │   ├── form_usuario_inicial.tsx  # Auth de usuario
    │   ├── ventana_meta.tsx         # Dashboard principal
    │   ├── form_agregar_meta.tsx    # Modal crear meta
    │   ├── form_alimentar.tsx       # Modal agregar dinero
    │   └── form_codigo_meta.tsx     # Modal unirse a meta
    └── emprendedor/
        └── form.tsx                 # Panel empresarial
```

## 🎯 Navegación y Estados

### Estados de la Aplicación
- `landing` → Página inicial con opciones
- `login/register` → Autenticación de usuario
- `dashboard` → Panel principal del usuario
- `business` → Panel empresarial

### Modales Disponibles
- Agregar Meta
- Alimentar Meta (con animación chanchito)
- Código Meta Grupal
- Ofertas Marketplace
- Transferencia QR
- Confirmación de Eliminación

## 🚀 Cómo Usar la Aplicación

### Primera Vez
1. **Landing Page**: Explora características y empresas aliadas
2. **Registro**: Elige entre usuario o empresa
3. **Bienvenida**: Tutorial automático de funcionalidades

### Usuario Día a Día
1. **Ver Saldo**: Dashboard con total y estadísticas
2. **Transferir QR**: Agregar dinero desde app bancaria
3. **Crear Meta**: Objetivo, monto, icono, tipo (individual/grupal)
4. **Alimentar Chanchito**: Agregar dinero con animación
5. **Explorar Ofertas**: Descuentos exclusivos por ser ahorrador
6. **Invitar Amigos**: Compartir códigos para metas grupales

### Empresa Partner
1. **Dashboard**: Ver estadísticas de rendimiento
2. **Agregar Productos**: Subir imagen, precio, descuento
3. **Gestionar Ofertas**: Crear promociones para ahorradores
4. **Analizar Ventas**: KPIs y métricas de conversión

## � Innovaciones Técnicas

### Animaciones Inteligentes
- **Chanchito Feedback**: Aparece al agregar dinero con física realista
- **Progress Bars**: Animación gradual que respeta el timing humano
- **Micro-interactions**: Cada click tiene respuesta visual

### Gestión de Estado
- **Estados Persistentes**: Saldo, metas y ofertas conservados
- **Reactividad**: Cambios instantáneos en toda la UI
- **Validaciones**: Tiempo real con feedback visual

### Performance
- **Lazy Loading**: Componentes cargados bajo demanda
- **Optimizaciones**: Imágenes, animaciones y re-renders minimizados
- **Responsive**: Adaptación fluida a cualquier dispositivo

## 🔮 Futuras Mejoras

### Versión 2.0
- **APIs Bancarias Reales**: Integración con QR boliviano oficial
- **Notificaciones Push**: Recordatorios y logros
- **Chat Grupal**: Comunicación en metas compartidas
- **Gamificación**: Badges, streaks y recompensas
- **IA Personalizada**: Recomendaciones de ahorro inteligentes

### Expansión
- **App Móvil Nativa**: iOS y Android
- **Más Países**: Argentina, Perú, Ecuador
- **Criptomonedas**: Integración con stablecoins

## 🎉 ¿Por qué Chanchito App?

- ✅ **100% Boliviano**: Diseñado para nuestra cultura financiera
- ✅ **Fácil de Usar**: Interfaz intuitiva para todas las edades  
- ✅ **Motivacional**: Gamificación que impulsa el ahorro
- ✅ **Social**: Metas grupales que fortalecen vínculos
- ✅ **Beneficios Reales**: Descuentos exclusivos por ahorrar
- ✅ **Seguro**: Tecnología de última generación
- ✅ **Gratuito**: Sin comisiones ni costos ocultos

---

**¡Tu futuro financiero comienza con un simple "oink"! 🐷💰**

*Desarrollado con ❤️ en Bolivia para bolivianos que sueñan en grande.*
