import { faPercentage, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductsContext } from './ProductsContext';
import { toast } from 'react-toastify';
import api from '../api/useraxios';
import WishlistAction from './WishlistAction';

function reducer(state, action) {
  switch (action.type) {
    case 'SET_WEIGHT':
      return { ...state, activeWeight: action.payload };
    case 'INCREMENT_QUANTITY':
      return { ...state, quantity: state.quantity + 1 };
    case 'DECREMENT_QUANTITY':
      return { ...state, quantity: state.quantity > 1 ? state.quantity - 1 : 1 };
    case 'RESET':
      return { ...action.payload };
    default:
      return state;
  }
}

function ProductDetailsBox({ details }) {
  const { user, cart, setCart } = useContext(ProductsContext);
  const navigate = useNavigate();

  if (!details || !details.price || details.price.length === 0) {
    return <div>Loading...</div>;
  }

  const defaultWeight = details.price[0].metric;

  // Initialize state with cart quantity if exists
  const initialCartItem = cart.find(
    (p) => p.productId === details._id && p.weight === defaultWeight
  );

  const initialState = {
    activeWeight: defaultWeight,
    quantity: initialCartItem ? initialCartItem.quantity : 1,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // Reset state whenever details or cart change
  useEffect(() => {
    const existingItem = cart.find(
      (p) => p.productId === details._id && p.weight === state.activeWeight
    );

    dispatch({
      type: 'RESET',
      payload: {
        activeWeight: state.activeWeight,
        quantity: existingItem ? existingItem.quantity : 1,
      },
    });
  }, [cart, details, state.activeWeight]);

  const currentPrice =
    details.price.find((p) => p.metric === state.activeWeight) || details.price[0];

  const offerPriceNum = Number(currentPrice.offerprice || 0);
  const mrpNum = Number(currentPrice.mrp || 0);

  const totalOfferPrice = offerPriceNum * state.quantity;
  const totalMRP = mrpNum * state.quantity;
  const discount = totalMRP - totalOfferPrice;
  const offerPercent = totalMRP > 0 ? Math.round((discount / totalMRP) * 100) : 0;

  const handleAddToCart = async () => {
    const productId = details._id;
    const weight = state.activeWeight;
    const quantity = state.quantity;

    // ---- Guest Cart ----
    if (!user?.email) {
      let localCart = JSON.parse(sessionStorage.getItem('cart')) || [];

      const existingIndex = localCart.findIndex(
        (item) => item.productId === productId && item.weight === weight
      );

      if (existingIndex > -1) {
        localCart[existingIndex].quantity = quantity; // replace quantity
        toast.info('Cart updated (guest)');
      } else {
        localCart.push({ productId, weight, quantity });
        toast.success('Added to cart (guest)');
      }

      sessionStorage.setItem('cart', JSON.stringify(localCart));
      setCart(localCart);
      navigate('/cart');
      return;
    }

    // ---- User Cart ----
    if (user.role !== 'user') {
      toast.error('Only users can add to cart!');
      return;
    }

    try {
      const res = await api.post(
        '/cart/change',
        { productId, weight, quantity },
        { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
      );

      setCart(res.data.products || []);
      toast.success('Added to cart!');
      navigate('/cart');
    } catch (err) {
      console.error('Cart error:', err);
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="col-12 mb-24 col-lg-7">
      <div className="bb-single-pro-contact">
        <div className="bb-sub-title">
          <h4>{details.productname}</h4>
        </div>

        <div className="bb-single-rating">
          <span className="bb-pro-rating">
            {[...Array(4)].map((_, i) => (
              <i key={i} className="ri-star-fill" />
            ))}
            <i className="ri-star-line" />
          </span>
          <span className="bb-read-review">
            | <a href="#bb-spt-nav-review">992 Ratings</a>
          </span>
        </div>

        <p dangerouslySetInnerHTML={{ __html: details.description1 }} />

        <div className="bb-single-price-wrap">
          <div className="bb-single-price">
            <div className="price">
              <h5>
                ₹{offerPriceNum} <span>-{offerPercent}%</span>
              </h5>
            </div>
            <div className="mrp">
              <p>
                M.R.P. : <span>₹{mrpNum}</span>
              </p>
            </div>
          </div>
          <div className="bb-single-price">
            <div className="sku">
              <h5>SKU#: {details.sku}</h5>
            </div>
            <div className="stock">
              <span className="item-left">
                {currentPrice.stock <= 0
                  ? 'Out Of Stock'
                  : currentPrice.stock <= 25
                  ? `Only ${currentPrice.stock} Left`
                  : `In stock`}
              </span>
            </div>
          </div>
        </div>

        <div
          className="bb-single-list"
          dangerouslySetInnerHTML={{ __html: details.description2 }}
        />

        <div className="row justify-content-end">
          <div className="col-md-8 col-12">
            {/* Weight Selector */}
            <div className="bb-single-pro-weight">
              <div className="pro-title">
                <h4>Weight</h4>
              </div>
              <div className="bb-pro-variation-contant">
                <ul>
                  {details.price.map((item, index) => (
                    <li
                      key={index}
                      className={item.metric === state.activeWeight ? 'active-variation' : ''}
                      onClick={() => dispatch({ type: 'SET_WEIGHT', payload: item.metric })}
                      style={{ cursor: 'pointer' }}
                    >
                      <span>{item.metric}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="bb-single-qty">
              <div className="qty-plus-minus">
                <div
                  className="bb-qtybtn"
                  onClick={() => dispatch({ type: 'DECREMENT_QUANTITY' })}
                >
                  -
                </div>
                <input
                  readOnly
                  className="qty-input location-select"
                  type="text"
                  value={state.quantity}
                />
                <div
                  className="bb-qtybtn"
                  onClick={() => dispatch({ type: 'INCREMENT_QUANTITY' })}
                >
                  +
                </div>
              </div>
              <div className="buttons">
                <button className="bb-btn-2" onClick={handleAddToCart}>
                  <i className="ri-shopping-bag-line"></i> Add to Cart
                </button>
              </div>

              <ul className="bb-pro-actions">
                <WishlistAction id={details._id} />
              </ul>
            </div>
          </div>

          <div className="bb-inner-tabs mt-3 col-md-4 col-12">
            <div className="d-flex gap-5 justify-content-between">
              <h6>MRP:</h6>
              <p>₹{totalMRP}</p>
            </div>
            <div className="d-flex gap-5 justify-content-between">
              <p className="fw-bold">
                Discount: <FontAwesomeIcon icon={faPercentage} className="clr-theme" />
              </p>
              <p>-₹{discount}</p>
            </div>
            <hr />
            <div className="d-flex gap-5 justify-content-between">
              <p className="fw-bold">
                Total Price: <FontAwesomeIcon icon={faTags} className="clr-theme" />
              </p>
              <p>₹{totalOfferPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsBox;
