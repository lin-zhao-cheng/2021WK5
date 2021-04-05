import { Button, Select, Row, Col } from "antd";
import { useContext } from "react";
import { StoreContext } from "../store"
import { CartIcon } from "./Icons";
import { Link } from 'react-router-dom';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../utils/constants";
const { Option } = Select;

export default function CartContainer() {
    const { state: { cartItems }, dispatch } = useContext(StoreContext);

    const addToCart = (product, qty) => {
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty,
            },
        });
    };
  
    const removeFromCart = (productId) => {
        dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    };

    const getTotalPrice = () => {
        return (cartItems.length > 0) ?
            cartItems.reduce((sum, item) => sum + item.price * item.qty, 0) : 0;
    };

    return (
        <>
            {cartItems.length === 0 ? (
                <Row gutter={[32, 32]}>Cart is empty</Row>
            ) : (
                cartItems.map(item => (
                <Row gutter={[32, 32]} 
                    key={item.id} 
                    className="cart-item"
                >
                    <Col 
                        lg={{ span: 8 }}
                        xs={{ span: 24 }} 
                        className="cart-image"
                    >
                        <Link to={`/product/${item.id}`}>
                            <img src={item.image} alt={item.name} />
                        </Link>
                    </Col>
                    <Col 
                        lg={{ span : 14 }}
                        xs={{ span : 24 }}
                        className="cart-item-info"
                    >
                        <div className="cart-item-content">
                            <div className="cart-name">{item.name}</div>
                            <div className="product-qty">
                                Qty: {"   "}
                                <Select
                                defaultValue={item.qty}
                                className="select-style"
                                onChange={(val) => addToCart(item, val)}
                                >
                                {[...Array(item.countInStock).keys()].map((x) => (
                                    <Option key={x + 1} value={x + 1}>
                                        {x + 1}
                                    </Option>
                                ))}
                                </Select>
                            </div>
                        </div>
                        <div className="cart-item-end">
                            <div className="cart-price">
                                ${item.price * item.qty}
                            </div>
                            <div className="cart-item-delete" onClick={() => removeFromCart(item.id)}>
                                x
                            </div>
                        </div>
                    </Col>
                </Row>
                ))
            )}
            <Row gutter={[32, 32]} className="cart-total-price-wrap">
                
                    Total
                    <div className="cart-total-price">${getTotalPrice()}</div>
                
            </Row>
            <Row gutter={[32, 32]}>
                <Button
                    className="cart-modal-btn"
                    type="primary"
                >
                    <CartIcon size={20} />
                    <span style={{ marginLeft: 12 }}>Start Checkout</span>
                </Button>
            </Row>
        </>
    );
}