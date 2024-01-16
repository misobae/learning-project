import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from './../store.js';
import {Nav} from 'react-bootstrap';

function DetailPage(props){
  let [visible, setVisible] = useState(true);
  let [inputValue, setInputValue] = useState('');
  let [tab, setTab] = useState(0);
  let [fade, setFade] = useState('');
  let [cartBtnVisible, setCartBtnVisible] = useState(false);
  let navigate = useNavigate();

  let state = useSelector((state)=> state );  // Redux store 가져와줌
  let dispatch = useDispatch(); // store.js로 요청 보내주는 함수

  let {id} = useParams();
  const foundElement = props.shoes.find((element) => element.id == id);
  // 현재 url에 입력한 번호와 같은 번호를 가진 상품을 찾아서 데이터 바인딩

  let [watchedItem, setWatchedItem] = useState([]);

  useEffect(()=>{
    let watchedItemId = JSON.parse(localStorage.getItem('watchedId')); // JSON 자료를 array로 변환
    let watchedItemTitle = JSON.parse(localStorage.getItem('watchedTitle'));

    watchedItemId.push(foundElement.id);
    watchedItemTitle.push(foundElement.title);

    watchedItemId = new Set(watchedItemId); // 중복 제거 후
    watchedItemId = Array.from(watchedItemId); // Set자료를 다시 Array에 담기
    watchedItemTitle = new Set(watchedItemTitle); 
    watchedItemTitle = Array.from(watchedItemTitle);

    localStorage.setItem('watchedId', JSON.stringify(watchedItemId)); // 다시 JSON 형태로 저장
    localStorage.setItem('watchedTitle', JSON.stringify(watchedItemTitle)); // 다시 JSON 형태로 저장

    setWatchedItem(watchedItemTitle);
  }, [])


  // input에 문자 입력시 alert
  useEffect(()=>{
    if (isNaN(inputValue)) {
      alert('숫자만 입력하세요');
    }
  }, [inputValue])

  useEffect(()=>{
    let a = setTimeout(()=>{ setFade('end'); }, 100)
    return ()=>{
      clearTimeout(a);
      setFade('');
    }
  }, [])

  // Event 팝업 2초 뒤에 꺼짐
  useEffect(()=>{
    const alertTimer = setTimeout(()=>{
      setVisible(false);
    }, 2000)

    return ()=> clearTimeout(alertTimer); // 컴포넌트가 언마운트되면 clearTimeout을 호출해 메모리 누수 방지
  }, []) // 두번째 인자로 빈 배열을 넣으면 마운트시 1회만 실행



  return (
    <div className={`container start ${fade}`}>
      <div className="viewed-products">
        <strong>최근 본 상품</strong>
        {
          watchedItem.map((item, i)=>{
            return(
              <p key={i}>
                {item}
              </p>
            )
          })
        }
      </div>
      {
        visible == true
        ? <div className="alert alert-warning">2초 이내 구매시 할인</div>
        : null
      }

      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6">
          <span>수량: </span><input onChange={(e)=>{setInputValue(e.target.value)}}></input>
          <h4 className="pt-5">{foundElement.title}</h4>
          <p>{foundElement.content}</p>
          <p>{foundElement.price}원</p>
          <button className="btn btn-danger" onClick={()=>{
            dispatch(addItem( { id: foundElement.id, name: foundElement.title, count: 1 } ));
            setCartBtnVisible(true);
          }}>주문하기</button>
          {
            cartBtnVisible == true
            ? <button className="btn btn-primary" onClick={()=>{navigate('/cart')}}>장바구니 바로가기</button>
            : null
          }
        </div>

        <Nav variant="tabs"  defaultActiveKey="link0">
          <Nav.Item onClick={()=>{setTab(0)}}>
            <Nav.Link eventKey="link0">버튼0</Nav.Link>
          </Nav.Item>
          <Nav.Item onClick={()=>{setTab(1)}}>
            <Nav.Link eventKey="link1">버튼1</Nav.Link>
          </Nav.Item>
          <Nav.Item onClick={()=>{setTab(2)}}>
            <Nav.Link eventKey="link2">버튼2</Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent tab={tab} />
      </div>
    </div> 
  )
}

function TabContent({tab}){
  let [fade, setFade] = useState('');

  useEffect(()=>{
    let a = setTimeout(()=>{ setFade('end'); }, 100)
    return ()=>{
      clearTimeout(a);
      setFade('');
    }
  }, [tab])

  return (<div className={`start ${fade}`}>
    {[ <div>내용0</div>, <div>내용1</div>, <div>내용2</div> ][tab]}
  </div>)
  // if (tab == 0){
  //   return <div>내용0</div>
  // } else if (tab == 1){
  //   return <div>내용1</div>
  // } else if (tab == 2){
  //   return <div>내용2</div>
  // }
}


export default DetailPage;