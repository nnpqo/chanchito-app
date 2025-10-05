'use client';

import { useState } from 'react';
import { X, Users, Hash, Shield, UserPlus, Sparkles } from 'lucide-react';

interface FormCodigoMetaProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (codigo: string) => void;
}

export default function FormCodigoMeta({ isOpen, onClose, onSubmit }: FormCodigoMetaProps) {
  const [codigo, setCodigo] = useState<string>('');
  const [error, setError] = useState<string>('');

  const validateForm = () => {
    if (!codigo.trim()) {
      setError('El código es requerido');
      return false;
    }
    if (codigo.length < 6) {
      setError('El código debe tener al menos 6 caracteres');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(codigo.toUpperCase());
      onClose();
      setCodigo('');
    }
  };

  const handleCodigoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    setCodigo(value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-300 animate-in slide-in-from-bottom-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 rounded-t-3xl text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/20 rounded-full">
              <Users size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Unirse a Meta</h2>
              <p className="text-white/80 text-sm">Ingresa el código de la meta grupal</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Info Card */}
          <div className="mb-6 p-4 bg-violet-50 rounded-2xl border border-violet-200">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-violet-100 rounded-lg">
                <Shield className="text-violet-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-violet-800 mb-1">¿Cómo funciona?</h3>
                <p className="text-sm text-violet-600">
                  Ingresa el código que compartió el creador de la meta para unirte y ahorrar juntos.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Código Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Código de la meta <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  value={codigo}
                  onChange={handleCodigoChange}
                  placeholder="Ej: ABC123"
                  maxLength={10}
                  className="w-full p-4 pl-12 text-xl font-mono font-semibold border border-gray-200 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all uppercase tracking-wider text-gray-900"
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs">{error}</p>
              )}
              <p className="text-xs text-gray-500">
                El código debe tener entre 6-10 caracteres (letras y números)
              </p>
            </div>

            {/* Instructions */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">¿No tienes un código?</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-violet-500 rounded-full"></div>
                  <span>Pídele a un amigo que comparta el código de su meta</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-violet-500 rounded-full"></div>
                  <span>O crea tu propia meta grupal desde "Agregar Meta"</span>
                </div>
              </div>
            </div>

            {/* Preview */}
            {codigo.length >= 6 && (
              <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <UserPlus className="text-green-600" size={16} />
                  <span className="text-sm font-medium text-green-800">Listo para unirse</span>
                </div>
                <p className="text-sm text-green-600">
                  Código válido: <span className="font-mono font-semibold">{codigo}</span>
                </p>
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
                className="flex-1 p-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-2xl font-medium hover:from-violet-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Sparkles size={18} />
                <span>Unirse</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
