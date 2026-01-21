import React, { useEffect, useRef, useState } from "react";
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import '../styles/virtualKeyboard.css'

const VirtualKeyboard = () => {
  const keyboardRef = useRef();
  const [input, setInput] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false); // Toggle state

  useEffect(() => {
    if (showKeyboard) {
      keyboardRef.current = new Keyboard({
        onChange: input => setInput(input),
        onKeyPress: button => console.log("Pressed:", button),
      });
    } else {
      if (keyboardRef.current) {
        keyboardRef.current.destroy(); // Clean up when hidden
      }
    }
  }, [showKeyboard]);

  const handleInputChange = e => {
    const value = e.target.value;
    setInput(value);
    if (keyboardRef.current) {
      keyboardRef.current.setInput(value);
    }
  };

  return (
    <div>
      <input
        value={input}
        placeholder="Type something"
        onChange={handleInputChange}
        onFocus={() => setShowKeyboard(true)}
      />

      <button onClick={() => setShowKeyboard(prev => !prev)} style={{ margin: "1rem" }}>
        {showKeyboard ? "Hide Keyboard" : "Show Keyboard"}
      </button>

      {showKeyboard && <div className="simple-keyboard" />}
    </div>
  );
};

export default VirtualKeyboard;
