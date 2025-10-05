'use client';

import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import FormUsuarioInicial from '@/components/usuario/form_usuario_inicial';
import VentanaMeta from '@/components/usuario/ventana_meta';
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
  fechaCreacion: Date;
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

export default function Home() {
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'register' | 'dashboard' | 'business'>('landing');
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [metas, setMetas] = useState<Meta[]>([]);
  const [emprendedor, setEmprendedor] = useState<any>(null);
  const [productos, setProductos] = useState<Producto[]>([]);

  // Estados para modales
  const [mostrarAgregarMeta, setMostrarAgregarMeta] = useState(false);
  const [mostrarAlimentar, setMostrarAlimentar] = useState(false);
  const [mostrarCodigo, setMostrarCodigo] = useState(false);
  const [mostrarOfertas, setMostrarOfertas] = useState(false);
  const [mostrarQRPayment, setMostrarQRPayment] = useState(false);
  const [metaSeleccionada, setMetaSeleccionada] = useState<Meta | null>(null);

  // Datos iniciales
  const ofertas: Oferta[] = [
    {
      id: '1',
      titulo: '20% OFF en Comida',
      empresa: 'Burger King',
      descuento: 20,
      precio: 80,
      imagen: '/api/placeholder/300/200',
      categoria: 'Comida'
    },
    {
      id: '2',
      titulo: '15% OFF en Ropa',
      empresa: 'Zara',
      descuento: 15,
      precio: 200,
      imagen: '/api/placeholder/300/200',
      categoria: 'Moda'
    }
  ];

  // Función para manejar login de usuario
  const handleUserLogin = (userData: any) => {
    const newUser: Usuario = {
      nombre: userData.nombre,
      email: userData.correo,
      saldo: 500,
      avatar: '🐷'
    };
    setUsuario(newUser);
    
    // Agregar algunas metas de ejemplo
    const metasEjemplo: Meta[] = [
      {
        id: '1',
        objetivo: 'Vacaciones en Copacabana',
        montoObjetivo: 2000,
        montoActual: 800,
        icono: '✈️',
        tipo: 'individual',
        fechaCreacion: new Date('2024-01-15')
      },
      {
        id: '2',
        objetivo: 'Laptop nueva',
        montoObjetivo: 8000,
        montoActual: 2500,
        icono: '💻',
        tipo: 'individual',
        fechaCreacion: new Date('2024-02-01')
      }
    ];
    setMetas(metasEjemplo);
    setCurrentView('dashboard');
  };

  // Función para manejar registro de usuario
  const handleUserRegister = (userData: any) => {
    handleUserLogin(userData);
  };

  // Función para manejar login de emprendedor
  const handleBusinessLogin = (businessData: any) => {
    setEmprendedor(businessData);
    setCurrentView('business');
  };

  // Función para manejar registro de emprendedor
  const handleBusinessRegister = (businessData: any) => {
    handleBusinessLogin(businessData);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    setUsuario(null);
    setEmprendedor(null);
    setMetas([]);
    setProductos([]);
    setCurrentView('landing');
  };

  // Función para alternar vista empresa
  const switchToBusinessView = () => {
    setCurrentView('business');
  };

  // Función para alternar vista usuario
  const switchToUserView = () => {
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {currentView === 'landing' && (
        <LandingPage />
      )}
      
      {(currentView === 'login' || currentView === 'register') && (
        <FormUsuarioInicial
          onUserLogin={handleUserLogin}
          onUserRegister={handleUserRegister}
          onBusinessLogin={handleBusinessLogin}
          onBusinessRegister={handleBusinessRegister}
        />
      )}

      {currentView === 'dashboard' && usuario && (
        <VentanaMeta
          user={usuario}
          metas={metas}
          ofertas={ofertas}
          setCurrentView={(view: string) => setCurrentView(view as any)}
          setMostrarAgregarMeta={setMostrarAgregarMeta}
          setMostrarCodigo={setMostrarCodigo}
          setMostrarOfertas={setMostrarOfertas}
          setMostrarQRPayment={setMostrarQRPayment}
          onLogout={handleLogout}
          onSwitchToBusiness={switchToBusinessView}
        />
      )}

      {currentView === 'business' && (
        <FormEmprendedor
          emprendedor={emprendedor}
          productos={productos}
          onProductosChange={setProductos}
          onLogout={handleLogout}
          onSwitchToUser={switchToUserView}
        />
      )}
    </div>
  );
}