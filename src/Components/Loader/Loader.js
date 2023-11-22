import React from "react";
import "./Loader.css";
function Loader({ style }) {
  return (
    <div className="rotating-loader">
      <div className="spinner" style={style}></div>
    </div>
  );
}

export default Loader;
