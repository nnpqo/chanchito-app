'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PiggyBank, 
  Target, 
  Users, 
  Gift, 
  Star,
  ArrowRight,
  Shield,
  TrendingUp,
  Smartphone,
  QrCode,
  Sparkles,
  Heart,
  Zap,
  Award,
  ChevronRight,
  Play
} from 'lucide-react'

interface LandingPageProps {
  onUserLogin: () => void
  onUserRegister: () => void
  onBusinessRegister: () => void
}

export default function LandingPage({ onUserLogin, onUserRegister, onBusinessRegister }: LandingPageProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [showFeatures, setShowFeatures] = useState(false)

  const testimonials = [
    {
      name: "María González",
      role: "Estudiante",
      content: "Ahorré para mi laptop en solo 6 meses. ¡TuChanchito me ayudó a mantener la disciplina!",
      avatar: "👩‍🎓",
      rating: 5,
      amount: "Bs 8,500"
    },
    {
      name: "Carlos Mendoza", 
      role: "Trabajador",
      content: "Las metas grupales son geniales. Mi familia ahorró Bs 15,000 para nuestras vacaciones.",
      avatar: "👨‍💼",
      rating: 5,
      amount: "Bs 15,000"
    },
    {
      name: "Ana Vargas",
      role: "Emprendedora", 
      content: "Como empresa, TuChanchito nos trajo 200+ clientes nuevos con descuentos exclusivos.",
      avatar: "👩‍💻",
      rating: 5,
      amount: "200+ clientes"
    }
  ]

  const features = [
    {
      icon: Target,
      title: "Metas Inteligentes",
      description: "Crea objetivos personalizados con seguimiento visual y motivación constante",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50"
    },
    {
      icon: Users,
      title: "Ahorro Grupal",
      description: "Únete con familia y amigos para lograr metas más grandes juntos",
      color: "from-purple-500 to-violet-500", 
      bgColor: "bg-purple-50"
    },
    {
      icon: QrCode,
      title: "Pagos QR",
      description: "Transferencias instantáneas desde tu banco favorito en Bolivia",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: Gift,
      title: "Ofertas Exclusivas",
      description: "Descuentos especiales en 200+ empresas por ser ahorrador",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50"
    }
  ]

  const stats = [
    { number: "50K+", label: "Usuarios Activos", icon: Users },
    { number: "Bs 2M+", label: "Ahorrado Total", icon: TrendingUp },
    { number: "200+", label: "Empresas Aliadas", icon: Star },
    { number: "4.9★", label: "Calificación", icon: Award }
  ]

  const companies = [
    { 
      name: "Hipermaxi", 
      logo: "�", 
      color: "from-orange-400 to-red-500",
      bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
      category: "Supermercados",
      discount: "15% OFF"
    },
    { 
      name: "IC Norte", 
      logo: "🏥", 
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      category: "Salud",
      discount: "20% OFF"
    },
    { 
      name: "Dismac", 
      logo: "🏪", 
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      category: "Electrodomésticos",
      discount: "25% OFF"
    },
    { 
      name: "Tigo", 
      logo: "📱", 
      color: "from-blue-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-purple-50",
      category: "Telecomunicaciones",
      discount: "30% OFF"
    },
    { 
      name: "Banco Sol", 
      logo: "☀️", 
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
      category: "Bancario",
      discount: "Sin comisiones"
    },
    { 
      name: "Farmacorp", 
      logo: "⚕️", 
      color: "from-green-500 to-teal-600",
      bgColor: "bg-gradient-to-br from-green-50 to-teal-50",
      category: "Farmacia",
      discount: "18% OFF"
    },
    { 
      name: "Multicine", 
      logo: "🎬", 
      color: "from-red-500 to-pink-600",
      bgColor: "bg-gradient-to-br from-red-50 to-pink-50",
      category: "Entretenimiento",
      discount: "2x1"
    },
    { 
      name: "Ventura Mall", 
      logo: "🛍️", 
      color: "from-pink-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-pink-50 to-purple-50",
      category: "Shopping",
      discount: "12% OFF"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full opacity-20"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-400 rounded-full opacity-20"
        />
        <motion.div
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full opacity-20"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <PiggyBank className="text-white" size={24} />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                TuChanchito
              </h1>
              <p className="text-xs text-gray-500">Tu futuro financiero</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center space-x-8"
          >
            <button
              onClick={() => setShowFeatures(!showFeatures)}
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Características
            </button>
            <button className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Empresas
            </button>
            <button className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Testimonios
            </button>
          </motion.div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-full"
                >
                  <Sparkles className="text-pink-500" size={16} />
                  <span className="text-sm font-medium text-gray-700">La app de ahorro #1 en Bolivia</span>
                </motion.div>
                
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                    Ahorra
                  </span>
                  <br />
                  <span className="text-gray-800">con propósito</span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    y estilo
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Transforma tus sueños en realidad con <span className="font-semibold text-purple-600">TuChanchito</span>. 
                  Metas inteligentes, ahorro grupal y beneficios exclusivos en un solo lugar.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onUserRegister}
                  className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <PiggyBank size={20} />
                    <span>Comenzar a Ahorrar</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onUserLogin}
                  className="px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold text-lg hover:border-purple-300 hover:text-purple-600 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Ya tengo cuenta</span>
                  <ChevronRight size={20} />
                </motion.button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <stat.icon className="text-purple-600" size={20} />
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hero Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                {/* Phone Mockup */}
                <div className="w-80 h-[600px] mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                    {/* Status Bar */}
                    <div className="h-8 bg-gray-50 flex items-center justify-between px-6 text-xs font-medium">
                      <span>9:41</span>
                      <div className="flex space-x-1">
                        <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                        <div className="w-6 h-2 bg-green-500 rounded-sm"></div>
                      </div>
                    </div>
                    
                    {/* App Content */}
                    <div className="p-4 space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">¡Hola María! 👋</div>
                        <div className="text-gray-600">Tu progreso de ahorro</div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-4 text-white">
                        <div className="text-sm opacity-90">Saldo Total</div>
                        <div className="text-3xl font-bold">Bs 12,450</div>
                        <div className="text-sm opacity-90">+Bs 500 esta semana 📈</div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-white border-2 border-gray-100 rounded-xl p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-xl">🏠</span>
                              <span className="font-medium">Casa Nueva</span>
                            </div>
                            <span className="text-sm text-gray-500">75%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "75%" }}
                              transition={{ duration: 2, delay: 1 }}
                              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full"
                            />
                          </div>
                        </div>
                        
                        <div className="bg-white border-2 border-gray-100 rounded-xl p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-xl">✈️</span>
                              <span className="font-medium">Vacaciones</span>
                            </div>
                            <span className="text-sm text-gray-500">40%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "40%" }}
                              transition={{ duration: 2, delay: 1.5 }}
                              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating UI Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl p-3 border-2 border-gray-100"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Zap className="text-green-600" size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-800">+Bs 200</div>
                      <div className="text-xs text-gray-500">Transferencia QR</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-3 border-2 border-gray-100"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Gift className="text-purple-600" size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-800">15% OFF</div>
                      <div className="text-xs text-gray-500">En Hipermaxi</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <AnimatePresence>
        {showFeatures && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="relative z-10 px-6 py-16 bg-white/50 backdrop-blur-sm"
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  ¿Por qué elegir <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">TuChanchito</span>?
                </h2>
                <p className="text-xl text-gray-600">Todo lo que necesitas para alcanzar tus metas financieras</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`${feature.bgColor} rounded-3xl p-6 text-center hover:scale-105 transition-transform duration-300`}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <feature.icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Companies Section - Redesigned */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-4">
                <Star className="text-purple-500" size={16} />
                <span className="text-sm font-medium text-gray-700">Empresas Aliadas</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
                  200+ Empresas
                </span>
                <br />
                <span className="text-gray-800">confían en TuChanchito</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Descuentos exclusivos y beneficios especiales para nuestros ahorradores en las mejores empresas de Bolivia
              </p>
            </motion.div>
          </div>
          
          {/* Featured Companies Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {companies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`${company.bgColor} rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden group cursor-pointer`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <div className="absolute top-4 right-4 w-20 h-20 border-2 border-current rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-current rounded-full"></div>
                </div>
                
                {/* Company Icon */}
                <div className={`relative z-10 w-20 h-20 bg-gradient-to-br ${company.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{company.logo}</span>
                </div>
                
                {/* Company Info */}
                <div className="relative z-10 space-y-3">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                    {company.name}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600 font-medium">
                      {company.category}
                    </div>
                    
                    {/* Discount Badge */}
                    <div className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${company.color} text-white rounded-full text-sm font-bold shadow-md`}>
                      <Sparkles size={12} className="mr-1" />
                      {company.discount}
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex justify-between text-xs text-gray-500 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-1">
                      <Star size={12} className="text-yellow-400 fill-current" />
                      <span>4.8</span>
                    </div>
                    <div>500+ usuarios</div>
                  </div>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
              </motion.div>
            ))}
          </div>
          
          {/* Additional Companies Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Y muchas más empresas</h3>
              <p className="text-gray-600">Nuevas alianzas cada semana</p>
            </div>
            
            {/* Sliding Companies */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['🏦 BNB', '💳 Mercantil', '🟢 Entel', '🔴 Viva', '🏪 Ketal', '🏢 Cotas', '⚡ ENDE', '🍕 Dumbo'].map((company, index) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:shadow-md transition-all duration-200"
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* CTA Section */}
          <div className="text-center mt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-800">
                ¿Tu empresa quiere unirse?
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Conecta con miles de ahorradores bolivianos y haz crecer tu negocio
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onBusinessRegister}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Únete como Empresa</span>
                  <ArrowRight size={20} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-purple-200 text-purple-600 rounded-2xl font-semibold hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
                >
                  Ver Beneficios
                </motion.button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex justify-center items-center space-x-8 pt-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Shield size={16} className="text-green-500" />
                  <span>100% Seguro</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap size={16} className="text-yellow-500" />
                  <span>Fácil Integración</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp size={16} className="text-blue-500" />
                  <span>Más Ventas</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 px-6 py-16 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            Lo que dicen nuestros usuarios
          </h2>
          
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-8 shadow-xl"
              >
                <div className="flex items-center justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </p>
                
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-2xl">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-800">{testimonials[currentTestimonial].name}</div>
                    <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
                    <div className="text-sm font-semibold text-purple-600">{testimonials[currentTestimonial].amount}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Dots */}
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl p-12 text-white relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">
                Tu futuro financiero comienza hoy
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Únete a más de 50,000 bolivianos que ya están construyendo su futuro con TuChanchito
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onUserRegister}
                  className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300"
                >
                  Comenzar Gratis
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-white text-white rounded-2xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Play size={20} />
                  <span>Ver Demo</span>
                </motion.button>
              </div>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 border-2 border-white rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
              <PiggyBank className="text-white" size={20} />
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              TuChanchito
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">
            La aplicación de ahorro más confiable y moderna de Bolivia
          </p>
          
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <button className="hover:text-purple-600 transition-colors">Términos</button>
            <button className="hover:text-purple-600 transition-colors">Privacidad</button>
            <button className="hover:text-purple-600 transition-colors">Contacto</button>
            <button className="hover:text-purple-600 transition-colors">Ayuda</button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-500">
            © 2025 TuChanchito. Hecho con ❤️ en Bolivia.
          </div>
        </div>
      </footer>
    </div>
  )
}
