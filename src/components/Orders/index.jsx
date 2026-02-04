import { Component } from "react";
import "./index.css";
class Orders extends Component {
  state = {
    orders: [],
  };

  componentDidMount() {
    const storedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];
    this.setState({ orders: storedOrders });
  }

  render() {
    const { orders } = this.state;

    // Flatten orders into individual items
    const orderItems = orders.flatMap(order =>
      order.items.map(item => ({
        ...item,
        orderId: order.orderId,
        date: order.date,
      }))
    );

    return (
      <div className="container">
        <h2 className="orders-title">My Orders</h2>

        {orderItems.length === 0 ? (
          <p className="empty-orders">No orders placed yet.</p>
        ) : (
          orderItems.map((item, index) => (
            <div className="order-card" key={index}>
              <img
                src={item.image}
                alt={item.title}
                className="order-img"
              />

              <div className="order-info">
                <h4>{item.title}</h4>
                <p>Order ID: {item.orderId}</p>
                <p>Date: {item.date}</p>
                <p>Qty: {item.quantity}</p>
                <strong>₹{item.price * item.quantity}</strong>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default Orders;
