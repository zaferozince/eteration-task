import { useEffect, useState } from "react";
import { Card, Row,Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../slicers/productSlice";
import SearchInput from "./SearchInput";
import { AddFilterBrands, RemoveFilterBrands,AddFilterModels,RemoveFilterModels } from "../slicers/filterSlice";
const LeftBar = () => {
    const products = useSelector((state) => state.product);
    const filters = useSelector((state) => state.filter);
    const dispatch = useDispatch();
    const [sortOption, setSortOption] = useState('');
    const [brands,setBrands] = useState([]);
    const [models,setModels] = useState([]);
    const [searchedBrands, setSearchedBrands] = useState([]);
    const [searchedModels, setSearchedModels] = useState([]);

    useEffect(() => {
        if(sortOption === 'oldtonew'){
            const sortedProducts = [...products].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            dispatch(setProducts(sortedProducts));
        }
        else if(sortOption === 'newtoold'){
            const sortedProducts = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            dispatch(setProducts(sortedProducts));

        }
        else if(sortOption === 'pricetohigh'){
            const sortedProducts = [...products].sort((a, b) => b.price - a.price);
            dispatch(setProducts(sortedProducts));
        }
        else if(sortOption === 'pricetolow'){
            const sortedProducts = [...products].sort((a, b) => a.price - b.price);
            dispatch(setProducts(sortedProducts));
        }
      }, [sortOption]);

      useEffect(() => {
        setBrands([...new Set(products?.map((product) => product.brand))].sort());
        setModels([...new Set(products?.map((product) => product.model))].sort());
      },[products])

      useEffect(() => {
        setSearchedBrands(brands);
      },[brands])
      
      useEffect(() => {
        setSearchedModels(models);
      },[models])

    const handleSortOptionChange = (event) => {
        setSortOption(event.target.id);
      };
    
    const handleBrandOptionChange = (event) => {
        const brand = event.target.value;
        if (event.target.checked) {
            dispatch(AddFilterBrands(brand));
        } else {
            dispatch(RemoveFilterBrands(brand));
        }
    }

    const handleModelOptionChange = (event) => {
        const model = event.target.value;
        if (event.target.checked) {
            dispatch(AddFilterModels(model));
        } else {
            dispatch(RemoveFilterModels(model));
        }   
    }

    const searchBrand = (e) => {
        const searchTerm = e.target.value;
        if(searchTerm) {
            const filtered = brands.filter((brand) =>
            brand.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchedBrands(filtered);
        }
        else{
            setSearchedBrands(brands);
        }
    }

    const searchModel = (e) => {
        const searchTerm = e.target.value;
        if(searchTerm) {
            const filtered = models.filter((model) =>
            model.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchedModels(filtered);
        }
        else{
            setSearchedModels(models);
        }
    }
       
  
    return (
        <Row className="d-flex flex-column gap-3">
            <Col>
                <span className="light-span">Sort by</span>
                <Card className="">
                    <div className="sort-div mt-2">
                        <input className="cursor" onChange={handleSortOptionChange} id="oldtonew" name="sort" type="radio"></input><label data-testid="sortoldtonew" className="cursor" for="oldtonew">Old to new</label>
                    </div>
                    <div className="sort-div">
                        <input className="cursor" onChange={handleSortOptionChange} id="newtoold" name="sort" type="radio"></input><label data-testid="sortnewtoold" className="cursor" for="newtoold">New to old</label>
                    </div>
                    <div className="sort-div">
                        <input className="cursor" onChange={handleSortOptionChange} id="pricetohigh" name="sort" type="radio"></input><label data-testid="sortpricetohigh" className="cursor" for="pricetohigh">Price high to low</label>
                    </div>
                    <div className="sort-div">
                        <input className="cursor" onChange={handleSortOptionChange} id="pricetolow" name="sort" type="radio"></input><label data-testid="sortpricetolow" className="cursor" for="pricetolow">Price low to high</label>
                    </div>
                </Card>
            </Col>
            <Col>
                <span className="light-span">Brands</span>
                <Card>
                    <Card.Body className="w-100">
                        <SearchInput onChange={searchBrand}></SearchInput>
                    </Card.Body>
                    <Card.Body className="scroll-card">
                        {searchedBrands.map((brand,index) => {
                            return (
                                <div className="sort-div">
                                    { filters.selectedBrands && filters.selectedBrands.includes(brand) ? 
                                        <input onChange={handleBrandOptionChange} className="cursor" id={brand+brand.id} name="brand" value={brand} type="checkbox" checked></input>
                                    :
                                        <input onChange={handleBrandOptionChange} className="cursor" id={brand+brand.id} name="brand" value={brand} type="checkbox"></input>
                                    }
                                    <label data-testid="brand-label" className="cursor" for={brand+brand.id}>{brand}</label>
                                </div>
                            )
                        })}
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <span className="light-span">Models</span>
                <Card>
                    <Card.Body className="w-100">
                            <SearchInput onChange={searchModel} ></SearchInput>
                    </Card.Body>
                    <Card.Body className="scroll-card">
                        {searchedModels.map((model) => {
                            return (
                                <div className="sort-div">
                                    {
                                        filters.selectedModels && filters.selectedModels.includes(model) ?
                                        <input onChange={handleModelOptionChange} className="cursor" id={model+model.id} name="model" value={model} type="checkbox" checked></input>
                                        :
                                        <input onChange={handleModelOptionChange} className="cursor" id={model+model.id} name="model" value={model} type="checkbox"></input>
                                    }
                                    <label data-testid="model-label" className="cursor" for={model+model.id}>{model}</label>
                                </div>
                            )
                        })}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default LeftBar;