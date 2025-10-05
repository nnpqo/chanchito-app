'use client';

import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Sparkles, PiggyBank } from 'lucide-react';

interface FormUsuarioInicialProps {
  onSubmit: (userData: UserData) => void;
  onLogin: () => void;
}

interface UserData {
  nombre: string;
  correo: string;
  contrasenia: string;
}

interface FormErrors {
  nombre?: string;
  correo?: string;
  contrasenia?: string;
}

export default function FormUsuarioInicial({ onSubmit, onLogin }: FormUsuarioInicialProps) {
  const [formData, setFormData] = useState<UserData>({
    nombre: '',
    correo: '',
    contrasenia: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim() && !isLogin) {
      newErrors.nombre = 'El nombre es requerido';
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
        onLogin();
      } else {
        onSubmit(formData);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-violet-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 p-8 text-white text-center">
          <div className="mb-4">
            <div className="inline-flex p-4 bg-white/20 rounded-full">
              <PiggyBank size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Chanchito App</h1>
          <p className="text-white/80">
            {isLogin ? '¡Bienvenido de vuelta!' : 'Comienza tu viaje de ahorro'}
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
            {/* Nombre (solo en registro) */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Nombre completo <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Tu nombre completo"
                    className="w-full p-4 pl-12 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-gray-900"
                  />
                </div>
                {errors.nombre && (
                  <p className="text-red-500 text-xs">{errors.nombre}</p>
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
                  placeholder="tu@email.com"
                  className="w-full p-4 pl-12 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-gray-900"
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
                  className="w-full p-4 pl-12 pr-12 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-gray-900"
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
              {!isLogin && (
                <p className="text-xs text-gray-500">
                  Mínimo 6 caracteres
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-4 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 text-white rounded-2xl font-medium hover:from-pink-600 hover:via-violet-600 hover:to-cyan-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 mt-6"
            >
              <Sparkles size={18} />
              <span>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</span>
            </button>
          </form>

          {/* Features (solo en registro) */}
          {!isLogin && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-700 mb-3">¿Por qué Chanchito App?</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                  <span>Metas personales y grupales</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-violet-500 rounded-full"></div>
                  <span>Ofertas exclusivas para ahorradores</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                  <span>Seguimiento visual de tu progreso</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
