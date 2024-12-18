import React, { createContext, useState, useContext, ReactNode } from 'react';
import Cookies from 'universal-cookie';

interface CookieContextType {
  cookieValue: number;
  updateCookie: () => void;
  add: (sku: number) => void;
}

const defaultContextValue: CookieContextType = {
  cookieValue: 0,
  updateCookie: () => {},
  add: () =>{}
};

const CartCookieContext = createContext<CookieContextType>(defaultContextValue);

interface CookieProviderProps {
  children: ReactNode;
}

export const CartCookieProvider: React.FC<CookieProviderProps> = ({ children }) => {
  const cookies = new Cookies();
  const [cookieValue, setCookieValue] = useState<number>(0);

  const updateCookie = () => {
    if (cookies.get("cart")) {
      const cart: {[key: number]: number} = cookies.get("cart");
      setCookieValue(Math.min(Object.values(cart).reduce((a, b) => a+b,0), 99));
    }
    else setCookieValue(0);
  };

  const add = (sku: number) => {
    if (cookies.get("cart")) {
      const cart: {[key: number]: number} = cookies.get("cart");
      if (cart[sku]) cart[sku]++;
      else cart[sku] = 1;
      console.log(cart);
      cookies.set("cart", cart);

      setCookieValue(Math.min(Object.values(cart).reduce((a, b) => a+b,0), 99));
    } else {
      const cart: {[key: number]: number} = {};
      cart[sku] = 1;
      cookies.set("cart", cart);
      setCookieValue(1);
    }
  }

  return (
    <CartCookieContext.Provider value={{ cookieValue, updateCookie, add }}>
      {children}
    </CartCookieContext.Provider>
  );
};

export const useCartCookie = (): CookieContextType => {
  return useContext(CartCookieContext);
};
