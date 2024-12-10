import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>404</h1>
      <h2>NotFoundPage</h2>
      <Link to="/">Back to home</Link>
    </div>
  );
};

export default NotFoundPage;
