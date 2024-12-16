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
    if (cookies.get("cart")) setCookieValue(Math.min(cookies.get("cart").length, 99));
    else setCookieValue(0);
  };

  const add = (sku: number) => {
    if (cookies.get("cart")) {
      const cart = cookies.get("cart");
      cart.push(sku);
      console.log(cart);
      cookies.set("cart", cart);
      setCookieValue(Math.min(cart.length, 99));
    } else {
      cookies.set("cart", [sku]);
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
