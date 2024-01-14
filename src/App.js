import {useState} from "react";
import {Navbar, Container, Nav, Row, Col} from 'react-bootstrap';
import './App.css';
import data from './components/data.js';
import DetailPage from './routes/Detail.js';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';

function App() {
  let [shoes] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">React Shopping Mall</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Routes>
        <Route path="/" element={
          <>
          <div className="main-bg"></div>
          <Container>
            <Row>
              {
                shoes.map((shoes, i)=>{
                  return (
                    <ProductItem key={i} shoes={shoes} />
                  )
                })
              }
            </Row>
          </Container>
          </>
        } />
        
        <Route path="/detail/:id" element={<DetailPage shoes={shoes} />} />
        
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>Member</div>} />
          <Route path="location" element={<div>Location</div>} />
        </Route>

        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>

        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}
// Event 페이지
function Event(){
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

// About 페이지
function About(){
  return (
    <div>
      <h4>About</h4>
      <Outlet></Outlet> {/* nested routes의 element 보여주는 곳 */}
    </div>
  )
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
