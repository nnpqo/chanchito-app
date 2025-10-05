'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Search, Filter, Star, Clock, MapPin, Tag } from 'lucide-react';

interface Oferta {
  id: string;
  titulo: string;
  descripcion: string;
  descuento: number;
  empresa: string;
  imagen: string;
  categoria: string;
  ubicacion: string;
  fechaVencimiento: Date;
  rating: number;
  precio: number;
  precioOriginal: number;
}

interface OfertasPageProps {
  isOpen: boolean;
  onClose: () => void;
  ofertas: Oferta[];
}

const categoriasOfertas = [
  'Todas',
  'Comida',
  'Ropa',
  'Tecnología',
  'Deportes',
  'Entretenimiento',
  'Viajes',
  'Hogar',
  'Salud'
];

export default function OfertasPage({ isOpen, onClose, ofertas: ofertasIniciales }: OfertasPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [sortBy, setSortBy] = useState('descuento');

  // Ofertas de ejemplo si no se proporcionan
  const ofertasEjemplo: Oferta[] = [
    {
      id: '1',
      titulo: 'Hamburguesa Deluxe + Papas',
      descripcion: 'Deliciosa hamburguesa artesanal con papas fritas y bebida incluida',
      descuento: 35,
      empresa: 'Burger Palace',
      imagen: '🍔',
      categoria: 'Comida',
      ubicacion: 'Zona Sur',
      fechaVencimiento: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      rating: 4.8,
      precio: 45,
      precioOriginal: 70
    },
    {
      id: '2',
      titulo: 'Zapatillas Deportivas Nike',
      descripcion: 'Zapatillas de running de última generación con tecnología Air',
      descuento: 40,
      empresa: 'SportZone',
      imagen: '👟',
      categoria: 'Deportes',
      ubicacion: 'Centro',
      fechaVencimiento: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      rating: 4.9,
      precio: 420,
      precioOriginal: 700
    },
    {
      id: '3',
      titulo: 'Auriculares Bluetooth',
      descripcion: 'Auriculares inalámbricos con cancelación de ruido',
      descuento: 25,
      empresa: 'Tech Store',
      imagen: '🎧',
      categoria: 'Tecnología',
      ubicacion: 'Norte',
      fechaVencimiento: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      rating: 4.6,
      precio: 225,
      precioOriginal: 300
    },
    {
      id: '4',
      titulo: 'Pizza Familiar',
      descripcion: 'Pizza familiar de 8 porciones con ingredientes premium',
      descuento: 30,
      empresa: 'Pizza Express',
      imagen: '🍕',
      categoria: 'Comida',
      ubicacion: 'Zona Sur',
      fechaVencimiento: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      rating: 4.7,
      precio: 105,
      precioOriginal: 150
    },
    {
      id: '5',
      titulo: 'Camiseta Deportiva',
      descripcion: 'Camiseta de entrenamiento con tecnología Dri-FIT',
      descuento: 20,
      empresa: 'Athletic Wear',
      imagen: '👕',
      categoria: 'Ropa',
      ubicacion: 'Centro',
      fechaVencimiento: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      rating: 4.5,
      precio: 80,
      precioOriginal: 100
    },
    {
      id: '6',
      titulo: 'Entrada al Cine + Combo',
      descripcion: 'Entrada para cualquier función + palomitas grandes + bebida',
      descuento: 45,
      empresa: 'CinePlex',
      imagen: '🎬',
      categoria: 'Entretenimiento',
      ubicacion: 'Mall Central',
      fechaVencimiento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      rating: 4.4,
      precio: 55,
      precioOriginal: 100
    }
  ];

  const ofertas = ofertasIniciales.length > 0 ? ofertasIniciales : ofertasEjemplo;

  const ofertasFiltradas = ofertas
    .filter(oferta => {
      const matchesSearch = oferta.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           oferta.empresa.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoriaSeleccionada === 'Todas' || oferta.categoria === categoriaSeleccionada;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'descuento':
          return b.descuento - a.descuento;
        case 'precio':
          return a.precio - b.precio;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const getDaysRemaining = (date: Date) => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Ofertas Exclusivas</h2>
              <p className="text-white/80">Descuentos especiales para ahorradores Chanchito</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 h-full overflow-auto">
          {/* Filters */}
          <div className="mb-6 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar ofertas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Categories and Sort */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {categoriasOfertas.map((categoria) => (
                  <button
                    key={categoria}
                    onClick={() => setCategoriaSeleccionada(categoria)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      categoriaSeleccionada === categoria
                        ? 'bg-pink-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {categoria}
                  </button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-700"
              >
                <option value="descuento">Mayor descuento</option>
                <option value="precio">Menor precio</option>
                <option value="rating">Mejor valorado</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-gray-600">
              {ofertasFiltradas.length} ofertas encontradas
            </p>
          </div>

          {/* Ofertas Grid */}
          {ofertasFiltradas.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron ofertas</h3>
              <p className="text-gray-600">Intenta con otros filtros o términos de búsqueda</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ofertasFiltradas.map((oferta, index) => {
                const daysRemaining = getDaysRemaining(oferta.fechaVencimiento);
                return (
                  <motion.div
                    key={oferta.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    {/* Imagen */}
                    <div className="h-48 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center relative">
                      <div className="text-6xl">{oferta.imagen}</div>
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        -{oferta.descuento}%
                      </div>
                      {daysRemaining <= 3 && (
                        <div className="absolute top-4 left-4 bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1">
                          <Clock size={12} />
                          <span>¡{daysRemaining}d!</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-gray-900 text-lg">{oferta.titulo}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="text-yellow-400 fill-current" size={16} />
                          <span className="text-sm text-gray-600">{oferta.rating}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{oferta.descripcion}</p>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin size={14} />
                          <span>{oferta.ubicacion}</span>
                          <span>•</span>
                          <span>{oferta.empresa}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-gray-900">{oferta.precio} Bs</span>
                            <span className="text-lg text-gray-500 line-through">{oferta.precioOriginal} Bs</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            Vence en {daysRemaining} días
                          </div>
                        </div>

                        <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                          <Tag size={18} />
                          <span>Obtener Oferta</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
