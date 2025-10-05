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

const empresasAliadas = [
  { 
    nombre: 'McDonald\'s', 
    logo: '🍟', 
    descuento: '15%',
    categoria: 'Comida'
  },
  { 
    nombre: 'Nike', 
    logo: '👟', 
    descuento: '25%',
    categoria: 'Deportes'
  },
  { 
    nombre: 'Spotify', 
    logo: '🎵', 
    descuento: '30%',
    categoria: 'Entretenimiento'
  },
  { 
    nombre: 'Uber', 
    logo: '🚗', 
    descuento: '20%',
    categoria: 'Transporte'
  },
  { 
    nombre: 'Netflix', 
    logo: '🎬', 
    descuento: '35%',
    categoria: 'Streaming'
  },
  { 
    nombre: 'Adidas', 
    logo: '👕', 
    descuento: '28%',
    categoria: 'Ropa'
  }
];

const testimonios = [
  {
    nombre: 'María González',
    avatar: '👩‍💼',
    texto: 'Logré ahorrar para mi casa nueva en solo 8 meses. ¡Increíble!',
    rating: 5
  },
  {
    nombre: 'Carlos Pérez',
    avatar: '👨‍💻',
    texto: 'Las metas grupales me motivaron a ahorrar más de lo esperado.',
    rating: 5
  },
  {
    nombre: 'Ana Rodríguez',
    avatar: '👩‍🎓',
    texto: 'Los descuentos me ayudaron a ahorrar aún más dinero.',
    rating: 5
  }
];

export default function LandingPage({ 
  onUserLogin, 
  onUserRegister, 
  onBusinessRegister 
}: LandingPageProps) {
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showBusinessOptions, setShowBusinessOptions] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            {/* Animated Piggy Bank */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring", bounce: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex p-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-2xl">
                <PiggyBank size={80} className="text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-7xl font-bold text-gray-900 mb-6"
            >
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Chanchito
              </span>
              <br />
              <span className="text-4xl md:text-5xl">¡Tu futuro empieza hoy!</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
            >
              La aplicación de ahorro más divertida y efectiva de Bolivia. 
              Convierte tus sueños en realidad con metas inteligentes y descuentos exclusivos.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <div className="relative">
                <button
                  onClick={() => setShowUserOptions(!showUserOptions)}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white rounded-2xl font-bold text-lg hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-xl flex items-center space-x-3"
                >
                  <Target size={24} />
                  <span>Comenzar a Ahorrar</span>
                  <ArrowRight size={20} />
                </button>
                
                {showUserOptions && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl shadow-2xl p-4 space-y-3 z-10"
                  >
                    <button
                      onClick={onUserLogin}
                      className="w-full p-3 text-left hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <div className="font-semibold text-gray-900">Iniciar Sesión</div>
                      <div className="text-sm text-gray-600">Ya tengo cuenta</div>
                    </button>
                    <button
                      onClick={onUserRegister}
                      className="w-full p-3 text-left hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <div className="font-semibold text-gray-900">Registrarse</div>
                      <div className="text-sm text-gray-600">Crear cuenta nueva</div>
                    </button>
                  </motion.div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowBusinessOptions(!showBusinessOptions)}
                  className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-xl border-2 border-gray-200 flex items-center space-x-3"
                >
                  <Gift size={24} />
                  <span>Soy Empresa</span>
                  <ArrowRight size={20} />
                </button>

                {showBusinessOptions && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl shadow-2xl p-4 space-y-3 z-10"
                  >
                    <button
                      onClick={onBusinessRegister}
                      className="w-full p-3 text-left hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <div className="font-semibold text-gray-900">Iniciar Sesión</div>
                      <div className="text-sm text-gray-600">Panel empresarial</div>
                    </button>
                    <button
                      onClick={onBusinessRegister}
                      className="w-full p-3 text-left hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <div className="font-semibold text-gray-900">Registrar Empresa</div>
                      <div className="text-sm text-gray-600">Únete como partner</div>
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-600 mb-2">50,000+</div>
                <div className="text-gray-600">Usuarios Activos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">2.5M Bs</div>
                <div className="text-gray-600">Ahorrados en Total</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-600 mb-2">200+</div>
                <div className="text-gray-600">Empresas Aliadas</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 text-6xl opacity-20"
        >
          💰
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-40 right-10 text-5xl opacity-20"
        >
          🎯
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ¿Por qué elegir <span className="text-pink-600">Chanchito</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolucionamos la forma de ahorrar en Bolivia con tecnología avanzada y beneficios únicos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Target className="text-pink-600" size={32} />,
                title: 'Metas Inteligentes',
                description: 'Crea objetivos personalizados con seguimiento visual y motivación constante.'
              },
              {
                icon: <Users className="text-purple-600" size={32} />,
                title: 'Ahorro Grupal',
                description: 'Únete con amigos y familia para alcanzar metas más grandes juntos.'
              },
              {
                icon: <Gift className="text-cyan-600" size={32} />,
                title: 'Descuentos Exclusivos',
                description: 'Accede a ofertas especiales de más de 200 empresas aliadas.'
              },
              {
                icon: <Shield className="text-green-600" size={32} />,
                title: 'Seguridad Total',
                description: 'Tu dinero está protegido con la mejor tecnología de seguridad.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl hover:shadow-xl transition-all transform hover:scale-105"
              >
                <div className="mb-4 flex justify-center">
                  <div className="p-4 bg-white rounded-full shadow-lg">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Empresas Aliadas */}
      <section className="py-20 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Empresas <span className="text-purple-600">Aliadas</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Disfruta descuentos exclusivos en tus marcas favoritas mientras ahorras para tus metas.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {empresasAliadas.map((empresa, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-3">{empresa.logo}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{empresa.nombre}</h3>
                <div className="text-sm text-gray-500 mb-2">{empresa.categoria}</div>
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{empresa.descuento} OFF
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QR Payment Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Transfiere dinero con <span className="text-cyan-600">QR</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Conecta tu cuenta bancaria y transfiere dinero instantáneamente a tu Chanchito. 
                ¡Es rápido, seguro y súper fácil!
              </p>
              <div className="space-y-4">
                {[
                  'Escanea el código QR desde tu app bancaria',
                  'El dinero se suma automáticamente a tu saldo',
                  'Destínalo a tus metas favoritas al instante'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-8">
                <div className="mb-6">
                  <QrCode size={120} className="mx-auto text-cyan-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Código QR</h3>
                <p className="text-gray-600 mb-4">Escanea para transferir</p>
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <div className="text-sm text-gray-500 mb-1">Bancos compatibles:</div>
                  <div className="flex justify-center space-x-4 text-2xl">
                    🏦 🏪 🏛️ 💳
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Lo que dicen nuestros <span className="text-pink-600">usuarios</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Miles de bolivianos ya confían en Chanchito para cumplir sus sueños.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonios.map((testimonio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{testimonio.avatar}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">{testimonio.nombre}</h3>
                    <div className="flex text-yellow-400">
                      {[...Array(testimonio.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonio.texto}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-6xl mb-6">🐷✨</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¡Tu Chanchito te está esperando!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Únete a miles de bolivianos que ya están construyendo su futuro con Chanchito.
            </p>
            <button
              onClick={onUserRegister}
              className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
            >
              Comenzar Ahora - ¡Es Gratis!
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
