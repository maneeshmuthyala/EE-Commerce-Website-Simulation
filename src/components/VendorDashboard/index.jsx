import { Component } from "react";
import VendorProductForm from "../VendorProductForm";
import VendorSales from "../VendorSales";
import "./index.css";

class VendorDashboard extends Component {
  state = {
    products: [],
    editProduct: null,
  };

  componentDidMount() {
    const storedProducts =
      JSON.parse(localStorage.getItem("vendorProducts")) || [];
    this.setState({ products: storedProducts });
  }

  saveProducts = (products) => {
    localStorage.setItem("vendorProducts", JSON.stringify(products));
    this.setState({ products, editProduct: null });
  };

  addProduct = async (product) => {
  try {
    // 1️⃣ POST to FakeStore API (simulation)
    await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    // 2️⃣ Save locally (REAL storage)
    const updatedProducts = [...this.state.products, product];
    this.saveProducts(updatedProducts);

    alert("Product added successfully 🚀");
  } catch (error) {
    alert("Failed to add product");
  }
};

  updateProduct = (updatedProduct) => {
    const updatedProducts = this.state.products.map(p =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    this.saveProducts(updatedProducts);
  };

  deleteProduct = (id) => {
    const updatedProducts =
      this.state.products.filter(p => p.id !== id);
    this.saveProducts(updatedProducts);
  };

  render() {
    const { products, editProduct } = this.state;

    return (
      <div className="vendor-container">
        <h2 className="vendor-title">Vendor Dashboard</h2>

        <VendorProductForm
          addProduct={this.addProduct}
          editProduct={editProduct}
          updateProduct={this.updateProduct}
        />

        <h3 className="section-title">My Products</h3>

        <div className="vendor-products">
          {products.map(product => (
            <div className="vendor-card" key={product.id}>
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p>₹{product.price}</p>

              <div className="vendor-actions">
                <button
                  onClick={() =>
                    this.setState({ editProduct: product })
                  }
                >
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => this.deleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <VendorSales />
      </div>
    );
  }
}

export default VendorDashboard;
