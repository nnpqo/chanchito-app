'use client'

import { useState, useEffect } from 'react'
import { X, Check, AlertCircle, Camera, Upload, CreditCard, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface QRPaymentProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (amount: number) => void
}

export default function QRPayment({ isOpen, onClose, onSuccess }: QRPaymentProps) {
  const [step, setStep] = useState(1)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [selectedBank, setSelectedBank] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [qrImage, setQrImage] = useState<string | null>(null)

  const quickAmounts = [50, 100, 200, 500, 1000, 2000]
  
  const banks = [
    { id: 'bnb', name: 'Banco Nacional de Bolivia', color: 'bg-blue-600', logo: '🏦' },
    { id: 'bmsc', name: 'Banco Mercantil Santa Cruz', color: 'bg-green-600', logo: '🏪' },
    { id: 'bcp', name: 'Banco de Crédito', color: 'bg-red-600', logo: '🏛️' },
    { id: 'beco', name: 'Banco Económico', color: 'bg-purple-600', logo: '💳' }
  ]

  const finalAmount = selectedAmount || parseFloat(customAmount) || 0

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    const numValue = value.replace(/[^\d.]/g, '')
    setCustomAmount(numValue)
    setSelectedAmount(null)
  }

  const handleQRUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setQrImage(e.target?.result as string)
        setStep(3)
      }
      reader.readAsDataURL(file)
    }
  }

  const simulatePayment = () => {
    setIsProcessing(true)
    
    // Simulación realista de procesamiento
    setTimeout(() => {
      setIsProcessing(false)
      const success = Math.random() > 0.1 // 90% éxito
      
      if (success) {
        setShowSuccess(true)
        setTimeout(() => {
          onSuccess(finalAmount)
          onClose()
          resetForm()
        }, 2000) // 2 segundos de confirmación
      } else {
        setStep(4) // Error
      }
    }, 3000)
  }

  const resetForm = () => {
    setStep(1)
    setSelectedAmount(null)
    setCustomAmount('')
    setSelectedBank('')
    setQrImage(null)
    setShowSuccess(false)
    setIsProcessing(false)
  }

  const handleClose = () => {
    onClose()
    resetForm()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-6 relative">
            <div className="flex items-center justify-between text-white">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <h2 className="text-xl font-bold text-center flex-1">
                {step === 1 && "💰 Agregar Dinero"}
                {step === 2 && "🏦 Seleccionar Banco"}
                {step === 3 && "📱 Escanear QR"}
                {step === 4 && "❌ Error en Pago"}
              </h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 flex space-x-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full ${
                    s <= step ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Step 1: Amount Selection */}
            {step === 1 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    ¿Cuánto quieres agregar?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Elige un monto rápido o ingresa una cantidad personalizada
                  </p>
                </div>

                {/* Quick Amounts */}
                <div className="grid grid-cols-3 gap-3">
                  {quickAmounts.map((amount) => (
                    <motion.button
                      key={amount}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAmountSelect(amount)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                        selectedAmount === amount
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-purple-300 text-gray-700'
                      }`}
                    >
                      <div className="text-lg font-bold">Bs {amount}</div>
                    </motion.button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Monto personalizado
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      placeholder="0.00"
                      className="w-full p-4 pl-12 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors text-gray-800 text-lg font-semibold"
                    />
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-semibold">
                      Bs
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(2)}
                  disabled={finalAmount <= 0}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200"
                >
                  Continuar con Bs {finalAmount.toFixed(2)}
                </motion.button>
              </motion.div>
            )}

            {/* Step 2: Bank Selection */}
            {step === 2 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Selecciona tu banco
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Elige el banco desde donde harás la transferencia
                  </p>
                </div>

                <div className="space-y-3">
                  {banks.map((bank) => (
                    <motion.button
                      key={bank.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedBank(bank.id)}
                      className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 flex items-center space-x-4 ${
                        selectedBank === bank.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className={`w-12 h-12 ${bank.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                        {bank.logo}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-gray-800">{bank.name}</div>
                        <div className="text-sm text-gray-600">Transferencia QR</div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(3)}
                  disabled={!selectedBank}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200"
                >
                  Continuar
                </motion.button>
              </motion.div>
            )}

            {/* Step 3: QR Upload */}
            {step === 3 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Sube tu QR de pago
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Toma una foto del QR generado por tu banco o súbelo desde galería
                  </p>
                </div>

                {!qrImage ? (
                  <div className="space-y-4">
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleQRUpload}
                        className="hidden"
                      />
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-8 border-2 border-dashed border-purple-300 rounded-2xl text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
                      >
                        <Camera size={48} className="mx-auto text-purple-500 mb-4" />
                        <div className="text-lg font-semibold text-gray-800 mb-2">
                          Tomar foto del QR
                        </div>
                        <div className="text-sm text-gray-600">
                          Usa la cámara de tu dispositivo
                        </div>
                      </motion.div>
                    </label>

                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleQRUpload}
                        className="hidden"
                      />
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-6 border-2 border-gray-200 rounded-2xl text-center cursor-pointer hover:border-purple-300 hover:bg-gray-50 transition-all duration-200"
                      >
                        <Upload size={32} className="mx-auto text-gray-500 mb-2" />
                        <div className="text-md font-semibold text-gray-800 mb-1">
                          Subir desde galería
                        </div>
                        <div className="text-sm text-gray-600">
                          Selecciona una imagen guardada
                        </div>
                      </motion.div>
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={qrImage}
                        alt="QR Code"
                        className="w-full h-64 object-cover rounded-2xl border-2 border-gray-200"
                      />
                      <button
                        onClick={() => setQrImage(null)}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="text-purple-500" size={24} />
                        <div>
                          <div className="font-semibold text-gray-800">
                            Monto: Bs {finalAmount.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {banks.find(b => b.id === selectedBank)?.name}
                          </div>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={simulatePayment}
                      disabled={isProcessing}
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Procesando pago...</span>
                        </div>
                      ) : (
                        "Confirmar pago"
                      )}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 4: Error */}
            {step === 4 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-center space-y-6"
              >
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle size={40} className="text-red-500" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Error en el pago
                  </h3>
                  <p className="text-gray-600">
                    No pudimos procesar tu transferencia. Por favor, intenta nuevamente.
                  </p>
                </div>

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(3)}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold"
                  >
                    Intentar nuevamente
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClose}
                    className="w-full py-3 border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:border-gray-300"
                  >
                    Cancelar
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Success Overlay */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 bg-green-500/90 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="text-center text-white">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check size={48} className="text-green-500" />
                </motion.div>
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold mb-2"
                >
                  ¡Pago exitoso!
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg"
                >
                  Bs {finalAmount.toFixed(2)} agregados a tu cuenta
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}