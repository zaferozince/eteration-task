import { Row,Col,Container,Card,Button} from "react-bootstrap"
import { useLocation } from "react-router-dom"
import { addToCart } from "../slicers/cartSlice";
import { useDispatch } from "react-redux";
import RightBar from "../components/RightBar";
const ProductDetail = () => {
    const location = useLocation();
    const product = location.state.product;
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(addToCart(product));
    }
    return (
        <Container>
            <Row className="mt-5">
                <Col md={8} lg={8} xl={10}>
                    <Card className="p-3">
                        <Row>
                            <Col className="d-flex justify-content-start align-items-center" lg={6}>
                                <img className="product-detail-img" src={product.image} alt={product.name}/>
                            </Col>
                            <Col lg={6}>
                                <Card.Text className="product-detail-name fs-3 mt-3 mb-4">{product.name}</Card.Text>
                                <Card.Text className="product-detail-price mb-5 fs-4 text-primary">{product.price}₺</Card.Text>
                                <Button onClick={()=>{handleAddToCart()}} className="w-100" variant="primary">Add to Cart</Button>
                                <Card.Text className="product-detail-description mt-2">{product.description}</Card.Text>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col className="mt-3 mt-md-0" md={4} lg={4} xl={2}>
                    <RightBar></RightBar>
                </Col>
            </Row>
        </Container>
    )
}
export default ProductDetail