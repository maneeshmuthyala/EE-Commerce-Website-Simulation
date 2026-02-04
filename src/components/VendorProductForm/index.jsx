import { Component } from "react";
import "./index.css";

class VendorProductForm extends Component {
  state = {
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.editProduct &&
      prevProps.editProduct !== this.props.editProduct
    ) {
      this.setState({ ...this.props.editProduct });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitProduct = (e) => {
    e.preventDefault();
    const product = {
      ...this.state,
      id: this.props.editProduct
        ? this.state.id
        : Date.now(),
    };

    this.props.editProduct
      ? this.props.updateProduct(product)
      : this.props.addProduct(product);

    this.setState({
      title: "",
      description: "",
      price: "",
      category: "",
      image: "",
    });
  };

  render() {
    return (
      <form className="vendor-form" onSubmit={this.submitProduct}>
        <input name="title" placeholder="Title" onChange={this.onChange} value={this.state.title} required />
        <input name="price" placeholder="Price" onChange={this.onChange} value={this.state.price} required />
        <input name="category" placeholder="Category" onChange={this.onChange} value={this.state.category} />
        <input name="image" placeholder="Image URL" onChange={this.onChange} value={this.state.image} />
        <textarea name="description" placeholder="Description" onChange={this.onChange} value={this.state.description} />
        <button>{this.props.editProduct ? "Update" : "Add"} Product</button>
      </form>
    );
  }
}

export default VendorProductForm;
