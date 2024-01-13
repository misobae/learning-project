import './App.css';
import React, { useState } from 'react';

function App() {
  let [title, setTitle] = useState(['남자 코트 추천', '맛집 추천', '클래스 리뷰']);
  let [date, setDate] = useState(new Date());
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  let [like, setLike] = useState(new Array(title.length).fill(0));
  let [modal, setModal] = useState(false);
  let [titleOrder, setTitleOrder] = useState(0);
  let [inputValue, setInputValue] = useState('');

  // title이 업데이트될 때마다 like 배열 초기화
  React.useEffect(() => {
    setLike(new Array(title.length).fill(0));
  }, [title]);

  return (
    <div className="App">
      <div className="black-nav">
        <h4>RecatBlog</h4>
      </div>

      {
        title.map(function(a, i){
          return (
            <div className="list" key={i} onClick={() => {setModal(true);setTitleOrder(i)}}>
              <h4>
                <span>{a}</span>
                <span onClick={(e) => {
                  e.stopPropagation();
                  let newLike = [...like]; // like state가 array 자료이기 때문에 복사 후 수정
                  newLike[i] = newLike[i] + 1;
                  setLike(newLike);
                }}>❤️</span> {like[i]}
              </h4>
              <p>{formattedDate}</p>
              <button onClick={(e)=>{
                e.stopPropagation();
                let newTitle = [...title];
                newTitle.splice(i, 1);
                setTitle(newTitle);
                }}>삭제</button>
            </div>
          )
        })
      }
      
      <input onChange={(e)=>{setInputValue(e.target.value);}}></input>
      <button onClick={()=>{
        if (inputValue.trim() !== ''){ // input 공백시 글 발행 방지
          let newTitle = [...title];
          newTitle.unshift(inputValue);
          setTitle(newTitle);
        }
        }}>글 발행</button>

      {
        modal == true ? <Modal titleOrder={titleOrder} title={title} formattedDate={formattedDate} /> : null
      }
      
    </div>
  );
}

// 모달 컴포넌트
function Modal(props){
  return (
    <div className="modal">
      <h4>{props.title[props.titleOrder]}</h4>
      <p>{props.formattedDate}</p>
      <p>상세내용</p>
    </div>
  )
}

export default App;
