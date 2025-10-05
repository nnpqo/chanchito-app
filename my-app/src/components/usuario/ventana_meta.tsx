'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Plus, 
  Users, 
  Gift, 
  DollarSign, 
  TrendingUp,
  Search,
  Target,
  Share2,
  Trash2,
  RefreshCw,
  QrCode
} from 'lucide-react';

interface Meta {
  id: string;
  objetivo: string;
  montoObjetivo: number;
  montoActual: number;
  icono: string;
  tipo: 'individual' | 'grupal';
  fechaCreacion: Date;
  participantes?: number;
}

interface Oferta {
  id: string;
  titulo: string;
  descuento: number;
  empresa: string;
  imagen: string;
  categoria: string;
}

interface VentanaMetaProps {
  usuario: {
    nombre: string;
    saldo: number;
    avatar?: string;
  };
  metas: Meta[];
  ofertas: Oferta[];
  onAgregarMeta: () => void;
  onUnirseAMeta: () => void;
  onAlimentarMeta: (metaId: string) => void;
  onVerOfertas: () => void;
  onEliminarMeta?: (metaId: string) => void;
  onTransferirQR?: () => void;
  showFeedingAnimation?: boolean;
}

// Componente de animación del chanchito
const ChanchitoBounce = ({ show }: { show: boolean }) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ 
          y: [0, -20, 0, -10, 0],
          rotate: [0, -5, 5, -2, 0]
        }}
        transition={{ 
          duration: 1.5,
          times: [0, 0.3, 0.6, 0.8, 1]
        }}
        className="text-center"
      >
        <div className="text-9xl mb-4">🐷</div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-pink-600 mb-2">
            ¡Alimentaste al Chanchito! 🎉
          </h2>
          <p className="text-gray-600">
            Tu meta está más cerca de cumplirse
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function VentanaMeta({ 
  usuario, 
  metas, 
  ofertas, 
  onAgregarMeta, 
  onUnirseAMeta, 
  onAlimentarMeta,
  onVerOfertas,
  onEliminarMeta,
  onTransferirQR,
  showFeedingAnimation = false
}: VentanaMetaProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const metasFiltradas = metas.filter(meta => 
    meta.objetivo?.toLowerCase().includes(searchTerm.toLowerCase()) || false
  );

  const calcularPorcentaje = (actual: number, objetivo: number) => {
    return Math.min((actual / objetivo) * 100, 100);
  };

  const totalAhorrado = metas.reduce((sum, meta) => sum + meta.montoActual, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-violet-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center">
                <User className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">¡Hola, {usuario.nombre}!</h1>
                <p className="text-sm text-gray-600">Sigamos ahorrando juntos 🐷</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Removed notification and settings buttons */}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Saldo y Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Saldo Principal */}
          <div className="bg-gradient-to-r from-pink-500 to-violet-600 rounded-3xl p-6 text-white col-span-1 md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/80 text-sm">Saldo Total</p>
                <h2 className="text-3xl font-bold">{(usuario.saldo || 0).toLocaleString()} Bs</h2>
              </div>
              <motion.div 
                className="p-3 bg-white/20 rounded-full"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <DollarSign size={24} />
              </motion.div>
            </div>
            <div className="flex items-center space-x-2 text-white/80 text-sm">
              <TrendingUp size={16} />
              <span>+1,250 Bs este mes</span>
            </div>
          </div>

          {/* Total Ahorrado */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm">Total Ahorrado</p>
                <h3 className="text-2xl font-bold text-gray-900">{totalAhorrado.toLocaleString()} Bs</h3>
              </div>
              <div className="p-3 bg-emerald-100 rounded-full">
                <Target className="text-emerald-600" size={20} />
              </div>
            </div>
            <p className="text-xs text-gray-500">{metas.length} metas activas</p>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <button
            onClick={onAgregarMeta}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:scale-105 text-left group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-pink-100 rounded-full group-hover:bg-pink-200 transition-colors">
                <Plus className="text-pink-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Agregar Meta</h3>
                <p className="text-sm text-gray-600">Crea un nuevo objetivo</p>
              </div>
            </div>
          </button>

          <button
            onClick={onUnirseAMeta}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:scale-105 text-left group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-violet-100 rounded-full group-hover:bg-violet-200 transition-colors">
                <Users className="text-violet-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Unirse a Meta</h3>
                <p className="text-sm text-gray-600">Ahorra con amigos</p>
              </div>
            </div>
          </button>

          <button
            onClick={onVerOfertas}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:scale-105 text-left group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-cyan-100 rounded-full group-hover:bg-cyan-200 transition-colors">
                <Gift className="text-cyan-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Ofertas</h3>
                <p className="text-sm text-gray-600">Descuentos exclusivos</p>
              </div>
            </div>
          </button>

          {onTransferirQR && (
            <button
              onClick={onTransferirQR}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:scale-105 text-left group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                  <QrCode className="text-green-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Transferir QR</h3>
                  <p className="text-sm text-gray-600">Agrega dinero</p>
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Mis Metas */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Mis Metas</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Buscar metas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          {metasFiltradas.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-gray-400" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No tienes metas aún</h3>
              <p className="text-gray-600 mb-6">¡Comienza creando tu primera meta de ahorro!</p>
              <button
                onClick={onAgregarMeta}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-600 text-white rounded-2xl font-medium hover:from-pink-600 hover:to-violet-700 transition-all"
              >
                Crear Primera Meta
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {metasFiltradas.map((meta) => {
                const porcentaje = calcularPorcentaje(meta.montoActual, meta.montoObjetivo);
                const estaCompleta = porcentaje >= 100;
                
                return (
                  <div key={meta.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <motion.div 
                          className="text-2xl"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                        >
                          {meta.icono}
                        </motion.div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{meta.objetivo}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            {meta.tipo === 'grupal' && <Users size={14} />}
                            <span>{meta.tipo === 'grupal' ? `${meta.participantes} personas` : 'Personal'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {meta.tipo === 'grupal' && (
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Share2 size={16} />
                          </button>
                        )}
                        <button 
                          onClick={() => setShowDeleteConfirm(meta.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progreso</span>
                        <span className="font-semibold">{porcentaje.toFixed(1)}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            estaCompleta 
                              ? 'bg-gradient-to-r from-emerald-500 to-green-500' 
                              : meta.tipo === 'grupal'
                                ? 'bg-gradient-to-r from-violet-500 to-purple-500'
                                : 'bg-gradient-to-r from-pink-500 to-violet-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${porcentaje}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        ></motion.div>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{(meta.montoActual || 0).toLocaleString()} Bs</span>
                        <span className="font-semibold">{(meta.montoObjetivo || 0).toLocaleString()} Bs</span>
                      </div>

                      {estaCompleta ? (
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="bg-emerald-50 text-emerald-800 px-3 py-2 rounded-xl text-sm font-medium text-center"
                        >
                          🎉 ¡Meta completada!
                        </motion.div>
                      ) : (
                        <motion.button
                          onClick={() => onAlimentarMeta(meta.id)}
                          className="w-full py-3 bg-gray-50 hover:bg-gradient-to-r hover:from-pink-500 hover:to-violet-500 hover:text-white text-gray-700 rounded-xl font-medium transition-all transform hover:scale-105"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          🐷 Alimentar Chanchito
                        </motion.button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Ofertas Destacadas */}
        {ofertas.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Ofertas Destacadas</h2>
              <button 
                onClick={onVerOfertas}
                className="text-pink-600 hover:text-pink-700 font-medium transition-colors"
              >
                Ver todas
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ofertas.slice(0, 3).map((oferta) => (
                <div key={oferta.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="h-32 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{oferta.titulo}</h3>
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-lg text-xs font-semibold">
                        -{oferta.descuento}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{oferta.empresa}</p>
                    <button className="w-full py-2 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 rounded-xl font-medium transition-colors">
                      Ver oferta
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal de confirmación para eliminar meta */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center"
            >
              <div className="text-6xl mb-4">🐷💔</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                ¿Eliminar esta meta?
              </h3>
              <p className="text-gray-600 mb-6">
                Se reembolsará el dinero ahorrado a tu saldo principal. Esta acción no se puede deshacer.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    if (onEliminarMeta) {
                      onEliminarMeta(showDeleteConfirm);
                    }
                    setShowDeleteConfirm(null);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <RefreshCw size={16} />
                  <span>Reembolsar y Eliminar</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animación del chanchito */}
      <AnimatePresence>
        <ChanchitoBounce show={showFeedingAnimation} />
      </AnimatePresence>
    </div>
  );
}
