import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import Cookies from 'universal-cookie';

interface CookieContextType {
  cookieValue: string;
  updateCookie: (newValue: string) => void;
}

const defaultContextValue: CookieContextType = {
  cookieValue: '',
  updateCookie: () => {},
};

const CartCookieContext = createContext<CookieContextType>(defaultContextValue);

interface CookieProviderProps {
  children: ReactNode;
}

export const CartCookieProvider: React.FC<CookieProviderProps> = ({ children }) => {
  const cookies = new Cookies();
  const [cookieValue, setCookieValue] = useState<string>(() => {
    return cookies.get('cookieName') || '';
  });

  const updateCookie = (newValue: string) => {
    cookies.set('cookieName', newValue, { path: '/' });
    setCookieValue(newValue);
  };

  useEffect(() => {
    setCookieValue(cookies.get('cookieName') || '');
  }, [cookies]);

  return (
    <CartCookieContext.Provider value={{ cookieValue, updateCookie }}>
      {children}
    </CartCookieContext.Provider>
  );
};

export const useCartCookie = (): CookieContextType => {
  return useContext(CartCookieContext);
};
