import React, { FC } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { displayModal } from "../features/modal/modalSlice";
import { clearCart } from "../features/cart/cartSlice";

const Modal: FC = () => {
  const dispatch = useAppDispatch();

  const handleRemoveAllItemsFromCart = (): void => {
    dispatch(clearCart());
    dispatch(displayModal(false));
  };

  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>remove all items from your shopping cart?</h4>
        <div className="btn-container">
          <button
            onClick={handleRemoveAllItemsFromCart}
            type="button"
            className="btn confirm-btn"
          >
            confirm
          </button>
          <button
            onClick={() => {
              dispatch(displayModal(false));
            }}
            type="button"
            className="btn clear-btn"
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
