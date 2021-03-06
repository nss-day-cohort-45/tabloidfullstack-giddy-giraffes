import React from "react";

export default function Hello() {
    let currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
  return (
    <span style={{
      position: "fixed",
      left: 0,
      right: 0,
      top: "50%",
      marginTop: "-0.5rem",
      textAlign: "center",
    }}>Hello {currentUser.displayName}!</span>
  );
}