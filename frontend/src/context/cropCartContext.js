import { createContext, useContext } from "react";
export const cropCartContext = createContext({
  pin:'',
  cart: [],
  cartProdQuantity:2,
  addToCart: (id) => {},
  removeFromCart: (id) => {},
  changePin: (pin) => {},
  incrementProduct: (id) => {},
  decrementProduct: (id) => {}
});

export const CropCartProvider = cropCartContext.Provider;

export const useCropCart = function() {
 return useContext(cropCartContext);
}
