'use client';

import { useState } from 'react';
import { X, PiggyBank, DollarSign, TrendingUp, Sparkles } from 'lucide-react';

interface FormAlimentarProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (monto: number) => void;
  metaActual?: {
    objetivo: string;
    montoObjetivo: number;
    montoActual: number;
    icono: string;
  };
}

export default function FormAlimentar({ isOpen, onClose, onSubmit, metaActual }: FormAlimentarProps) {
  const [monto, setMonto] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const validateForm = () => {
    if (monto <= 0) {
      setError('El monto debe ser mayor a 0');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(monto);
      onClose();
      setMonto(0);
    }
  };

  const porcentajeActual = metaActual ? (metaActual.montoActual / metaActual.montoObjetivo) * 100 : 0;
  const nuevoPorcentaje = metaActual ? ((metaActual.montoActual + monto) / metaActual.montoObjetivo) * 100 : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-300 animate-in slide-in-from-bottom-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-t-3xl text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/20 rounded-full">
              <PiggyBank size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Alimentar Meta</h2>
              <p className="text-white/80 text-sm">Agrega dinero a tu objetivo</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Meta Info */}
          {metaActual && (
            <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-2xl">{metaActual.icono}</div>
                <div>
                  <h3 className="font-semibold text-gray-800">{metaActual.objetivo}</h3>
                  <p className="text-sm text-gray-600">
                    ${metaActual.montoActual.toLocaleString()} de ${metaActual.montoObjetivo.toLocaleString()}
                  </p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Progreso actual</span>
                  <span>{porcentajeActual.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(porcentajeActual, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Monto Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Monto a agregar <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="number"
                  value={monto || ''}
                  onChange={(e) => setMonto(Number(e.target.value))}
                  placeholder="0.00"
                  className="w-full p-4 pl-12 text-xl font-semibold border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs">{error}</p>
              )}
            </div>

            {/* Quick Amount Buttons */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Montos rápidos</label>
              <div className="grid grid-cols-3 gap-2">
                {[50, 100, 200].map((cantidad) => (
                  <button
                    key={cantidad}
                    type="button"
                    onClick={() => setMonto(cantidad)}
                    className="p-3 border border-gray-200 rounded-xl text-sm font-medium hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                  >
                    ${cantidad}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            {monto > 0 && metaActual && (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="text-emerald-600" size={16} />
                  <span className="text-sm font-medium text-emerald-800">Vista previa</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Nuevo total:</span>
                    <span className="font-semibold">${(metaActual.montoActual + monto).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Nuevo progreso:</span>
                    <span className="font-semibold text-emerald-600">{nuevoPorcentaje.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(nuevoPorcentaje, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 p-4 border border-gray-200 rounded-2xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 p-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-medium hover:from-emerald-600 hover:to-teal-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Sparkles size={18} />
                <span>Agregar</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
