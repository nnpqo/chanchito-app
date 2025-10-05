'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Lock, Eye, EyeOff, Sparkles, PiggyBank, ArrowLeft, ArrowRight, Heart, Star } from 'lucide-react'

interface FormUsuarioInicialProps {
  esRegistro: boolean
  onSuccess: (userData: { nombre: string, email: string }) => void
  onBack: () => void
  onSwitchToLogin?: () => void
  onSwitchToRegister?: () => void
}

interface UserData {
  nombre: string
  email: string
  password: string
}

interface FormErrors {
  nombre?: string
  email?: string
  password?: string
}

export default function FormUsuarioInicial({ esRegistro, onSuccess, onBack, onSwitchToLogin, onSwitchToRegister }: FormUsuarioInicialProps) {
  const [formData, setFormData] = useState<UserData>({
    nombre: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (esRegistro && !formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Ingresa un email válido'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      onSuccess({ 
        nombre: formData.nombre || 'Usuario', 
        email: formData.email 
      })
      setIsLoading(false)
    }, 1500)
  }

  const handleInputChange = (field: keyof UserData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Elements Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-300/30 to-rose-300/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -10, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/2 right-20 w-24 h-24 bg-gradient-to-br from-purple-300/30 to-violet-300/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-cyan-300/20 to-blue-300/20 rounded-full blur-xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={onBack}
          className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Volver</span>
        </motion.button>

        {/* Main Card */}
        <motion.div
          layoutId="auth-card"
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        >
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-8 text-white relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm"
              >
                <PiggyBank size={32} className="text-white" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                >
                  <Sparkles size={12} className="text-yellow-800" />
                </motion.div>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-3xl font-bold mb-2"
              >
                {esRegistro ? '¡Únete a TuChanchito!' : '¡Bienvenido de vuelta!'}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-white/80"
              >
                {esRegistro 
                  ? 'Comienza tu viaje hacia el ahorro inteligente' 
                  : 'Continúa ahorrando para tus sueños'
                }
              </motion.p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field (only for registration) */}
              <AnimatePresence mode="wait">
                {esRegistro && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                      <User size={16} className="text-purple-500" />
                      <span>Nombre completo</span>
                    </label>
                    <div className="relative">
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange('nombre', e.target.value)}
                        onFocus={() => setFocusedField('nombre')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Tu nombre completo"
                        className={`w-full px-4 py-4 border-2 rounded-2xl bg-gray-50 transition-all duration-300 text-gray-800 font-medium ${
                          errors.nombre 
                            ? 'border-red-300 focus:border-red-500' 
                            : focusedField === 'nombre'
                            ? 'border-purple-400 focus:border-purple-500 bg-purple-50'
                            : 'border-gray-200 focus:border-purple-400 hover:border-gray-300'
                        } focus:outline-none focus:ring-4 focus:ring-purple-100`}
                      />
                      <AnimatePresence>
                        {focusedField === 'nombre' && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            <Sparkles size={16} className="text-purple-400" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <AnimatePresence>
                      {errors.nombre && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-500 text-sm flex items-center space-x-1"
                        >
                          <span>⚠️</span>
                          <span>{errors.nombre}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Mail size={16} className="text-purple-500" />
                  <span>Correo electrónico</span>
                </label>
                <div className="relative">
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="tu@email.com"
                    className={`w-full px-4 py-4 border-2 rounded-2xl bg-gray-50 transition-all duration-300 text-gray-800 font-medium ${
                      errors.email 
                        ? 'border-red-300 focus:border-red-500' 
                        : focusedField === 'email'
                        ? 'border-purple-400 focus:border-purple-500 bg-purple-50'
                        : 'border-gray-200 focus:border-purple-400 hover:border-gray-300'
                    } focus:outline-none focus:ring-4 focus:ring-purple-100`}
                  />
                  <AnimatePresence>
                    {focusedField === 'email' && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        <Heart size={16} className="text-purple-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm flex items-center space-x-1"
                    >
                      <span>⚠️</span>
                      <span>{errors.email}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Lock size={16} className="text-purple-500" />
                  <span>Contraseña</span>
                </label>
                <div className="relative">
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••"
                    className={`w-full px-4 py-4 pr-12 border-2 rounded-2xl bg-gray-50 transition-all duration-300 text-gray-800 font-medium ${
                      errors.password 
                        ? 'border-red-300 focus:border-red-500' 
                        : focusedField === 'password'
                        ? 'border-purple-400 focus:border-purple-500 bg-purple-50'
                        : 'border-gray-200 focus:border-purple-400 hover:border-gray-300'
                    } focus:outline-none focus:ring-4 focus:ring-purple-100`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm flex items-center space-x-1"
                    >
                      <span>⚠️</span>
                      <span>{errors.password}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center space-x-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Procesando...</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center space-x-2"
                    >
                      <span>{esRegistro ? 'Crear mi cuenta' : 'Iniciar sesión'}</span>
                      <ArrowRight size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Animated background */}
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
              </motion.button>
            </form>

            {/* Footer Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center pt-4 border-t border-gray-100"
            >
              <p className="text-gray-600 text-sm">
                {esRegistro ? (
                  <>
                    ¿Ya tienes cuenta?{' '}
                    <button 
                      onClick={onSwitchToLogin}
                      className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                    >
                      Inicia sesión aquí
                    </button>
                  </>
                ) : (
                  <>
                    ¿No tienes cuenta?{' '}
                    <button 
                      onClick={onSwitchToRegister}
                      className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                    >
                      Regístrate gratis
                    </button>
                  </>
                )}
              </p>
              
              <div className="flex items-center justify-center space-x-1 mt-3 text-xs text-gray-500">
                <Star size={12} className="text-yellow-400 fill-current" />
                <span>Protegido con encriptación de grado bancario</span>
                <Star size={12} className="text-yellow-400 fill-current" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-6 flex items-center justify-center space-x-6 text-xs text-gray-500"
        >
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>100% Seguro</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Sin comisiones</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Respaldo ASFI</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
