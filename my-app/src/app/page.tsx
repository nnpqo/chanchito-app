'use client';

import { useState } from 'react';
import FormUsuarioInicial from '@/components/usuario/form_usuario_inicial';
import VentanaMeta from '@/components/usuario/ventana_meta';
import FormAgregarMeta from '@/components/usuario/form_agregar_meta';
import FormAlimentar from '@/components/usuario/form_alimentar';
import FormCodigoMeta from '@/components/usuario/form_codigo_meta';
import FormEmprendedor from '@/components/emprendedor/form';

// Interfaces
interface UserData {
  nombre: string;
  correo: string;
  contrasenia: string;
}

interface MetaData {
  objetivo: string;
  monto: number;
  icono: string;
  tipo: 'individual' | 'grupal';
}

interface Meta {
  id: string;
  objetivo: string;
  montoObjetivo: number;
  montoActual: number;
  icono: string;
  tipo: 'individual' | 'grupal';
  fechaCreacion: Date;
  participantes?: number;
}

interface Oferta {
  id: string;
  titulo: string;
  descuento: number;
  empresa: string;
  imagen: string;
  categoria: string;
}

export default function Home() {
  const [currentView, setCurrentView] = useState<'login' | 'dashboard' | 'business'>('login');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isBusinessLoggedIn, setIsBusinessLoggedIn] = useState(false);
  
  // Estados de los modales
  const [showAgregarMeta, setShowAgregarMeta] = useState(false);
  const [showAlimentar, setShowAlimentar] = useState(false);
  const [showCodigoMeta, setShowCodigoMeta] = useState(false);
  const [metaSeleccionada, setMetaSeleccionada] = useState<Meta | null>(null);

  // Estado del usuario
  const [usuario] = useState({
    nombre: 'Ana García',
    saldo: 15420.50,
    avatar: ''
  });

  // Estado de las metas
  const [metas, setMetas] = useState<Meta[]>([
    {
      id: '1',
      objetivo: 'Vacaciones en la playa',
      montoObjetivo: 5000,
      montoActual: 3200,
      icono: '✈️',
      tipo: 'individual',
      fechaCreacion: new Date(),
    },
    {
      id: '2',
      objetivo: 'Casa nueva',
      montoObjetivo: 50000,
      montoActual: 12500,
      icono: '🏠',
      tipo: 'grupal',
      fechaCreacion: new Date(),
      participantes: 4
    },
    {
      id: '3',
      objetivo: 'Auto familiar',
      montoObjetivo: 25000,
      montoActual: 8300,
      icono: '🚗',
      tipo: 'individual',
      fechaCreacion: new Date(),
    }
  ]);

  // Estado de las ofertas
  const [ofertas] = useState<Oferta[]>([
    {
      id: '1',
      titulo: 'Descuento en hoteles',
      descuento: 30,
      empresa: 'Booking.com',
      imagen: '',
      categoria: 'Viajes'
    },
    {
      id: '2',
      titulo: 'Comida a domicilio',
      descuento: 25,
      empresa: 'UberEats',
      imagen: '',
      categoria: 'Alimentación'
    },
    {
      id: '3',
      titulo: 'Ropa deportiva',
      descuento: 40,
      empresa: 'Nike',
      imagen: '',
      categoria: 'Deportes'
    }
  ]);

  // Productos para empresa
  const [productos, setProductos] = useState([
    {
      id: '1',
      nombre: 'Hamburguesa Deluxe',
      imagen: '',
      costo: 150,
      descuento: 15,
      categoria: 'Comida',
      activo: true
    },
    {
      id: '2',
      nombre: 'Pizza Familiar',
      imagen: '',
      costo: 300,
      descuento: 20,
      categoria: 'Comida',
      activo: true
    }
  ]);

  // Handlers
  const handleUserRegister = (userData: UserData) => {
    console.log('Usuario registrado:', userData);
    setIsUserLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleUserLogin = () => {
    setIsUserLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleBusinessRegister = (empresaData: any) => {
    console.log('Empresa registrada:', empresaData);
    setIsBusinessLoggedIn(true);
  };

  const handleBusinessLogin = () => {
    setIsBusinessLoggedIn(true);
  };

  const handleAgregarMeta = (metaData: MetaData) => {
    const nuevaMeta: Meta = {
      id: Date.now().toString(),
      objetivo: metaData.objetivo,
      montoObjetivo: metaData.monto,
      montoActual: 0,
      icono: getEmojiByIcon(metaData.icono),
      tipo: metaData.tipo,
      fechaCreacion: new Date(),
      participantes: metaData.tipo === 'grupal' ? 1 : undefined
    };
    setMetas([...metas, nuevaMeta]);
  };

  const handleAlimentarMeta = (metaId: string) => {
    const meta = metas.find((m: Meta) => m.id === metaId);
    if (meta) {
      setMetaSeleccionada(meta);
      setShowAlimentar(true);
    }
  };

  const handleAgregarDinero = (monto: number) => {
    if (metaSeleccionada) {
      setMetas(metas.map((meta: Meta) => 
        meta.id === metaSeleccionada.id 
          ? { ...meta, montoActual: meta.montoActual + monto }
          : meta
      ));
      setMetaSeleccionada(null);
    }
  };

  const handleUnirseAMeta = (codigo: string) => {
    console.log('Uniéndose a meta con código:', codigo);
    // Aquí implementarías la lógica para unirse a una meta
  };

  const handleAgregarProducto = (producto: any) => {
    const nuevoProducto = {
      ...producto,
      id: Date.now().toString()
    };
    setProductos([...productos, nuevoProducto]);
  };

  const getEmojiByIcon = (iconId: string) => {
    const iconMap: { [key: string]: string } = {
      'casa': '🏠',
      'auto': '🚗',
      'viaje': '✈️',
      'educacion': '🎓',
      'salud': '⚕️',
      'negocio': '💼',
      'boda': '💒',
      'emergencia': '🆘'
    };
    return iconMap[iconId] || '🎯';
  };

  // Navigation
  const switchToUser = () => {
    setCurrentView('login');
    setIsUserLoggedIn(false);
    setIsBusinessLoggedIn(false);
  };

  const switchToBusiness = () => {
    setCurrentView('business');
    setIsUserLoggedIn(false);
    setIsBusinessLoggedIn(false);
  };

  // Render views
  if (currentView === 'business') {
    return (
      <div>
        <FormEmprendedor
          isRegistered={isBusinessLoggedIn}
          onSubmit={handleBusinessRegister}
          onLogin={handleBusinessLogin}
          productos={productos}
          onAgregarProducto={handleAgregarProducto}
        />
        
        {/* Toggle Button */}
        {!isBusinessLoggedIn && (
          <button
            onClick={switchToUser}
            className="fixed top-4 right-4 px-4 py-2 bg-pink-500 text-white rounded-xl font-medium hover:bg-pink-600 transition-colors z-50"
          >
            Vista Usuario
          </button>
        )}
      </div>
    );
  }

  if (currentView === 'dashboard' && isUserLoggedIn) {
    return (
      <div>
        <VentanaMeta
          usuario={usuario}
          metas={metas}
          ofertas={ofertas}
          onAgregarMeta={() => setShowAgregarMeta(true)}
          onUnirseAMeta={() => setShowCodigoMeta(true)}
          onAlimentarMeta={handleAlimentarMeta}
          onVerOfertas={() => console.log('Ver ofertas')}
        />

        {/* Modales */}
        <FormAgregarMeta
          isOpen={showAgregarMeta}
          onClose={() => setShowAgregarMeta(false)}
          onSubmit={handleAgregarMeta}
        />

        <FormAlimentar
          isOpen={showAlimentar}
          onClose={() => {
            setShowAlimentar(false);
            setMetaSeleccionada(null);
          }}
          onSubmit={handleAgregarDinero}
          metaActual={metaSeleccionada ? {
            objetivo: metaSeleccionada.objetivo,
            montoObjetivo: metaSeleccionada.montoObjetivo,
            montoActual: metaSeleccionada.montoActual,
            icono: metaSeleccionada.icono
          } : undefined}
        />

        <FormCodigoMeta
          isOpen={showCodigoMeta}
          onClose={() => setShowCodigoMeta(false)}
          onSubmit={handleUnirseAMeta}
        />

        {/* Toggle Buttons */}
        <div className="fixed top-4 right-4 flex space-x-2 z-50">
          <button
            onClick={switchToBusiness}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
          >
            Vista Empresa
          </button>
          <button
            onClick={switchToUser}
            className="px-4 py-2 bg-gray-500 text-white rounded-xl font-medium hover:bg-gray-600 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }

  // Login/Register view
  return (
    <div>
      <FormUsuarioInicial
        onSubmit={handleUserRegister}
        onLogin={handleUserLogin}
      />

      {/* Toggle Button */}
      <button
        onClick={switchToBusiness}
        className="fixed top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors z-50"
      >
        Vista Empresa
      </button>
    </div>
  );
}