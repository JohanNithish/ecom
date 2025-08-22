import React, { useEffect, useState, useContext } from 'react';
import Breadcrumb from '../comp/Breadcrum';
import { ProductsContext } from '../comp/ProductsContext';
import api from '../api/useraxios';
import { toast } from 'react-toastify';

const OrdersPage = () => {
  const { user } = useContext(ProductsContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) return;
      try {
        const res = await api.get(`/orders/${user.id}`, { withCredentials: true });
        if (res.data?.success) {
          setOrders(res.data.orders);
        } else {
          toast.error(res.data?.message || "Failed to fetch orders");
        }
      } catch (err) {
        console.error("Fetch orders failed:", err);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) return <p className="text-center mt-5">Loading orders...</p>;

  if (!orders.length)
    return (
      <>
        <Breadcrumb page="My Orders" />
        <div className="container mt-5">
          <h4>No orders found</h4>
        </div>
      </>
    );

  return (
    <>
      <Breadcrumb page="My Orders" />
      <section className="section-orders padding-tb-50">
        <div className="container">
          {orders.map((order) => (
            <div key={order._id} className="card mb-4 shadow-sm">
              <div className="card-header">
                <strong>Order ID:</strong> {order._id} &nbsp; | &nbsp;
                <strong>Status:</strong> {order.status} &nbsp; | &nbsp;
                <strong>Payment:</strong> {order.payment_method} &nbsp; | &nbsp;
                <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString('en-GB')}
              </div>
              <div className="card-body">
                <h5>Shipping Address:</h5>
                <p>
                  {order.userDetails.firstName} {order.userDetails.lastName} <br />
                  {order.userDetails.address}, {order.userDetails.city}, {order.userDetails.state} <br />
                  {order.userDetails.country} - {order.userDetails.postCode}
                </p>

                <h5>Products:</h5>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((p, i) => (
                      <tr key={i}>
                        <td>{p.name} ({p.weight})</td>
                        <td>{p.quantity}</td>
                        <td>₹{p.price}</td>
                        <td>₹{p.price * p.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className="fw-bold text-end">
                  Total Amount: ₹{order.products.reduce((sum, p) => sum + p.price * p.quantity, 0)}
                </p>
                <p className="fw-bold text-end">Delivery Charges: ₹22.2</p>
                <p className="fw-bold text-end">GST: 5%</p>
                <h6 className="text-end">
                  Grand Total: ₹{(
                    order.products.reduce((sum, p) => sum + p.price * p.quantity+22.2, 0) * 1.05
                  ).toFixed(2)}
                </h6>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default OrdersPage;
