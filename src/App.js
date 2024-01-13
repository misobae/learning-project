import {useState} from "react";
import {Navbar, Container, Nav, Row, Col} from 'react-bootstrap';
import './App.css';
import data from './data.js';

function App() {
  let [shoes] = useState(data);
  let [shoesOrder, setShoesOrder] = useState('');
  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React Shopping Mall</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#cart">Cart</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="main-bg"></div>
      <Container>
        <Row>
          {
            shoes.map((shoes, i)=>{
              return (
                <ProductItem key={i} shoes={shoes}  />
              )
            })
          }
        </Row>
      </Container>
    </div>
  );
}

// 상품 컴포넌트
function ProductItem(props){
  const shoes = props.shoes;
  return (
      <Col>
        <img src={`https://codingapple1.github.io/shop/shoes${shoes.id + 1}.jpg`} width="100%" />
        <h4>{shoes.title}</h4>
        <h4>{shoes.price}</h4>
        <h4>{shoes.content}</h4>
      </Col>
  )
}

export default App;
