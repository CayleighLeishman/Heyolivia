import React from "react";
import "./MessageBubble.css";

export default function MessageBubble({ text, type, sender }) {
  return type === "image" ? (
    <div className={`message image-message ${sender}`}>
      <img src={text} alt="chat response" />
    </div>
  ) : (
    <div className={`message ${sender}`}>
      {text}
    </div>
  );
}
