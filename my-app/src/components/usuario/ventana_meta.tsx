'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Plus, 
  Users, 
  Gift, 
  TrendingUp,
  Search,
  Target,
  Share2,
  Trash2,
  QrCode,
  Sparkles,
  Award,
  Eye,
  EyeOff,
  Wallet,
  Calendar,
  Heart,
  Star,
  ArrowUp,
  ChevronRight,
  PiggyBank
} from 'lucide-react'

import { UserData, Meta, saveUserData, loadUserData, generateId } from '../../utils/storage'

interface Oferta {
  id: string
  titulo: string
  descuento: number
  empresa: string
  imagen: string
  categoria: string
  vigencia: string
  rating: number
}

interface VentanaMetaProps {
  usuario: {
    nombre: string
    saldo: number
    avatar?: string
  }
  metas: Meta[]
  ofertas: Oferta[]
  onAgregarMeta: () => void
  onUnirseAMeta: () => void
  onAlimentarMeta: (metaId: string) => void
  onVerOfertas: () => void
  onTransferirQR: () => void
  onEliminarMeta: (metaId: string) => void
  onActualizarSaldo: (nuevoSaldo: number) => void
  onActualizarMetas: (nuevasMetas: Meta[]) => void
}

// Pig Animation Component
const ChanchitoBounce = ({ isVisible, message }: { isVisible: boolean, message: string }) => {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ scale: 0, y: 50, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0, y: -50, opacity: 0 }}
      transition={{ type: "spring", duration: 0.6 }}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-pink-200 text-center">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 0.8, repeat: 2 }}
          className="text-6xl mb-4"
        >
          🐷
        </motion.div>
        <p className="text-lg font-bold text-gray-800 mb-2">¡Oink Oink!</p>
        <p className="text-sm text-gray-600">{message}</p>
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="mt-4 text-pink-500"
        >
          💰✨
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function VentanaMeta({ 
  usuario, 
  metas, 
  ofertas, 
  onAgregarMeta, 
  onUnirseAMeta, 
  onAlimentarMeta, 
  onVerOfertas,
  onTransferirQR,
  onEliminarMeta,
  onActualizarSaldo,
  onActualizarMetas
}: VentanaMetaProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showBalance, setShowBalance] = useState(true)
  const [showChanchito, setShowChanchito] = useState(false)
  const [chanchitoMessage, setChanchitoMessage] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // Load data on component mount
  useEffect(() => {
    const savedData = loadUserData()
    if (savedData) {
      onActualizarSaldo(savedData.saldo)
      onActualizarMetas(savedData.metas)
    }
  }, [])

  // Save data whenever it changes
  useEffect(() => {
    const userData: UserData = {
      nombre: usuario.nombre,
      email: 'user@example.com', // This should come from auth
      saldo: usuario.saldo,
      metas: metas,
      historialTransferencias: []
    }
    saveUserData(userData)
  }, [usuario.saldo, metas])

  const metasFiltradas = metas.filter(meta => 
    meta.objetivo && meta.objetivo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalAhorrado = metas.reduce((total, meta) => total + (meta.montoActual || 0), 0)
  const metasCompletadas = metas.filter(meta => meta.completada).length
  const progresoPromedio = metas.length > 0 
    ? metas.reduce((acc, meta) => {
        const progreso = meta.monto > 0 ? ((meta.montoActual || 0) / meta.monto) * 100 : 0
        return acc + progreso
      }, 0) / metas.length 
    : 0

  const calcularPorcentaje = (actual: number, objetivo: number): number => {
    if (!objetivo || objetivo <= 0) return 0
    return Math.min((actual / objetivo) * 100, 100)
  }

  const handleEliminarMeta = (metaId: string) => {
    const meta = metas.find(m => m.id === metaId)
    if (meta && meta.montoActual > 0) {
      // Refund money to balance
      onActualizarSaldo(usuario.saldo + meta.montoActual)
      
      // Show chanchito with refund message
      setChanchitoMessage(`¡Bs ${meta.montoActual.toFixed(2)} devueltos a tu saldo!`)
      setShowChanchito(true)
      setTimeout(() => setShowChanchito(false), 3000)
    }
    
    onEliminarMeta(metaId)
    setDeleteConfirm(null)
  }

  const estadisticas = [
    {
      titulo: "Total Ahorrado",
      valor: `Bs ${totalAhorrado.toFixed(2)}`,
      icono: PiggyBank,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50"
    },
    {
      titulo: "Metas Activas", 
      valor: metas.length.toString(),
      icono: Target,
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50"
    },
    {
      titulo: "Completadas",
      valor: metasCompletadas.toString(),
      icono: Award,
      color: "from-emerald-500 to-teal-500", 
      bgColor: "bg-emerald-50"
    },
    {
      titulo: "Progreso Promedio",
      valor: `${progresoPromedio.toFixed(0)}%`,
      icono: TrendingUp,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {usuario.avatar || usuario.nombre.charAt(0).toUpperCase()}
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                ¡Hola, {usuario.nombre}! 👋
              </h1>
              <p className="text-gray-600">Que tengas un día productivo</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onTransferirQR}
              className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <QrCode size={20} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onVerOfertas}
              className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Gift size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden"
        >
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl p-8 text-white relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-32 h-32 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-24 h-24 border-2 border-white rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Wallet size={24} />
                  <span className="text-lg font-medium opacity-90">Saldo Total</span>
                </div>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="text-4xl font-bold">
                  {showBalance ? `Bs ${usuario.saldo.toFixed(2)}` : '••••••'}
                </div>
                <div className="flex items-center space-x-2 text-green-200">
                  <ArrowUp size={16} />
                  <span className="text-sm">+12% este mes</span>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between text-sm opacity-90">
                <div>Última actualización: Hoy</div>
                <div className="flex items-center space-x-1">
                  <Star size={16} />
                  <span>Ahorrador Estrella</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {estadisticas.map((stat, index) => (
            <motion.div
              key={stat.titulo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`${stat.bgColor} rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                <stat.icono className="text-white" size={20} />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.valor}</div>
              <div className="text-sm text-gray-600">{stat.titulo}</div>
            </motion.div>
          ))}
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar metas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors text-gray-800 bg-white shadow-sm"
            />
          </div>
          
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAgregarMeta}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus size={20} />
              <span>Nueva Meta</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onUnirseAMeta}
              className="flex items-center space-x-2 px-6 py-3 border-2 border-purple-200 text-purple-600 rounded-2xl font-semibold hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
            >
              <Users size={20} />
              <span>Unirse</span>
            </motion.button>
          </div>
        </div>

        {/* Metas Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Mis Metas</h2>
            <div className="text-sm text-gray-600">
              {metasFiltradas.length} de {metas.length} metas
            </div>
          </div>
          
          {metasFiltradas.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {searchTerm ? 'No se encontraron metas' : 'No tienes metas aún'}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm 
                  ? 'Intenta con otro término de búsqueda'
                  : 'Crea tu primera meta y comienza a ahorrar'
                }
              </p>
              {!searchTerm && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onAgregarMeta}
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Crear Primera Meta
                </motion.button>
              )}
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {metasFiltradas.map((meta, index) => {
                const porcentaje = calcularPorcentaje(meta.montoActual || 0, meta.monto)
                const estaCompleta = porcentaje >= 100

                return (
                  <motion.div
                    key={meta.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden ${
                      estaCompleta ? 'ring-2 ring-green-200' : ''
                    }`}
                  >
                    {estaCompleta && (
                      <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Award className="text-white" size={16} />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{meta.icono}</div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">{meta.objetivo}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            {meta.tipo === 'grupal' && <Users size={14} />}
                            <span className="capitalize">{meta.tipo}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setDeleteConfirm(meta.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progreso</span>
                        <span className="font-semibold text-gray-800">{porcentaje.toFixed(1)}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${porcentaje}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`h-full rounded-full ${
                            estaCompleta 
                              ? 'bg-gradient-to-r from-green-400 to-green-500'
                              : 'bg-gradient-to-r from-pink-400 to-purple-500'
                          }`}
                        />
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Bs {(meta.montoActual || 0).toLocaleString()}</span>
                        <span className="font-semibold text-gray-800">Bs {meta.monto.toLocaleString()}</span>
                      </div>
                      
                      {!estaCompleta && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onAlimentarMeta(meta.id)}
                          className="w-full py-3 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 rounded-2xl font-semibold hover:from-pink-200 hover:to-purple-200 transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                          <span>🐷</span>
                          <span>Alimentar Chanchito</span>
                        </motion.button>
                      )}
                      
                      {estaCompleta && (
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-2 text-green-600 font-semibold">
                            <Sparkles size={16} />
                            <span>¡Meta Completada!</span>
                            <Sparkles size={16} />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>

        {/* Ofertas Destacadas */}
        {ofertas.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Ofertas Especiales</h2>
              <button
                onClick={onVerOfertas}
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-semibold"
              >
                <span>Ver todas</span>
                <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ofertas.slice(0, 3).map((oferta, index) => (
                <motion.div
                  key={oferta.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="h-40 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-4xl">
                    {oferta.imagen}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800">{oferta.titulo}</h3>
                      <span className="text-lg font-bold text-green-600">{oferta.descuento}% OFF</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{oferta.empresa}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            className={`${i < oferta.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">{oferta.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">{oferta.vigencia}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <Trash2 className="text-red-500" size={24} />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">¿Eliminar meta?</h3>
                  <p className="text-gray-600">
                    Esta acción no se puede deshacer. El dinero ahorrado será devuelto a tu saldo.
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:border-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleEliminarMeta(deleteConfirm)}
                    className="flex-1 py-3 bg-red-500 text-white rounded-2xl font-semibold hover:bg-red-600 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chanchito Animation */}
      <AnimatePresence>
        <ChanchitoBounce isVisible={showChanchito} message={chanchitoMessage} />
      </AnimatePresence>
    </div>
  )
}