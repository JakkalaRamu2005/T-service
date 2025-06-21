
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  mobile: string;
  aadhaar: string;
  email?: string;
  address?: string;
  dateOfBirth?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  currentStep: 'mobile' | 'mobile-otp' | 'aadhaar' | 'aadhaar-otp' | 'completed';
  tempData: {
    mobile?: string;
    aadhaar?: string;
  };
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  setStep: (step: AuthState['currentStep']) => void;
  setTempData: (data: Partial<AuthState['tempData']>) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      currentStep: 'mobile',
      tempData: {},
      login: (user) => set({ isAuthenticated: true, user, currentStep: 'completed' }),
      logout: () => set({ isAuthenticated: false, user: null, currentStep: 'mobile', tempData: {} }),
      updateUser: (user) => set({ user }),
      setStep: (step) => set({ currentStep: step }),
      setTempData: (data) => set((state) => ({ tempData: { ...state.tempData, ...data } })),
      resetAuth: () => set({ currentStep: 'mobile', tempData: {} }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
