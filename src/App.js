import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import Home from './pages/Home';
import Header from './Layouts/Header';
import "./css/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { setProducts } from './slicers/productSlice';
import ProductDetail from "./pages/ProductDetail";
import { setCarts } from "./slicers/cartSlice";
function App() {
  const [searchedProducts,setSearchedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const products = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart);
  
  const getProducts = async () => {
       await axios.get("https://5fc9346b2af77700165ae514.mockapi.io/products",{
            headers: {
            }
        }).then((res)=>{
            dispatch(setProducts(res.data))
            setSearchedProducts(res.data)
        })
        .catch((err)=>{
            if (err?.response?.status == 400) {
                console.log(err)
            }
        })
    }
  const searchProduct = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);
    const filteredData = products?.filter((value) => {
        return Object.values(value).some((prop) =>
        String(prop).toLowerCase().includes(query)
        );
        });
        setSearchedProducts(filteredData);
    };
  useEffect(()=>{
      getProducts()
      dispatch(setCarts(JSON.parse(localStorage.getItem('cart'))||[]))
  },[])
  useEffect(()=>{
      setSearchedProducts(products)
      searchProduct({target:{value:searchTerm}})
  },[products,searchTerm])
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartProducts))
  },[cartProducts])
   

  return (
      <BrowserRouter>
        <Header searchProduct={searchProduct}></Header>
        <Switch>
            <Route path="/" element={<Home searchedProducts={searchedProducts} />} />
            <Route path="/details" element={<ProductDetail />} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
