import "./index.css";
import { Component } from "react";


class ProductCard extends Component {
  addToCart = () => {
    const { product } = this.props;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart 🛒");
  };

  render() {
    const { product } = this.props;

    return (
      <>
      <div className="card">
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
        <p className="category">{product.category}</p>
        <span className="price">₹{product.price}</span>
        <button onClick={this.addToCart}>Add to Cart</button>
      </div>
      </>
    );
  }
}

export default ProductCard;
