import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchInput from '../components/SearchInput';
import { useNavigate } from 'react-router-dom';
const Header = (props) => {
   const {searchProduct} = props;
   const navigate = useNavigate();
  return (
    <Navbar expand="lg" bg='primary' >
      <Container>
        <Navbar.Brand onClick={() => navigate('/')}><b className="text-white mx-5 cursor">Eteration</b></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="w-100 justify-content-center mt-3 mt-sm-0">
            <SearchInput data-testid="search-header" onChange={searchProduct} />
          </Nav>
          <Nav className="me-auto w-100 justify-content-end">
            <Nav.Link href="#home"><b className='text-white'>13,137.00₺</b></Nav.Link>
            <Nav.Link href="#link"><b className='text-white'>Zafer ÖZİNCE</b></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;