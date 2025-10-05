'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LandingPage from '../components/LandingPageNew'
import FormUsuarioInicial from '../components/usuario/form_usuario_inicial'
import VentanaMeta from '../components/usuario/ventana_meta_new'
import FormAgregarMeta from '../components/usuario/form_agregar_meta'
import FormAlimentar from '../components/usuario/form_alimentar'
import FormCodigoMeta from '../components/usuario/form_codigo_meta'
import FormEmprendedor from '../components/emprendedor/form'
import OfertasPage from '../components/OfertasPage'
import QRPayment from '../components/QRPayment'

// Import storage utilities
import { 
  UserData, 
  Meta, 
  saveUserData, 
  loadUserData,
  setCurrentUser,
  getCurrentUser,
  clearSession,
  generateId,
  generateMetaCode
} from '../utils/storage'

// Updated interfaces for TuChanchito
interface Usuario {
  nombre: string
  email: string
  saldo: number
  avatar?: string
}

interface Oferta {
  id: string
  titulo: string
  descuento: number
  empresa: string
  imagen: string
  categoria: string
  vigencia: string
  rating: number
  precio: number
  descripcion: string
  ubicacion: string
}
  fechaVencimiento: string
  rating: number
  disponible: boolean
}

interface Producto {
  id: string
  nombre: string
  precio: number
  descuento: number
  imagen?: string
  categoria: string
}

type ViewType = 'landing' | 'login' | 'dashboard' | 'business'

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('landing')
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [emprendedor, setEmprendedor] = useState<Emprendedor | null>(null)
  const [metas, setMetas] = useState<Meta[]>([
    {
      id: '1',
      nombre: 'Vacaciones en Brasil',
      montoObjetivo: 5000,
      montoActual: 2100,
      icono: '✈️',
      tipo: 'individual',
      fechaCreacion: '2024-01-15',
    },
    {
      id: '2',
      nombre: 'Casa nueva',
      montoObjetivo: 150000,
      montoActual: 45000,
      icono: '🏠',
      tipo: 'grupal',
      fechaCreacion: '2024-02-01',
      participantes: 3,
    },
    {
      id: '3',
      nombre: 'Auto familiar',
      montoObjetivo: 80000,
      montoActual: 12000,
      icono: '🚗',
      tipo: 'individual',
      fechaCreacion: '2024-03-10',
    }
  ])
  
  const [ofertas] = useState<Oferta[]>([
    {
      id: '1',
      titulo: 'Descuento en hoteles',
      descuento: 30,
      empresa: 'Booking.com',
      imagen: '',
      categoria: 'Viajes',
      precio: 500,
      descripcion: 'Hasta 30% de descuento en hoteles seleccionados',
      ubicacion: 'Todo el país',
      fechaVencimiento: '2024-12-31',
      rating: 4.5,
      disponible: true
    },
    {
      id: '2',
      titulo: 'Comida a domicilio',
      descuento: 25,
      empresa: 'UberEats',
      imagen: '',
      categoria: 'Alimentación',
      precio: 80,
      descripcion: '25% off en tu primer pedido',
      ubicacion: 'La Paz, Santa Cruz',
      fechaVencimiento: '2024-11-30',
      rating: 4.2,
      disponible: true
    },
    {
      id: '3',
      titulo: 'Ropa deportiva',
      descuento: 40,
      empresa: 'Nike',
      imagen: '',
      categoria: 'Deportes',
      precio: 350,
      descripcion: '40% de descuento en ropa deportiva',
      ubicacion: 'Tiendas físicas',
      fechaVencimiento: '2024-10-31',
      rating: 4.8,
      disponible: true
    }
  ])

  const [productos, setProductos] = useState<Producto[]>([])
  const [showAgregarMeta, setShowAgregarMeta] = useState(false)
  const [showAlimentar, setShowAlimentar] = useState(false)
  const [showCodigoMeta, setShowCodigoMeta] = useState(false)
  const [showOfertas, setShowOfertas] = useState(false)
  const [showQRPayment, setShowQRPayment] = useState(false)
  const [metaSeleccionada, setMetaSeleccionada] = useState<Meta | null>(null)

  const handleUserLogin = () => {
    const userData = {
      id: '1',
      nombre: 'Ana García',
      email: 'ana@email.com',
      saldo: 1250.75
    }
    setUsuario(userData)
    setCurrentView('dashboard')
  }

  const handleUserRegister = (userData: { nombre: string; email: string; password: string }) => {
    const newUser = {
      id: Date.now().toString(),
      nombre: userData.nombre,
      email: userData.email,
      saldo: 0
    }
    setUsuario(newUser)
    setCurrentView('dashboard')
  }

  const handleBusinessLogin = () => {
    const businessData = {
      id: '1',
      nombre: 'Mi Empresa',
      sector: 'Tecnología',
      email: 'empresa@email.com'
    }
    setEmprendedor(businessData)
    setCurrentView('business')
  }

  const handleAgregarMeta = (metaData: { nombre: string; montoObjetivo: number; icono: string; tipo: 'individual' | 'grupal' }) => {
    const nuevaMeta: Meta = {
      id: Date.now().toString(),
      ...metaData,
      montoActual: 0,
      fechaCreacion: new Date().toISOString().split('T')[0],
    }
    setMetas([...metas, nuevaMeta])
    setShowAgregarMeta(false)
  }

  const handleAlimentarMeta = (metaId: string, monto: number) => {
    if (usuario && usuario.saldo >= monto) {
      setMetas(metas.map(meta => 
        meta.id === metaId 
          ? { ...meta, montoActual: Math.min(meta.montoActual + monto, meta.montoObjetivo) }
          : meta
      ))
      setUsuario({ ...usuario, saldo: usuario.saldo - monto })
      setShowAlimentar(false)
      setMetaSeleccionada(null)
    }
  }

  const handleEliminarMeta = (metaId: string) => {
    const meta = metas.find(m => m.id === metaId)
    if (meta && usuario) {
      // Reembolsar dinero
      setUsuario({ ...usuario, saldo: usuario.saldo + meta.montoActual })
      // Eliminar meta
      setMetas(metas.filter(m => m.id !== metaId))
    }
  }

  const handleUnirseAMeta = (codigo: string) => {
    // Simulación de unirse a meta grupal
    console.log(`Uniéndose a meta con código: ${codigo}`)
    setShowCodigoMeta(false)
  }

  const handleQRPaymentSuccess = (amount: number) => {
    if (usuario) {
      setUsuario({ ...usuario, saldo: usuario.saldo + amount })
    }
    setShowQRPayment(false)
  }

  const handleLogout = () => {
    setUsuario(null)
    setEmprendedor(null)
    setCurrentView('landing')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LandingPage
              onUserLogin={() => setCurrentView('login')}
              onBusinessLogin={() => setCurrentView('business')}
            />
          </motion.div>
        )}

        {currentView === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <FormUsuarioInicial
              onLogin={handleUserLogin}
              onRegister={handleUserRegister}
              onBack={() => setCurrentView('landing')}
            />
          </motion.div>
        )}

        {currentView === 'dashboard' && usuario && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <VentanaMeta
              usuario={usuario}
              metas={metas}
              ofertas={ofertas.slice(0, 3)}
              onAgregarMeta={() => setShowAgregarMeta(true)}
              onAlimentarMeta={(meta) => {
                setMetaSeleccionada(meta)
                setShowAlimentar(true)
              }}
              onEliminarMeta={handleEliminarMeta}
              onUnirseAMeta={() => setShowCodigoMeta(true)}
              onVerOfertas={() => setShowOfertas(true)}
              onQRPayment={() => setShowQRPayment(true)}
              onLogout={handleLogout}
            />
          </motion.div>
        )}

        {currentView === 'business' && (
          <motion.div
            key="business"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <FormEmprendedor
              emprendedor={emprendedor}
              productos={productos}
              onProductosChange={setProductos}
              onLogin={handleBusinessLogin}
              onLogout={handleLogout}
              onBack={() => setCurrentView('landing')}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modales */}
      <FormAgregarMeta
        isOpen={showAgregarMeta}
        onClose={() => setShowAgregarMeta(false)}
        onSubmit={handleAgregarMeta}
      />

      <FormAlimentar
        isOpen={showAlimentar}
        meta={metaSeleccionada}
        saldoDisponible={usuario?.saldo || 0}
        onClose={() => {
          setShowAlimentar(false)
          setMetaSeleccionada(null)
        }}
        onSubmit={handleAlimentarMeta}
      />

      <FormCodigoMeta
        isOpen={showCodigoMeta}
        onClose={() => setShowCodigoMeta(false)}
        onSubmit={handleUnirseAMeta}
      />

      <OfertasPage
        isOpen={showOfertas}
        ofertas={ofertas}
        onClose={() => setShowOfertas(false)}
      />

      <QRPayment
        isOpen={showQRPayment}
        onClose={() => setShowQRPayment(false)}
        onSuccess={handleQRPaymentSuccess}
      />
    </div>
  )
}