import React, { useRef } from "react";
import { useCart } from "./cartContext";
import { state, useState } from "react";
import "./cart.css";
import axios from "axios";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [order, setOrder] = useState([]);

  var totalPrice = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalPrice += cartItems[i].price * cartItems[i].quantity;
  }

  async function handlePayment() {
    const paymentInfo = {
      header: {
        Authorization: "sk_test_d7acb996eB52bM1fa2f48cd95bc9",
        Content_Type: "application/json",
      },
    };
    console.log(paymentInfo);
    try {
      const response = await axios.post("/api/payment", paymentInfo);
      console.log("response is", response.data);
      return response;
    } catch (error) {
      console.log(error, "YOURE A DUMB NAAI");
      throw error;
    }
  }

  let streetNumber = "";
  let route = "";

  let state = "";
  let country = "";
  let postalCode = "";

  const handleGoogleSearch = (input) => {
    const options = {
      componentRestrictions: { country: "ZA" },
    };
    const autocomplete = new window.google.maps.places.Autocomplete(
      input,
      options
    );
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      console.log(place);
      const addresses = place.formatted_address;
      console.log(addresses);
      setAddress(addresses);

      // Iterate through the address components array
      place.address_components.forEach((component) => {
        const types = component.types;

        // Check the types of the address component and extract relevant information
        if (types.includes("street_number")) {
          streetNumber = component.long_name;
        } else if (types.includes("route")) {
          route = component.long_name;
        } else if (types.includes("locality")) {
          setCity(component.long_name);
        } else if (types.includes("administrative_area_level_1")) {
          state = component.long_name;
        } else if (types.includes("country")) {
          country = component.long_name;
        } else if (types.includes("postal_code")) {
          setZip(component.long_name);
        }
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cartUser = cartItems.map(({ price, colour, quantity }) => ({
      price,
      colour,
      quantity,
    }));
    const newOrder = { name, email, number, address, city, zip, cartUser };
    setOrder([...order, newOrder]);
    console.log("this is your order", order);
    console.log("this is your cart", cartUser);
    axios
      .post("/api/addUser", newOrder)
      .then("success")
      .catch((error) => "error");
  };

  return (
    <div className="cart-grid">
      {cartItems.length < 1 && (
        <div className="empty-cart">
          <h3>Forgot something?... </h3>
        </div>
      )}

      <div className="cart-info">
        {cartItems.length > 0 && (
          <div className="cart-heading">
            <h1>CART SUMMARY</h1>
          </div>
        )}

        {cartItems.map((item, index) => (
          <div className="cart-items-grid" key={index}>
            <div className="items-in-cart" key={index}>
              <img className="image-in-cart" src={item.src} />

              <h3 className="cart-item-text">
                {item.capacity}
                <br />
                COLOUR: {item.colour}
                <br />
                QTY: {item.quantity}
                <br />
                PRICE: {item.price * item.quantity}
              </h3>
            </div>
            <button
              id={index}
              className="remove-button"
              onClick={() => removeFromCart(index)}
            >
              Remove
            </button>
          </div>
        ))}
        {cartItems.length > 0 && (
          <div className="total">
            <h3>PRICE EXCL. SHIPPING:</h3>
            <div className="total-price">
              <h3>
                R{totalPrice} <br />
              </h3>
            </div>
          </div>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="shipping-form">
          <h2>SHIPPING INFO</h2>
          <form onSubmit={handleSubmit}>
            <label for="Name">Name & Surname</label>
            <input
              placeholder="Name and Surname"
              className="input-form"
              value={name}
              type="text"
              id="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <label for="Number">Number</label>
            <input
              className="input-form"
              type="phoneNumber"
              value={number}
              id="number"
              placeholder="123 456 7891"
              required
              onChange={(e) => setNumber(e.target.value)}
            />

            <label for="email">Email</label>
            <input
              className="input-form"
              value={email}
              type="email"
              id="Email"
              placeholder="'john@gmail.com'"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label for="address 1">Address</label>

            <input
              className="input-form"
              value={address}
              type="text"
              onFocus={(e) => handleGoogleSearch(e.target)}
              id="address 1"
              placeholder="Enter Your Address"
              required
              onChange={(e) => setAddress(e.target.value)}
            />

            <label for="City">City</label>
            <input
              className="input-form"
              value={city}
              type="text"
              id="City  "
              placeholder="Cape Town"
              required
              onChange={(e) => setCity(e.target.value)}
            />
            <label for="Zip-Code">Zip Code</label>
            <input
              className="input-form"
              value={zip}
              type="text"
              id="Zip-Code"
              placeholder="8001"
              required
              onChange={(e) => setZip(e.target.value)}
            />
            <button type="submit" className="continue-payment">
              Continue to Payment
            </button>
          </form>
          <button onClick={handlePayment}> Pay </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
