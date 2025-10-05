'use client';

import { useState } from 'react';
import { X, Target, Users, User, Sparkles } from 'lucide-react';

interface FormAgregarMetaProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (meta: MetaData) => void;
}

interface MetaData {
  objetivo: string;
  monto: number;
  icono: string;
  tipo: 'individual' | 'grupal';
}

interface FormErrors {
  objetivo?: string;
  monto?: string;
}

const iconos = [
  { id: 'casa', emoji: '🏠', name: 'Casa' },
  { id: 'auto', emoji: '🚗', name: 'Auto' },
  { id: 'viaje', emoji: '✈️', name: 'Viaje' },
  { id: 'educacion', emoji: '🎓', name: 'Educación' },
  { id: 'salud', emoji: '⚕️', name: 'Salud' },
  { id: 'negocio', emoji: '💼', name: 'Negocio' },
  { id: 'boda', emoji: '💒', name: 'Boda' },
  { id: 'emergencia', emoji: '🆘', name: 'Emergencia' },
];

export default function FormAgregarMeta({ isOpen, onClose, onSubmit }: FormAgregarMetaProps) {
  const [formData, setFormData] = useState<MetaData>({
    objetivo: '',
    monto: 0,
    icono: 'casa',
    tipo: 'individual'
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.objetivo.trim()) {
      newErrors.objetivo = 'El objetivo es requerido';
    }
    
    if (formData.monto <= 0) {
      newErrors.monto = 'El monto debe ser mayor a 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
      setFormData({ objetivo: '', monto: 0, icono: 'casa', tipo: 'individual' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 animate-in slide-in-from-bottom-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-violet-600 p-6 rounded-t-3xl text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/20 rounded-full">
              <Target size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Nueva Meta</h2>
              <p className="text-white/80 text-sm">Define tu objetivo de ahorro</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Objetivo */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              ¿Cuál es tu objetivo? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.objetivo}
              onChange={(e) => setFormData({ ...formData, objetivo: e.target.value })}
              placeholder="Ej: Vacaciones en la playa"
              className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-gray-900"
            />
            {errors.objetivo && (
              <p className="text-red-500 text-xs">{errors.objetivo}</p>
            )}
          </div>

          {/* Monto */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Monto a ahorrar <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                $
              </span>
              <input
                type="number"
                value={formData.monto || ''}
                onChange={(e) => setFormData({ ...formData, monto: Number(e.target.value) })}
                placeholder="0.00"
                className="w-full p-4 pl-8 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-gray-900"
              />
            </div>
            {errors.monto && (
              <p className="text-red-500 text-xs">{errors.monto}</p>
            )}
          </div>

          {/* Iconos */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Elige un icono
            </label>
            <div className="grid grid-cols-4 gap-3">
              {iconos.map((icono) => (
                <button
                  key={icono.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, icono: icono.id })}
                  className={`p-3 rounded-2xl border-2 transition-all hover:scale-105 ${
                    formData.icono === icono.id
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{icono.emoji}</div>
                  <div className="text-xs text-gray-600">{icono.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tipo de meta */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Tipo de meta
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, tipo: 'individual' })}
                className={`p-4 rounded-2xl border-2 transition-all hover:scale-105 ${
                  formData.tipo === 'individual'
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <User className="mx-auto mb-2 text-pink-500" size={24} />
                <div className="text-sm font-medium">Individual</div>
                <div className="text-xs text-gray-500">Solo para ti</div>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, tipo: 'grupal' })}
                className={`p-4 rounded-2xl border-2 transition-all hover:scale-105 ${
                  formData.tipo === 'grupal'
                    ? 'border-violet-500 bg-violet-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Users className="mx-auto mb-2 text-violet-500" size={24} />
                <div className="text-sm font-medium">Grupal</div>
                <div className="text-xs text-gray-500">Con amigos</div>
              </button>
            </div>
          </div>

          {/* Botones */}
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
              className="flex-1 p-4 bg-gradient-to-r from-pink-500 to-violet-600 text-white rounded-2xl font-medium hover:from-pink-600 hover:to-violet-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Sparkles size={18} />
              <span>Crear Meta</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
