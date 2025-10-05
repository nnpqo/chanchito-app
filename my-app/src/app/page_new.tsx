'use client';

import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import FormUsuarioInicial from '@/components/usuario/form_usuario_inicial';
import VentanaMeta from '@/components/usuario/ventana_meta';
import FormAgregarMeta from '@/components/usuario/form_agregar_meta';
import FormAlimentar from '@/components/usuario/form_alimentar';
import FormCodigoMeta from '@/components/usuario/form_codigo_meta';
import OfertasPage from '@/components/OfertasPage';
import QRPayment from '@/components/QRPayment';
import FormEmprendedor from '@/components/emprendedor/form';

// Interfaces
interface Usuario {
  nombre: string;
  email: string;
  saldo: number;
  avatar: string;
}

interface Meta {
  id: string;
  objetivo: string;
  montoObjetivo: number;
  montoActual: number;
  icono: string;
  tipo: 'individual' | 'grupal';
  fechaCreacion: string;
  codigo?: string;
  participantes?: number;
}

interface Oferta {
  id: string;
  titulo: string;
  empresa: string;
  descuento: number;
  precio: number;
  imagen: string;
  categoria: string;
  descripcion: string;
  ubicacion: string;
  fechaVencimiento: string;
  rating: number;
  vendidos: number;
}

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  descuento: number;
  imagen: string;
  categoria: string;
  costo: number;
  activo: boolean;
}

type ViewState = 'landing' | 'login' | 'register' | 'dashboard' | 'business';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [metas, setMetas] = useState<Meta[]>([
    {
      id: '1',
      objetivo: 'Viaje a La Paz',
      montoObjetivo: 2500,
      montoActual: 850,
      icono: '✈️',
      tipo: 'individual',
      fechaCreacion: new Date().toISOString(),
    },
    {
      id: '2',
      objetivo: 'Casa nueva',
      montoObjetivo: 15000,
      montoActual: 3200,
      icono: '🏠',
      tipo: 'grupal',
      fechaCreacion: new Date().toISOString(),
      codigo: 'CASA2024',
      participantes: 3
    },
    {
      id: '3',
      objetivo: 'Auto usado',
      montoObjetivo: 8000,
      montoActual: 1500,
      icono: '🚗',
      tipo: 'individual',
      fechaCreacion: new Date().toISOString(),
    }
  ]);

  const [ofertas] = useState<Oferta[]>([
    {
      id: '1',
      titulo: 'Descuento en hoteles',
      descuento: 30,
      precio: 500,
      empresa: 'Booking.com',
      imagen: '',
      categoria: 'Viajes',
      descripcion: 'Reserva hoteles con 30% de descuento',
      ubicacion: 'Nacional',
      fechaVencimiento: '2024-12-31',
      rating: 4.5,
      vendidos: 1250
    },
    {
      id: '2',
      titulo: 'Comida a domicilio',
      descuento: 25,
      precio: 50,
      empresa: 'UberEats',
      imagen: '',
      categoria: 'Alimentación',
      descripcion: 'Descuento en pedidos de comida',
      ubicacion: 'Santa Cruz',
      fechaVencimiento: '2024-11-30',
      rating: 4.2,
      vendidos: 890
    },
    {
      id: '3',
      titulo: 'Ropa deportiva',
      descuento: 40,
      precio: 200,
      empresa: 'Nike',
      imagen: '',
      categoria: 'Deportes',
      descripcion: 'Colección deportiva con descuentos',
      ubicacion: 'Online',
      fechaVencimiento: '2024-10-31',
      rating: 4.8,
      vendidos: 2100
    }
  ]);

  const [productos, setProductos] = useState<Producto[]>([]);

  // Modal states
  const [showAgregarMeta, setShowAgregarMeta] = useState(false);
  const [showAlimentar, setShowAlimentar] = useState(false);
  const [showCodigoMeta, setShowCodigoMeta] = useState(false);
  const [showOfertas, setShowOfertas] = useState(false);
  const [showQRPayment, setShowQRPayment] = useState(false);
  const [metaSeleccionada, setMetaSeleccionada] = useState<Meta | null>(null);

  // Handlers
  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
  };

  const handleUserLogin = (userData: any) => {
    setUsuario({
      nombre: userData.nombre,
      email: userData.email,
      saldo: 1250.75,
      avatar: ''
    });
    setCurrentView('dashboard');
  };

  const handleUserRegister = (userData: any) => {
    setUsuario({
      nombre: userData.nombre,
      email: userData.email,
      saldo: 0,
      avatar: ''
    });
    setCurrentView('dashboard');
  };

  const handleBusinessLogin = () => {
    setCurrentView('business');
  };

  const handleBusinessRegister = () => {
    setCurrentView('business');
  };

  const handleAgregarMeta = (metaData: any) => {
    const nuevaMeta: Meta = {
      ...metaData,
      id: Date.now().toString(),
      montoActual: 0,
      fechaCreacion: new Date().toISOString(),
      ...(metaData.tipo === 'grupal' && { 
        codigo: Math.random().toString(36).substring(2, 8).toUpperCase(),
        participantes: 1 
      })
    };
    setMetas([...metas, nuevaMeta]);
    setShowAgregarMeta(false);
  };

  const handleAlimentarMeta = (metaId: string, cantidad: number) => {
    if (!usuario) return;
    
    if (usuario.saldo >= cantidad) {
      setMetas(metas.map(meta => 
        meta.id === metaId 
          ? { ...meta, montoActual: Math.min(meta.montoActual + cantidad, meta.montoObjetivo) }
          : meta
      ));
      setUsuario({ ...usuario, saldo: usuario.saldo - cantidad });
      setShowAlimentar(false);
      setMetaSeleccionada(null);
    }
  };

  const handleEliminarMeta = (metaId: string) => {
    if (!usuario) return;
    
    const meta = metas.find(m => m.id === metaId);
    if (meta && meta.montoActual > 0) {
      setUsuario({ ...usuario, saldo: usuario.saldo + meta.montoActual });
    }
    setMetas(metas.filter(meta => meta.id !== metaId));
  };

  const handleUnirseAMeta = (codigo: string) => {
    // Simular unirse a meta grupal
    setShowCodigoMeta(false);
  };

  const handleQRPayment = (amount: number) => {
    if (!usuario) return;
    setUsuario({ ...usuario, saldo: usuario.saldo + amount });
    setShowQRPayment(false);
  };

  const handleAgregarProducto = (producto: any) => {
    const nuevoProducto: Producto = {
      ...producto,
      id: Date.now().toString(),
      costo: producto.precio * 0.7,
      activo: true
    };
    setProductos([...productos, nuevoProducto]);
  };

  // Render
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      {/* Landing Page */}
      {currentView === 'landing' && (
        <LandingPage
          onNavigate={handleNavigate}
        />
      )}

      {/* Login/Register Forms */}
      {(currentView === 'login' || currentView === 'register') && (
        <FormUsuarioInicial
          initialMode={currentView}
          onUserLogin={handleUserLogin}
          onUserRegister={handleUserRegister}
          onBusinessLogin={handleBusinessLogin}
          onBusinessRegister={handleBusinessRegister}
          onBack={() => setCurrentView('landing')}
        />
      )}

      {/* User Dashboard */}
      {currentView === 'dashboard' && usuario && (
        <VentanaMeta
          usuario={usuario}
          metas={metas}
          onAgregarMeta={() => setShowAgregarMeta(true)}
          onAlimentarMeta={(meta) => {
            setMetaSeleccionada(meta);
            setShowAlimentar(true);
          }}
          onUnirseAMeta={() => setShowCodigoMeta(true)}
          onVerOfertas={() => setShowOfertas(true)}
          onAgregarSaldo={() => setShowQRPayment(true)}
          onEliminarMeta={handleEliminarMeta}
          onUpdateSaldo={(nuevoSaldo: number) => {
            if (usuario) {
              setUsuario({ ...usuario, saldo: nuevoSaldo });
            }
          }}
        />
      )}

      {/* Business Dashboard */}
      {currentView === 'business' && (
        <FormEmprendedor
          productos={productos}
          onAgregarProducto={handleAgregarProducto}
          onBack={() => setCurrentView('landing')}
        />
      )}

      {/* Modals */}
      <FormAgregarMeta
        isOpen={showAgregarMeta}
        onClose={() => setShowAgregarMeta(false)}
        onSubmit={handleAgregarMeta}
      />

      <FormAlimentar
        isOpen={showAlimentar}
        meta={metaSeleccionada}
        saldoDisponible={usuario?.saldo || 0}
        onClose={() => {
          setShowAlimentar(false);
          setMetaSeleccionada(null);
        }}
        onSubmit={(cantidad) => {
          if (metaSeleccionada) {
            handleAlimentarMeta(metaSeleccionada.id, cantidad);
          }
        }}
      />

      <FormCodigoMeta
        isOpen={showCodigoMeta}
        onClose={() => setShowCodigoMeta(false)}
        onSubmit={handleUnirseAMeta}
      />

      <OfertasPage
        isOpen={showOfertas}
        onClose={() => setShowOfertas(false)}
        ofertas={ofertas.map(oferta => ({
          ...oferta,
          precioOriginal: Math.round(oferta.precio / (1 - oferta.descuento / 100))
        }))}
      />

      <QRPayment
        isOpen={showQRPayment}
        onClose={() => setShowQRPayment(false)}
        onSuccess={handleQRPayment}
      />
    </div>
  );
}