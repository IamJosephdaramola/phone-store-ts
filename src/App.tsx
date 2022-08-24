import React, { FC, useEffect } from "react";
import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import { useAppSelector, useAppDispatch } from "./hooks/hooks";
import { getCartItems } from "./features/cart/cartSlice";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector((store) => store.modal);
  const { isLoading, error } = useAppSelector((store) => store.cart);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading ...</h2>
      </div>
    );
  }

  if (error && !isLoading) {
    return (
      <div className="loading">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <main>
      {isModalOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
};
export default App;
