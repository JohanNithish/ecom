import React, { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../comp/ProductsContext';
import { Link } from 'react-router-dom';
function CheckoutList() {
    const { products, cart } = useContext(ProductsContext);
    const ImgSrc = import.meta.env.VITE_IMG;
    
      const [cartItems, setCartItems] = useState([]);
       useEffect(() => {
          if (cart && products.length > 0) {
            const cartProducts = cart
              .map((cartItem) => {
                const product = products.find(
                  (p) => p.id === cartItem.productId || p._id === cartItem.productId
                );
                return product
                  ? {
                      ...product,
                      qty: cartItem.quantity,
                      weight: cartItem.weight,
                      productId: cartItem.productId || product._id || product.id,
                      cartId: cartItem._id || `${cartItem.productId}-${cartItem.weight}`,
                    }
                  : null;
              })
              .filter(Boolean);
      
            setCartItems(cartProducts);
          } else {
            setCartItems([]);
          }
        }, [products, cart]);
  return (
    <> <div className="bb-checkout-pro">
                      {cartItems.map((product) => (
                        <div className="pro-items" key={product.cartId}>
                          <div className="image">
                            <img alt={product.productname} src={ImgSrc + product.images[0]} />
                          </div>
                          <div className="items-contact">
                            <h4><Link to={`/productdetails/`+product.url}>{product.productname}</Link></h4>
                            <span className="bb-pro-rating">
                              {[1, 2, 3, 4, 5].map((star, i) =>
                                <i key={i} className={i < 4 ? "ri-star-fill" : "ri-star-line"}></i>
                              )}
                            </span>
                            <div className="inner-price">
                              <span className="new-price">₹{product.price[0].offerprice*product.qty}</span>
                              <span className="old-price">x {product.qty}</span>
                            </div>
                            <div className="bb-pro-variation">
                              <ul>
                                {product.price.map((prod, i) => (
                                  
                                  <li className={prod.metric === product.weight ? "active" : ""} key={i}>
                                    <div className="bb-opt-sz metric">
                                      {prod.metric}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div></>
  )
}

export default CheckoutList