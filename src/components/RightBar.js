import { Card, Col, Row, ButtonGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slicers/cartSlice";

const RightBar = () => {
    const cartProducts = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const handleIncrease = (product) => {
        dispatch(addToCart(product));
    }
    const handleDecrease = (product) => {
        dispatch(removeFromCart(product));
    }
    let tL = new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
    });
    return (
        <Row>
            <Col>
                <Card className="p-2">
                    {
                        cartProducts?.length === 0 ? <span className="cart-empty-span">Cart is empty</span>
                        :
                        cartProducts?.map((product) => {
                            return (
                            <Row data-testid="cart-item" data-product-name={product.name} key={product.id}>
                                <Col md={6} className="d-flex align-items-start flex-column py-2">
                                    <span className="cart-product-name-span">{product.name}</span>
                                    <span className="cart-product-price-span">{product.price}</span>
                                </Col>
                                <Col md={6} className="d-flex justify-content-end align-items-center">
                                    <ButtonGroup aria-label="Basic example">
                                        <Button size="sm" onClick={() => handleDecrease(product)} variant="secondary">-</Button>
                                        <Button size="sm" disabled variant="light">{product.amount}</Button>
                                        <Button size="sm" onClick={() => handleIncrease(product)} variant="secondary">+</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            )
                        })
                    }
                </Card>
                <Card className="p-2 d-flex mt-3    ">
                    <Card.Text className="text-start p-1 d-flex"><span>Total Price :&nbsp;</span> <span className="total-price-text">  {tL.format(cartProducts?.reduce((acc,curr) => acc + curr.price * curr.amount,0))}₺</span></Card.Text>
                    <Button variant="primary" className="w-100">Checkout</Button>
                </Card>
            </Col>
        </Row>
    )
}

export default RightBar;