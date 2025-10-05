'use client';

import { useState } from 'react';
import { 
  Building2, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ChevronDown,
  Package,
  Plus,
  Upload,
  DollarSign,
  BarChart3,
  Users,
  TrendingUp
} from 'lucide-react';

interface EmpresaData {
  nombre: string;
  sector: string;
  correo: string;
  contrasenia: string;
}

interface Producto {
  id: string;
  nombre: string;
  imagen: string;
  costo: number;
  descuento: number;
  categoria: string;
  activo: boolean;
}

interface FormEmprendedorProps {
  isRegistered?: boolean;
  onSubmit?: (empresaData: EmpresaData) => void;
  onLogin?: () => void;
  productos?: Producto[];
  onAgregarProducto?: (producto: Omit<Producto, 'id'>) => void;
}

const sectores = [
  'Tecnología',
  'Alimentación',
  'Moda y Belleza',
  'Salud y Bienestar',
  'Educación',
  'Entretenimiento',
  'Deportes',
  'Hogar y Jardín',
  'Automotriz',
  'Servicios Financieros',
  'Turismo',
  'Otro'
];

export default function FormEmprendedor({ 
  isRegistered = false,
  onSubmit,
  onLogin,
  productos = [],
  onAgregarProducto
}: FormEmprendedorProps) {
  const [formData, setFormData] = useState<EmpresaData>({
    nombre: '',
    sector: '',
    correo: '',
    contrasenia: ''
  });

  const [errors, setErrors] = useState<Partial<EmpresaData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);

  // Estado del formulario de producto
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    imagen: '',
    costo: 0,
    descuento: 0,
    categoria: '',
    activo: true
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: Partial<EmpresaData> = {};

    if (!formData.nombre.trim() && !isLogin) {
      newErrors.nombre = 'El nombre de la empresa es requerido';
    }

    if (!formData.sector && !isLogin) {
      newErrors.sector = 'Selecciona un sector';
    }

    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es requerido';
    } else if (!validateEmail(formData.correo)) {
      newErrors.correo = 'Ingresa un correo válido';
    }

    if (!formData.contrasenia) {
      newErrors.contrasenia = 'La contraseña es requerida';
    } else if (formData.contrasenia.length < 6 && !isLogin) {
      newErrors.contrasenia = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        onLogin?.();
      } else {
        onSubmit?.(formData);
      }
    }
  };

  const handleAgregarProducto = (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevoProducto.nombre && nuevoProducto.costo > 0) {
      onAgregarProducto?.(nuevoProducto);
      setNuevoProducto({
        nombre: '',
        imagen: '',
        costo: 0,
        descuento: 0,
        categoria: '',
        activo: true
      });
      setShowProductForm(false);
    }
  };

  // Si ya está registrado, mostrar dashboard
  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Header Dashboard */}
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Building2 className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Dashboard Empresa</h1>
                  <p className="text-sm text-gray-600">Gestiona tus productos y ofertas</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Productos</p>
                  <h3 className="text-2xl font-bold text-gray-900">{productos.length}</h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Package className="text-blue-600" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Ventas</p>
                  <h3 className="text-2xl font-bold text-gray-900">$12,450</h3>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <TrendingUp className="text-green-600" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Clientes</p>
                  <h3 className="text-2xl font-bold text-gray-900">847</h3>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="text-purple-600" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Conversión</p>
                  <h3 className="text-2xl font-bold text-gray-900">14.2%</h3>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <BarChart3 className="text-orange-600" size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Productos */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Mis Productos</h2>
              <button
                onClick={() => setShowProductForm(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all flex items-center space-x-2"
              >
                <Plus size={18} />
                <span>Agregar Producto</span>
              </button>
            </div>

            {productos.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="text-gray-400" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No tienes productos</h3>
                <p className="text-gray-600 mb-6">Comienza agregando tu primer producto</p>
                <button
                  onClick={() => setShowProductForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
                >
                  Agregar Producto
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productos.map((producto) => (
                  <div key={producto.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      {producto.imagen ? (
                        <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="text-white" size={32} />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{producto.nombre}</h3>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-gray-900">${producto.costo.toLocaleString()}</span>
                        {producto.descuento > 0 && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-lg text-xs font-semibold">
                            -{producto.descuento}%
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                          Editar
                        </button>
                        <button className="flex-1 py-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors">
                          Ver stats
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Agregar Producto */}
        {showProductForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-t-3xl text-white">
                <h2 className="text-xl font-bold">Nuevo Producto</h2>
                <p className="text-white/80 text-sm">Agrega un producto a tu catálogo</p>
              </div>

              <form onSubmit={handleAgregarProducto} className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Nombre del producto"
                  value={nuevoProducto.nombre}
                  onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />

                <input
                  type="url"
                  placeholder="URL de la imagen"
                  value={nuevoProducto.imagen}
                  onChange={(e) => setNuevoProducto({ ...nuevoProducto, imagen: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />

                <input
                  type="number"
                  placeholder="Precio"
                  value={nuevoProducto.costo || ''}
                  onChange={(e) => setNuevoProducto({ ...nuevoProducto, costo: Number(e.target.value) })}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />

                <input
                  type="number"
                  placeholder="% Descuento (opcional)"
                  value={nuevoProducto.descuento || ''}
                  onChange={(e) => setNuevoProducto({ ...nuevoProducto, descuento: Number(e.target.value) })}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowProductForm(false)}
                    className="flex-1 p-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
                  >
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Formulario de registro/login
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 text-white text-center">
          <div className="mb-4">
            <div className="inline-flex p-4 bg-white/20 rounded-full">
              <Building2 size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Chanchito Business</h1>
          <p className="text-white/80">
            {isLogin ? '¡Bienvenido de vuelta!' : 'Registra tu empresa'}
          </p>
        </div>

        <div className="p-8">
          {/* Toggle Login/Register */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 p-3 rounded-xl text-sm font-medium transition-all ${
                !isLogin
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Registrarse
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 p-3 rounded-xl text-sm font-medium transition-all ${
                isLogin
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Iniciar Sesión
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nombre Empresa */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Nombre de la empresa <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Mi Empresa S.A."
                    className="w-full p-4 pl-12 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                  />
                </div>
                {errors.nombre && (
                  <p className="text-red-500 text-xs">{errors.nombre}</p>
                )}
              </div>
            )}

            {/* Sector */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Sector <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white text-gray-900"
                  >
                    <option value="">Selecciona un sector</option>
                    {sectores.map((sector) => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                </div>
                {errors.sector && (
                  <p className="text-red-500 text-xs">{errors.sector}</p>
                )}
              </div>
            )}

            {/* Correo */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Correo electrónico <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="email"
                  value={formData.correo}
                  onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                  placeholder="empresa@email.com"
                  className="w-full p-4 pl-12 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                />
              </div>
              {errors.correo && (
                <p className="text-red-500 text-xs">{errors.correo}</p>
              )}
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Contraseña <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.contrasenia}
                  onChange={(e) => setFormData({ ...formData, contrasenia: e.target.value })}
                  placeholder="••••••••"
                  className="w-full p-4 pl-12 pr-12 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.contrasenia && (
                <p className="text-red-500 text-xs">{errors.contrasenia}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl font-medium hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 mt-6"
            >
              <Sparkles size={18} />
              <span>{isLogin ? 'Iniciar Sesión' : 'Registrar Empresa'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
