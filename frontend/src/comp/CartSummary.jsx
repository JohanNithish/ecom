import React, { useContext, useState } from "react";
import { ProductsContext } from "../comp/ProductsContext";
import { toast } from "react-toastify";
import CheckoutList from "./CheckoutList";

function CartSummary({isList}) {
  const { cart, products } = useContext(ProductsContext);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  // Build cart items with product data
  const cartItems = cart
    .map((c) => {
      const product = products.find(
        (p) => p.id === c.productId || p._id === c.productId
      );
      return product ? { ...product, qty: c.quantity } : null;
    })
    .filter(Boolean);

  // 🔹 Calculate amounts
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price[0].offerprice * item.qty,
    0
  );

  const delivery = 22.2;
  const gst = (subTotal * 0.05); // ✅ 5% GST on subtotal
  const total = subTotal + delivery + gst - discount;

  // 🔹 Coupon Handler
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.toLowerCase() === "save10") {
      setDiscount(10);
      toast.success("Coupon applied: ₹10 off");
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code");
    }
  };

  return (
    <div className="col-lg-4 mb-4">
      <div className="bb-cart-sidebar-block">
        <div className="bb-sb-title">
          <h3>Summary</h3>
        </div>
        <div className="bb-sb-blok-contact">
          <div className="bb-cart-summary">
            <div className="inner-summary">
              <ul>
                <li>
                  <span className="text-left">Sub-Total</span>
                  <span className="text-right">₹{subTotal.toFixed(2)}</span>
                </li>
                <li>
                  <span className="text-left">Delivery Charges</span>
                  <span className="text-right">₹{delivery.toFixed(2)}</span>
                </li>
                <li>
                  <span className="text-left">GST (5%)</span>
                  <span className="text-right">₹{gst.toFixed(2)}</span>
                </li>
                <li>
                  <span className="text-left">Coupon Discount</span>
                  <span className="text-right">
                    <a className="bb-coupon drop-coupon">Apply Coupon</a>
                  </span>
                </li>
                <li>
                  <div className="coupon-down-box">
                    <form onSubmit={handleApplyCoupon}>
                      <input
                        className="bb-coupon"
                        placeholder="Coupon Code"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                      />
                      <button type="submit" className="bb-btn-2 rtl-btn">
                        Apply
                      </button>
                    </form>
                  </div>
                </li>
              </ul>
            </div>
            <div className="summary-total">
              <ul>
                <li>
                  <span className="text-left">Total Amount</span>
                  <span className="text-right">₹{total.toFixed(2)}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {isList &&
        <div className="bb-checkout-sidebar">
        <CheckoutList/>
        </div>}
      </div>
    </div>
  );
}

export default CartSummary;
