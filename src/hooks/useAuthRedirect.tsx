
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

interface UseAuthRedirectProps {
  onUnauthorized: () => void;
  message?: string;
}

export const useAuthRedirect = ({ onUnauthorized, message = 'Please log in to access this feature.' }: UseAuthRedirectProps) => {
  const { isAuthenticated } = useAuthStore();

  const checkAuthAndRedirect = () => {
    if (!isAuthenticated) {
      toast.error(message);
      onUnauthorized();
      return false;
    }
    return true;
  };

  return { checkAuthAndRedirect, isAuthenticated };
};
