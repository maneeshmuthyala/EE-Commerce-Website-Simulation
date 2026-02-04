import { Component } from "react";
import { Navigate } from "react-router-dom";
import "./index.css";

class Loginpage extends Component {
  state = {
    email: "",
    password: "",
    isLoggedIn: false,
    error: ""
  };

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ error: "Invalid email or password" });
    }
  };

  render() {
    const { email, password, isLoggedIn, error } = this.state;

    if (isLoggedIn) {
      return <Navigate to="/" replace />;
    }

    return (
      <div className="login-bg">
        <form className="login-card" onSubmit={this.onSubmitForm}>
          <h1 className="login-title">Sign in</h1>

          <input
            type="email"
            placeholder="Email address"
            className="login-input"
            value={email}
            onChange={this.onChangeEmail}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={this.onChangePassword}
            required
          />

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="login-btn">
            Continue
          </button>
        </form>
      </div>
    );
  }
}

export default Loginpage;
