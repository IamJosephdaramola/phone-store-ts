import React from "react";
import { CartIcon } from "../icons";
import { useAppSelector } from "../hooks/hooks";

const Navbar = () => {
  const { amount } = useAppSelector((store) => store.cart);

  return (
    <nav>
      <div className="nav-center">
        <h3>Phone Store</h3>
        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
