import { Component } from "react";
import withRouter from "../../utils/withRouter";
import "./index.css";

class Cart extends Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    this.setState({ cart: cartData });
  }


  removeItem = (id) => {
  const updatedCart = this.state.cart
    .map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    })
    .filter(item => item.quantity > 0);

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  this.setState({ cart: updatedCart });
};


  getTotalAmount = () => {
    const { cart } = this.state;
    return cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  purchaseItems = () => {
    const { cart } = this.state;
    if (cart.length === 0) return;

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      orderId: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      items: cart,
      total: this.getTotalAmount(),
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem("cart");
    this.setState({ cart: [] });

    
    this.props.history.push("/orders");
  };

  render() {
    const { cart } = this.state;

    return (
      <div className="container">
        <h2 className="cart-title">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty 🛒</p>
        ) : (
          <>
            {cart.map(item => (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-img"
                />

                <div className="cart-info">
                  <h4>{item.title}</h4>
                  <p>₹{item.price}</p>
                  <p>Qty: {item.quantity}</p>

                  <button
                    className="remove-btn"
                    onClick={() => this.removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-footer">
              <h3>Total: ₹{this.getTotalAmount()}</h3>
              <button
                className="purchase-btn"
                onClick={this.purchaseItems}
              >
                Purchase
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(Cart);
