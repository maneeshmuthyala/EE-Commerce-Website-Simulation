import { Component } from "react";
import Navbar from "../Navbar";
import ProductCard from "../ProductCard";
import "./index.css";

class Products extends Component {
  state = {
    products: [],
    filteredProducts: [],
    loading: true,
    error: "",

    searchText: "",
    category: "all",
    maxPrice: "",
    inStockOnly: false,
  };

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const apiProducts = await response.json();

      const vendorProducts =
        JSON.parse(localStorage.getItem("vendorProducts")) || [];

      const formattedVendorProducts = vendorProducts.map(product => ({
        ...product,
        id: `vendor-${product.id}`,
        inStock: product.inStock ?? true,
      }));

      const allProducts = [
        ...formattedVendorProducts,
        ...apiProducts.map(p => ({ ...p, inStock: true })),
      ];

      this.setState({
        products: allProducts,
        filteredProducts: allProducts,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: "Failed to load products",
        loading: false,
      });
    }
  };

  applyFilters = () => {
    const {
      products,
      searchText,
      category,
      maxPrice,
      inStockOnly,
    } = this.state;

    const filtered = products.filter(product => {
      const matchesSearch =
        product.title
          .toLowerCase()
          .includes(searchText.toLowerCase());

      const matchesCategory =
        category === "all" || product.category === category;

      const matchesPrice =
        !maxPrice || product.price <= Number(maxPrice);

      const matchesStock =
        !inStockOnly || product.inStock;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesStock
      );
    });

    this.setState({ filteredProducts: filtered });
  };

  handleChange = (e) => {
    this.setState(
      { [e.target.name]: e.target.value },
      this.applyFilters
    );
  };

  handleCheckbox = (e) => {
    this.setState(
      { inStockOnly: e.target.checked },
      this.applyFilters
    );
  };

  render() {
    const {
      filteredProducts,
      loading,
      error,
      searchText,
      category,
      maxPrice,
      inStockOnly,
    } = this.state;

    if (loading) return <p className="loading">Loading products...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
      <>
        <div className="filter-bar">
          <input
            type="text"
            name="searchText"
            value={searchText}
            placeholder="Search products..."
            onChange={this.handleChange}
          />

          <select
            name="category"
            value={category}
            onChange={this.handleChange}
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men</option>
            <option value="women's clothing">Women</option>
          </select>

          <input
            type="number"
            name="maxPrice"
            value={maxPrice}
            placeholder="Max Price"
            onChange={this.handleChange}
          />

          <label className="stock-filter">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={this.handleCheckbox}
            />
            In Stock
          </label>
        </div>

        {/* 🛍 PRODUCTS */}
        <div className="container products-grid">
          {filteredProducts.length === 0 ? (
            <p className="no-results">No products found</p>
          ) : (
            filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          )}
        </div>
      </>
    );
  }
}

export default Products;
