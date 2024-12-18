import React, { createContext, useState, useContext, ReactNode } from 'react';
import Cookies from 'universal-cookie';
import { User } from '../types';

interface CookieContextType {
  cookieValue: number;
  user: User | null | undefined;
  getUserData: () => void;
  updateCookie: () => void;
  add: (sku: number) => void;
  decrease: (sku: number) => void;
  remove: (sku: number) => void;
  deleteAll: () => void;
}

const defaultContextValue: CookieContextType = {
  cookieValue: 0,
  user: null,
  getUserData: () => { },
  updateCookie: () => { },
  add: () => { },
  decrease: () => { },
  remove: () => { },
  deleteAll: () => { }
};

const CartCookieContext = createContext<CookieContextType>(defaultContextValue);

interface CookieProviderProps {
  children: ReactNode;
}

export const CartCookieProvider: React.FC<CookieProviderProps> = ({ children }) => {
  const cookies = new Cookies();
  const [cookieValue, setCookieValue] = useState<number>(0);
  const [user, setUser] = useState<User | null | undefined>(undefined);

  const updateCookie = () => {
    if (cookies.get("cart")) {
      const cart: { [key: number]: number } = cookies.get("cart");
      setCookieValue(Math.min(Object.values(cart).reduce((a, b) => a + b, 0), 99));
    }
    else setCookieValue(0);
  };

  const add = (sku: number) => {
    if (cookies.get("cart")) {
      const cart: { [key: number]: number } = cookies.get("cart");
      if (cart[sku]) cart[sku]++;
      else cart[sku] = 1;
      cookies.set("cart", cart);

      setCookieValue(Math.min(Object.values(cart).reduce((a, b) => a + b, 0), 99));
    } else {
      const cart: { [key: number]: number } = {};
      cart[sku] = 1;
      cookies.set("cart", cart);
      setCookieValue(1);
    }
  }

  const decrease = (sku: number) => {
    if (cookies.get("cart")) {
      const cart: { [key: number]: number } = cookies.get("cart");
      if (cart[sku] > 1) cart[sku]--;
      else delete cart[sku];
      cookies.set("cart", cart);
      setCookieValue(Math.min(Object.values(cart).reduce((a, b) => a + b, 0), 99));
    }
  }

  const remove = (sku: number) => {
    if (cookies.get("cart")) {
      const cart: { [key: number]: number } = cookies.get("cart");
      delete cart[sku];
      cookies.set("cart", cart);
      setCookieValue(Math.min(Object.values(cart).reduce((a, b) => a + b, 0), 99));
    }
  }

  const deleteAll = () => {
    if (cookies.get("cart")) {
      cookies.set("cart", {});
      setCookieValue(0);
    }
  }

  const getUserData = async () => {
    if (!cookies.get("access_token")) {
      setUser(null);
      return;
    }
    const response = await fetch('http://localhost:3000/users/isLoggedIn', {
      method: "GET",
      headers: new Headers({
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + cookies.get("access_token")
      })
    });
    if (!response.ok || response.status == 401) {
      setUser(null);
      return;
    }
    setUser(await response.json());
  }

return (
  <CartCookieContext.Provider value={{ cookieValue, user, getUserData, updateCookie, add, decrease, remove, deleteAll }}>
    {children}
  </CartCookieContext.Provider>
);
};

export const useCartCookie = (): CookieContextType => {
  return useContext(CartCookieContext);
};
