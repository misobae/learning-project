import { useParams } from "react-router-dom";

function DetailPage(props){

  let {id} = useParams();
  const foundElement = props.shoes.find((element) => element.id == id);
  // 현재 url에 입력한 번호와 같은 번호를 가진 상품을 찾아서 데이터 바인딩

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{foundElement.title}</h4>
          <p>{foundElement.content}</p>
          <p>{foundElement.price}원</p>
          <button className="btn btn-danger">주문하기</button> 
        </div>
      </div>
    </div> 
  )
}

export default DetailPage;