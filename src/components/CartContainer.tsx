import React from "react";
import CartItem from "./CartItem";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { displayModal } from "../features/modal/modalSlice";

const CartContainer = () => {
  const dispatch = useAppDispatch();
  const { amount, cartItems, total } = useAppSelector((store) => store.cart);

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2> your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button
          onClick={() => {
            dispatch(displayModal(true));
          }}
          className="btn clear-btn"
        >
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
