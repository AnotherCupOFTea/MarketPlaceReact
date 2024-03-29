import React from "react";
import axios from "axios";
import { API } from "../helpers/const";
import { calcSubPrice, calcTotalPrice } from "../helpers/calcPrice";

export const ClientContext = React.createContext();

let cart = JSON.parse(sessionStorage.getItem("cart"));
let like = JSON.parse(localStorage.getItem("like"));

const Init_State = {
  products: null,
  productsCount: cart ? cart.products.length : 0,
  like: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_CLIENT_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_AND_DELETE_PRODUCT_IN_CART":
      return { ...state, productsCount: action.payload }; 
    case "ADD_AND_DELETE_PRODUCT_IN_LIKE":
      return { ...state, };
    case "GET_CART":
      return { ...state, cart: action.payload };
    case "GET_LIKE":
      return { ...state, like: action.payload };
    default:
      return state;
  }
};

const ClientProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, Init_State);

  // ! Read

  const getClientProducts = async () => {
    try {
      let response = await axios(API);
      let action = {
        type: "GET_CLIENT_PRODUCTS",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const addAndDeleteProductInCard = (product) => {
    let cart = JSON.parse(sessionStorage.getItem("cart"));

    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }

    let cartProduct = {
      product: product,
      count: 1,
      subPrice: 0,
    };

    cartProduct.subPrice = calcSubPrice(cartProduct);

    let check = cart.products.find((item) => {
      return item.product.id === product.id;
    });

    // console.log(check);

    if (!check) {
      cart.products.push(cartProduct);
    } else {
      cart.products = cart.products.filter((item) => {
        return item.product.id !== product.id;
      });
    }

    cart.totalPrice = calcTotalPrice(cart.products);
    sessionStorage.setItem("cart", JSON.stringify(cart));

    let action = {
      type: "ADD_AND_DELETE_PRODUCT_IN_CART",
      payload: cart.products.length,
    };

    dispatch(action);
    console.log(cart.totalPrice)
    getCart()
  };

  const checkProductInCart = (id) => {
    let cart = JSON.parse(sessionStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
      };
    }

    let check = cart.products.find((item) => {
      return item.product.id === id;
    });

    if (!check) {
      return false;
    } else {
      return true;
    }
  };

  const getCart = async () => {
    let cart = JSON.parse(sessionStorage.getItem("cart"));

    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }

    let action = {
      type: "GET_CART",
      payload: cart,
    };
    dispatch(action);
  };

  const changeCountCartProduct = (value, id) => {
    let cart = JSON.parse(sessionStorage.getItem("cart"));
    cart.products = cart.products.map((item) => {
      if (item.product.id === id) {
        item.count = value;
        item.subPrice = calcSubPrice(item);
      }
      return item;
    });
    cart.totalPrice = calcTotalPrice(cart.products);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  };

  const deleteProductInCart = (id) => {
    let cart = JSON.parse(sessionStorage.getItem("cart"));
    cart.products = cart.products.filter((item) => {
      return item.products.id !== id;
    });
    cart.totalPrice = calcTotalPrice(cart.products);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    getCart();

    let action = {
      type: "ADD_AND_DELETE_PRODUCT_IN_CART",
      payload: cart.products.length,
    };

    dispatch(action);
  };

  const addAndDeleteProductInLike = (product) => {
    let like = JSON.parse(localStorage.getItem("like"));

    if (!like) {
      like = {
        products: [],
        
      };
    }

    let cartProduct = {
      product: product,
      
    };

    

    let check = like.products.find((item) => {
      return item.product.id === product.id;
    });

    // console.log(check);

    if (!check) {
      like.products.push(cartProduct);
    } else {
      like.products = like.products.filter((item) => {
        return item.product.id !== product.id;
      });
    }

    
    localStorage.setItem("like", JSON.stringify(like));

    let action = {
      type: "ADD_AND_DELETE_PRODUCT_IN_LIKE",
      payload: like.products.length,
    };

    dispatch(action);
  };

  const checkProductInLike = (id) => {
    let like = JSON.parse(localStorage.getItem("like"));
    if (!like) {
      like = {
        products: [],
      };
    }

    let check = like.products.find((item) => {
      return item.product.id === id;
    });

    if (!check) {
      return false;
    } else {
      return true;
    }
  };

  const getLike = async () => {
    let like = JSON.parse(localStorage.getItem("like"));

    if (!like) {
      like = {
        products: [],
       
      };
    }

    let action = {
      type: "GET_LIKE",
      payload: like,
    };
    dispatch(action);
  };

  return (
    <ClientContext.Provider
      value={{
        getClientProducts,
        addAndDeleteProductInCard,
        checkProductInCart,
        getCart,
        changeCountCartProduct,
        deleteProductInCart,
        addAndDeleteProductInLike,
        checkProductInLike: checkProductInLike,
        getLike: getLike,
        products: state.products,
        productsCount: state.productsCount,
        cart: state.cart,
        like:state.like,
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
