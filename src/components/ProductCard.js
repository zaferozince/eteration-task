import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../slicers/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const handleAddToCart = (event) => {
        event.stopPropagation();
        dispatch(addToCart(product));
    }
    const navigate = useNavigate();
    return (
            <Card data-price={product.price} data-description={product.description} data-model={product.model} data-brand={product.brand} data-testid="product"  onClick={() => navigate('/details',{state:{
                product:product
            }})} className="d-grid my-3 product-card cursor">
                <Card.Img variant="top" src={product.image} className="product-img" alt={product.name} />
                <Card.Body>
                    <Card.Text  >
                        <p className="price-text">
                        {product.price}₺
                        </p>
                    </Card.Text>
                    <Card.Text>
                        {product.name}
                    </Card.Text>
                    <Button onClick={handleAddToCart} data-product-name={product.name} className="add-to-cart-btn">Add to Cart</Button>
                </Card.Body>
            </Card>
    );
};
export default ProductCard;