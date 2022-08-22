import React, { Fragment, FC } from "react";
import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";

const App: FC = () => {
  return (
    <Fragment>
      <Navbar />
      <CartContainer />
    </Fragment>
  );
};
export default App;
