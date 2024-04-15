import React from "react";
import "./index.css";
import { useState } from "react";
import medFlask from "./iceflowCharc.webp";
import larFlask from "./iceflowcharc2.webp";
import larFlask2 from "./iceflowcharc3.webp";
import { useCart } from "./cartContext";
import axios from "axios";

const bottles = [
  {
    id: 1,
    name: "VONGO INSULATED FLASK",
    size: ["medium", " large"],
    colors: ["Sand", "Black", "Green", "Grey"],
    srcs: {
      medium: {
        black: [medFlask, medFlask, medFlask],
        tan: [medFlask, "image2", "image3"],
        blue: [medFlask, "image2", "image3"],
        green: [medFlask, "image2", "image3"],
        price: 899,
        capacity: "1.9 Liters",
      },
      large: {
        black: [medFlask, "image2", "image3"],
        tan: [medFlask, "image2", "image3"],
        blue: [medFlask, "image2", "image3"],
        green: [medFlask, "image2", "image3"],
        price: 1150,
        capacity: "3.8 Liters",
      },
    },
    src: [medFlask, larFlask, larFlask2],
    description:
      "Our Durable flasks are manufactured with the highest grade materials and constructed with precision. Our Flasks feature double wall and vacuum sealed insulated properties that keep liquids cold or hot for up to 12 hours",
  },
];

export default function Buy() {
  const [useImage, setImage] = useState(0);
  const { cartItems, addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: 1,
      name: bottleSize,
      price: bottles[0].srcs[bottleSize].price,
      src: bottles[0].srcs[bottleSize][bottleColour][0],
      colour: bottleColour,
      capacity: bottles[0].srcs[bottleSize].capacity,
      quantity: useQuant,
    });
  };
  const sendCartToBackend = () => {
    console.log(cartItems);

    const cartForDb = cartItems.map(({ price, colour, quantity }) => ({
      price,
      colour,
      quantity,
    }));
    console.log(cartForDb);
    axios
      .post("http://localhost:5000/api/add", cartForDb)
      .then((response) => {
        console.log("FUck yes");
      })
      .catch((error) => {
        console.error("error adding cart to backend", error);
      });
  };

  function handlePrevious() {
    if (useImage > 0) setImage((s) => s - 1);
  }

  function handleNext() {
    if (useImage < 2) setImage((s) => s + 1);
  }

  const [useQuant, setQuant] = useState(1);

  function addQuant() {
    setQuant((s) => s + 1);
  }

  function lessQuant() {
    if (useQuant > 1) setQuant((s) => s - 1);
  }

  const [clicked, setClicked] = useState(true);

  function handleClick() {
    console.log("clicked");
    setClicked(!clicked);
    if (clicked) setBottleSize("large");
    else setBottleSize("medium");
  }
  const style = {
    opacity: 0.3,
  };
  const selectedStyle = {
    opacity: 1,
    height: "4.5rem",
    width: "4.5rem",
  };

  // next few lines of code are to handle
  // what image gets loaded - ie medium, large and then the colours

  const [bottleSize, setBottleSize] = useState("medium");
  const [bottleColour, setBottleColour] = useState("black");

  const [colourClicked1, setColour1] = useState(true);
  const [colourClicked2, setColour2] = useState(false);
  const [colourClicked3, setColour3] = useState(false);
  const [colourClicked4, setColour4] = useState(false);

  function handleColour1() {
    setColour1(true);
    setColour2(false);
    setColour3(false);
    setColour4(false);
    setBottleColour("green");
  }
  function handleColour2() {
    setColour2(true);
    setColour1(false);
    setColour3(false);
    setColour4(false);
    setBottleColour("tan");
  }
  function handleColour3() {
    setColour3(true);
    setColour1(false);
    setColour2(false);
    setColour4(false);
    setBottleColour("blue");
  }
  function handleColour4() {
    setColour4(true);
    setColour1(false);
    setColour2(false);
    setColour3(false);
    setBottleColour("black");
  }

  return (
    <div>
      {bottles.map((items) => (
        <div className="grid-items" key={items.id}>
          <div className="grid-heading">
            <h1>{items.name}</h1>
          </div>
          <div className="images">
            <button className="left-img-button" onClick={handlePrevious}>
              P
            </button>

            <img src={items.srcs[bottleSize][bottleColour][useImage]} />
            <button className="right-img-button" onClick={handleNext}>
              N
            </button>
          </div>
          <div>
            <div className="price-div">
              <h3 className="price">R{items.srcs[bottleSize].price} </h3>
            </div>
            <div className="medium-large-div">
              <button
                className={
                  clicked
                    ? "medium-large-button-selected"
                    : "medium-large-button"
                }
                onClick={handleClick}
              >
                1.9l
              </button>
              <button
                className={
                  !clicked
                    ? "medium-large-button-selected"
                    : "medium-large-button"
                }
                onClick={handleClick}
              >
                3.8l
              </button>
            </div>
            <div className="colour-palet">
              <button
                className="colour1"
                style={colourClicked1 ? selectedStyle : style}
                onClick={handleColour1}
              ></button>
              <button
                className="colour2"
                style={colourClicked2 ? selectedStyle : style}
                onClick={handleColour2}
              ></button>
              <button
                className="colour3"
                style={colourClicked3 ? selectedStyle : style}
                onClick={handleColour3}
              ></button>
              <button
                className="colour4"
                style={colourClicked4 ? selectedStyle : style}
                onClick={handleColour4}
              ></button>
            </div>
            <div className="item-description">
              <p1>{items.description}</p1>
            </div>
            <div className="quantity-price">
              <div className="total-price">
                <h2>COLOUR : {bottleColour} </h2>{" "}
              </div>

              <div className="quantity">
                <h2>QTY:</h2>
                <button className="quant-button" onClick={lessQuant}>
                  -
                </button>
                <h2> {useQuant} </h2>
                <button className="quant-button" onClick={addQuant}>
                  +
                </button>
              </div>
              <div className="total-price">
                <h2>TOTAL : R{useQuant * items.srcs[bottleSize].price}</h2>
              </div>
            </div>
            <div className="snowflake">
              <h1>&#10052;</h1>

              <h3> 12 Hrs</h3>
              <h1>&#9832;</h1>
              <h3> 8 Hrs</h3>
            </div>
            <div className="add-cart-div">
              <button className="add-to-cart" onClick={handleAddToCart}>
                ADD TO CART
              </button>
              <button className="add-to-cart" onClick={sendCartToBackend}>
                Send backend
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
