import {Table} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { increaseCount, decreaseCount, deleteItem } from './../store.js';

function Cart(){
  let state = useSelector((state)=> state ); // Redux store 가져와줌
  let dispatch = useDispatch(); // store.js로 요청 보내주는 함수

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {
            state.cart.map((cart, i)=>{
              return (
                <tr key={i}>
                  <td>{cart.id}</td>
                  <td>{cart.name}</td>
                  <td>{cart.count}</td>
                  <td>
                    <button onClick={()=>{
                      dispatch(increaseCount(cart.id))
                    }}>+</button>
                    <button onClick={()=>{
                      dispatch(decreaseCount(cart.id))
                    }}>-</button>
                  </td>
                  <td>
                    <button onClick={()=>{
                      dispatch(deleteItem(cart.id))
                    }}>X</button>
                  </td>
                </tr>
              )
            })
          }

        </tbody>
      </Table> 
    </div>
  )
}

export default Cart;