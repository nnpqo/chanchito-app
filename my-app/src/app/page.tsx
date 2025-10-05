'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Primera_vista from '@/components/Primera_vista'
import FormUsuarioInicial from '../components/usuario/form_usuario_inicial'
import VentanaMeta from '../components/usuario/ventana_meta'
import FormAgregarMeta from '../components/usuario/form_agregar_meta'
import FormAlimentar from '../components/usuario/form_alimentar'
import FormCodigoMeta from '../components/usuario/form_codigo_meta'
import FormEmprendedor from '../components/emprendedor/form'
import OfertasPage from '../components/OfertasPage'
import QRPayment from '../components/QRPayment'
import { Meta, UserData, BusinessData, Producto, saveUserData, loadUserData, saveBusinessData, loadBusinessData, generateId } from '@/utils/storage'

// Interfaces adicionales para componentes
interface Usuario {
  id: string
  nombre: string
  email: string
  saldo: number
}

interface Emprendedor {
  id: string
  nombre: string
  sector: string
  email: string
}

interface Oferta {
  id: string
  titulo: string
  descuento: number
  empresa: string
  imagen: string
  categoria: string
  precio: number
  descripcion: string
  ubicacion: string
  vigencia: string
  precioOriginal: number
  rating: number
  disponible: boolean
}

type ViewType = 'landing' | 'user-auth' | 'user-register' | 'user-dashboard' | 'business-auth' | 'business-dashboard' | 'offers' | 'qr-payment'

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('landing')
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [emprendedor, setEmprendedor] = useState<Emprendedor | null>(null)
  const [metas, setMetas] = useState<Meta[]>([
    {
      id: '1',
      objetivo: 'Vacaciones en Brasil',
      monto: 5000,
      montoActual: 2100,
      icono: '✈️',
      tipo: 'individual',
      fechaCreacion: new Date('2024-01-15'),
      completada: false,
    },
    {
      id: '2',
      objetivo: 'Casa nueva',
      monto: 150000,
      montoActual: 45000,
      icono: '🏠',
      tipo: 'grupal',
      fechaCreacion: new Date('2024-02-01'),
      completada: false,
    },
    {
      id: '3',
      objetivo: 'Auto familiar',
      monto: 80000,
      montoActual: 12000,
      icono: '🚗',
      tipo: 'individual',
      fechaCreacion: new Date('2024-03-10'),
      completada: false,
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
      vigencia: '2024-12-31',
      precioOriginal: 650,
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
      vigencia: '2024-11-30',
      precioOriginal: 100,
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
      vigencia: '2024-10-31',
      precioOriginal: 583,
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
    setUsuario({
      id: '1',
      nombre: 'Juan Pérez',
      email: 'juan@ejemplo.com',
      saldo: 10000
    })
    setCurrentView('user-dashboard')
  }

  const handleUserRegister = (userData: { nombre: string; email: string; password: string }) => {
    const newUser = {
      id: Date.now().toString(),
      nombre: userData.nombre,
      email: userData.email,
      saldo: 0
    }
    setUsuario(newUser)
    setCurrentView('user-dashboard')
  }

  const handleBusinessLogin = () => {
    const businessData = {
      id: '1',
      nombre: 'Mi Empresa',
      sector: 'Tecnología',
      email: 'empresa@email.com'
    }
    setEmprendedor(businessData)
    setCurrentView('business-dashboard')
  }

  const handleAgregarMeta = (metaData: { nombre: string; montoObjetivo: number; icono: string; tipo: 'individual' | 'grupal' }) => {
    const nuevaMeta: Meta = {
      id: Date.now().toString(),
      objetivo: metaData.nombre,
      monto: metaData.montoObjetivo,
      montoActual: 0,
      icono: metaData.icono,
      tipo: metaData.tipo,
      fechaCreacion: new Date(),
      completada: false,
    }
    setMetas([...metas, nuevaMeta])
    setShowAgregarMeta(false)
  }

  const handleAlimentarMeta = (metaId: string, monto: number) => {
    if (usuario && usuario.saldo >= monto) {
      setMetas(metas.map(meta => 
        meta.id === metaId 
          ? { ...meta, montoActual: Math.min(meta.montoActual + monto, meta.monto) }
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
            <Primera_vista
              onUserLogin={() => setCurrentView('user-auth')}
              onUserRegister={() => setCurrentView('user-register')}
              onBusinessLogin={() => setCurrentView('business-auth')}
              onBusinessRegister={() => setCurrentView('business-auth')}
            />
          </motion.div>
        )}

        {currentView === 'user-auth' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <FormUsuarioInicial
              esRegistro={false}
              onSuccess={handleUserLogin}
              onBack={() => setCurrentView('landing')}
              onSwitchToRegister={() => setCurrentView('user-register')}
            />
          </motion.div>
        )}

        {currentView === 'user-register' && (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <FormUsuarioInicial
              esRegistro={true}
              onSuccess={handleUserRegister}
              onBack={() => setCurrentView('landing')}
              onSwitchToLogin={() => setCurrentView('user-auth')}
            />
          </motion.div>
        )}

        {currentView === 'user-dashboard' && usuario && (
          <motion.div
            key="user-dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <VentanaMeta
              usuario={usuario}
              metas={metas}
              ofertas={ofertas.slice(0, 3)}
              onAgregarMeta={() => setShowAgregarMeta(true)}
              onAlimentarMeta={(metaId) => {
                const meta = metas.find(m => m.id === metaId)
                if (meta) {
                  setMetaSeleccionada(meta)
                  setShowAlimentar(true)
                }
              }}
              onEliminarMeta={handleEliminarMeta}
              onUnirseAMeta={() => setShowCodigoMeta(true)}
              onVerOfertas={() => setShowOfertas(true)}
              onTransferirQR={() => setShowQRPayment(true)}
              onActualizarSaldo={(nuevoSaldo) => {
                if (usuario) {
                  setUsuario({ ...usuario, saldo: nuevoSaldo })
                }
              }}
              onActualizarMetas={setMetas}
            />
          </motion.div>
        )}

        {currentView === 'business-auth' && (
          <motion.div
            key="business-auth"
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