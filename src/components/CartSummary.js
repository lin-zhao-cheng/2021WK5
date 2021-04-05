import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Badge } from "antd";
import { CartIcon } from "./Icons";
import CartModal from "./CartModal";
import { PAGE_TITLE_SET } from "../utils/constants";
import { StoreContext } from "../store";

export default function CartSummary() {

  const { state: { cartItems } } = useContext(StoreContext);
  const { state, dispatch} = useContext(StoreContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => setIsModalVisible(!isModalVisible);

  const onClick = () => {
    dispatch({
      type: PAGE_TITLE_SET,
      payload: "ShoppingCart",
    });
  };

  let count = (cartItems.length > 0) ?
    cartItems.reduce((sum, item) => sum + item.qty, 0)
    : 0;
    
  return (
    <>
      <Link to='/ShoppingCart' onClick={onClick} className="header-cart-summary" >
          <Badge count={count} size={"small"} style={{ color: 'white', backgroundColor: '#6366F2' }}>
            <CartIcon size={32} />
          </Badge>
        <p className="cart-summary-text"> Shopping bag </p>
      </Link>
      {/* <CartModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
      /> */}
    </>
  );
}
