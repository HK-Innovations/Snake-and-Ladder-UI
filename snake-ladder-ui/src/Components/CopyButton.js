import React, { useState } from "react";
import clipboardCopy from "clipboard-copy";

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    clipboardCopy(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <p style={{ marginRight: "10px" }}> {text}</p>

      <div
        style={{
          height: "30px",
          backgroundColor: "#f0f0f0",
          cursor: "pointer",
          border: "1px solid #ccc",
          borderRadius: "3px",
        }}
        onClick={handleCopy}
      >
        Click to copy
        {copied && (
          <span style={{ marginLeft: "4px", color: "green" }}>Copied!</span>
        )}
      </div>
    </div>
  );
};

export default CopyButton;
