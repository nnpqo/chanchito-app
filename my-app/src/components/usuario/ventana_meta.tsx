'use client';

import { useState } from 'react';
import { 
  User, 
  Plus, 
  Users, 
  Gift, 
  DollarSign, 
  TrendingUp, 
  Settings,
  Bell,
  Search,
  Target,
  Calendar,
  Share2
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
}

export default function VentanaMeta({ 
  usuario, 
  metas, 
  ofertas, 
  onAgregarMeta, 
  onUnirseAMeta, 
  onAlimentarMeta,
  onVerOfertas 
}: VentanaMetaProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const metasFiltradas = metas.filter(meta => 
    meta.objetivo.toLowerCase().includes(searchTerm.toLowerCase())
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
              <button className="p-3 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <Bell size={20} />
              </button>
              <button className="p-3 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <Settings size={20} />
              </button>
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
                <h2 className="text-3xl font-bold">${usuario.saldo.toLocaleString()}</h2>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <DollarSign size={24} />
              </div>
            </div>
            <div className="flex items-center space-x-2 text-white/80 text-sm">
              <TrendingUp size={16} />
              <span>+$1,250 este mes</span>
            </div>
          </div>

          {/* Total Ahorrado */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm">Total Ahorrado</p>
                <h3 className="text-2xl font-bold text-gray-900">${totalAhorrado.toLocaleString()}</h3>
              </div>
              <div className="p-3 bg-emerald-100 rounded-full">
                <Target className="text-emerald-600" size={20} />
              </div>
            </div>
            <p className="text-xs text-gray-500">{metas.length} metas activas</p>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900"
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
                  <div key={meta.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{meta.icono}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{meta.objetivo}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            {meta.tipo === 'grupal' && <Users size={14} />}
                            <span>{meta.tipo === 'grupal' ? `${meta.participantes} personas` : 'Personal'}</span>
                          </div>
                        </div>
                      </div>
                      {meta.tipo === 'grupal' && (
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Share2 size={16} />
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progreso</span>
                        <span className="font-semibold">{porcentaje.toFixed(1)}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            estaCompleta 
                              ? 'bg-gradient-to-r from-emerald-500 to-green-500' 
                              : meta.tipo === 'grupal'
                                ? 'bg-gradient-to-r from-violet-500 to-purple-500'
                                : 'bg-gradient-to-r from-pink-500 to-violet-500'
                          }`}
                          style={{ width: `${porcentaje}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">${meta.montoActual.toLocaleString()}</span>
                        <span className="font-semibold">${meta.montoObjetivo.toLocaleString()}</span>
                      </div>

                      {estaCompleta ? (
                        <div className="bg-emerald-50 text-emerald-800 px-3 py-2 rounded-xl text-sm font-medium text-center">
                          🎉 ¡Meta completada!
                        </div>
                      ) : (
                        <button
                          onClick={() => onAlimentarMeta(meta.id)}
                          className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl font-medium transition-colors"
                        >
                          Agregar dinero
                        </button>
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
    </div>
  );
}
