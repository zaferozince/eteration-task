import { useEffect, useState } from "react";
import {Container,Row,Col} from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import ReactPaginate from 'react-paginate';
import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import { useSelector } from "react-redux";

const Home = (props) => {
    const {searchedProducts} = props;
    const products = searchedProducts;
    const [filteredProducts, setFilteredProducts] = useState([]);
    const filters = useSelector((state) => state.filter);
    const [pageNumber, setPageNumber] = useState(0);
    const productsPerPage = 12; 
    const pagesVisited = pageNumber * productsPerPage;
    const displayProducts = filteredProducts?.slice(pagesVisited, pagesVisited + productsPerPage).map((product) => {
        
            return (
                <Col data-testid="product-item"  md={6} lg={4} xl={3} key={product.id}>
                    <ProductCard  product={product}></ProductCard>
                </Col>
            )
    });
    const pageCount = Math.ceil(filteredProducts?.length / productsPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
      };

    useEffect(() => {
        if(filters?.selectedBrands.length === 0 && filters?.selectedModels.length === 0){
            setFilteredProducts(products);
        }
        else{
            setFilteredProducts(products?.filter(product => filters?.selectedBrands.includes(product.brand) || filters?.selectedModels.includes(product.model)));
        }
        setPageNumber(0);
    },[products,filters])
    
    return (
        <Container className="mb-5">
            <Row className="mt-4">
                <Col md={3} lg={3} xl={2}>
                    <LeftBar></LeftBar>
                </Col>
                <Col md={6} lg={6} xl={8}>
                    <Row data-testid="products">{displayProducts}</Row>
                </Col>
                <Col md={3} lg={3} xl={2}>
                    <RightBar></RightBar>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center mt-5">
                <Col className="d-flex justify-content-center mb-5">
                    <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={'pagination'}
                    previousLinkClassName={'previous'}
                    nextLinkClassName={'next'}
                    disabledClassName={'disabled'}
                    activeClassName={'active'}
                    />
                </Col>
            </Row>
        </Container>
    )
}
export default Home;