// Utility functions for localStorage persistence

export interface UserData {
  nombre: string
  email: string
  saldo: number
  metas: Meta[]
  historialTransferencias: {
    monto: number
    fecha: Date
    tipo: 'QR' | 'Manual'
  }[]
}

export interface Meta {
  id: string
  objetivo: string
  monto: number
  montoActual: number
  icono: string
  tipo: 'individual' | 'grupal'
  codigo?: string
  fechaCreacion: Date
  completada: boolean
}

export interface BusinessData {
  nombre: string
  email: string
  sector: string
  productos: Producto[]
  estadisticas: {
    ventas: number
    productos: number
    clientes: number
    conversion: number
  }
}

export interface Producto {
  id: string
  nombre: string
  imagen: string
  precio: number
  descuento: number
  categoria: string
  fechaCreacion: Date
}

// Storage keys
const STORAGE_KEYS = {
  USER_DATA: 'tuchanchito_user_data',
  BUSINESS_DATA: 'tuchanchito_business_data',
  CURRENT_USER: 'tuchanchito_current_user',
  CURRENT_BUSINESS: 'tuchanchito_current_business'
}

// User data functions
export const saveUserData = (userData: UserData): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify({
      ...userData,
      metas: userData.metas.map(meta => ({
        ...meta,
        fechaCreacion: meta.fechaCreacion.toISOString()
      })),
      historialTransferencias: userData.historialTransferencias.map(transfer => ({
        ...transfer,
        fecha: transfer.fecha.toISOString()
      }))
    }))
  } catch (error) {
    console.error('Error saving user data:', error)
  }
}

export const loadUserData = (): UserData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_DATA)
    if (!data) return null
    
    const parsed = JSON.parse(data)
    return {
      ...parsed,
      metas: parsed.metas.map((meta: any) => ({
        ...meta,
        fechaCreacion: new Date(meta.fechaCreacion)
      })),
      historialTransferencias: parsed.historialTransferencias.map((transfer: any) => ({
        ...transfer,
        fecha: new Date(transfer.fecha)
      }))
    }
  } catch (error) {
    console.error('Error loading user data:', error)
    return null
  }
}

// Business data functions
export const saveBusinessData = (businessData: BusinessData): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.BUSINESS_DATA, JSON.stringify({
      ...businessData,
      productos: businessData.productos.map(producto => ({
        ...producto,
        fechaCreacion: producto.fechaCreacion.toISOString()
      }))
    }))
  } catch (error) {
    console.error('Error saving business data:', error)
  }
}

export const loadBusinessData = (): BusinessData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BUSINESS_DATA)
    if (!data) return null
    
    const parsed = JSON.parse(data)
    return {
      ...parsed,
      productos: parsed.productos.map((producto: any) => ({
        ...producto,
        fechaCreacion: new Date(producto.fechaCreacion)
      }))
    }
  } catch (error) {
    console.error('Error loading business data:', error)
    return null
  }
}

// Session management
export const setCurrentUser = (email: string): void => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, email)
}

export const getCurrentUser = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
}

export const setCurrentBusiness = (email: string): void => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_BUSINESS, email)
}

export const getCurrentBusiness = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.CURRENT_BUSINESS)
}

export const clearSession = (): void => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
  localStorage.removeItem(STORAGE_KEYS.CURRENT_BUSINESS)
}

// Utility functions
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const generateMetaCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Data validation
export const validateUserData = (data: any): data is UserData => {
  return (
    data &&
    typeof data.nombre === 'string' &&
    typeof data.email === 'string' &&
    typeof data.saldo === 'number' &&
    Array.isArray(data.metas) &&
    Array.isArray(data.historialTransferencias)
  )
}

export const validateBusinessData = (data: any): data is BusinessData => {
  return (
    data &&
    typeof data.nombre === 'string' &&
    typeof data.email === 'string' &&
    typeof data.sector === 'string' &&
    Array.isArray(data.productos) &&
    data.estadisticas &&
    typeof data.estadisticas.ventas === 'number'
  )
}