import { Component } from "react";
import "./index.css";

class VendorSales extends Component {
  state = {
    orders: [],
  };

  componentDidMount() {
    const orders =
      JSON.parse(localStorage.getItem("orders")) || [];
    this.setState({ orders });
  }

  render() {
    const { orders } = this.state;

    return (
      <div className="sales-section">
        <h3 className="section-title">Sales History</h3>

        {orders.length === 0 ? (
          <p>No sales yet</p>
        ) : (
          orders.map(order =>
            order.items.map((item, index) => (
              <div className="sale-card" key={index}>
                <p><strong>{item.title}</strong></p>
                <p>Qty: {item.quantity}</p>
                <p>Date: {order.date}</p>
              </div>
            ))
          )
        )}
      </div>
    );
  }
}

export default VendorSales;
