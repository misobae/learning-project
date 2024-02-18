import { useRecoilValue } from "recoil";
import { toDoState } from "./atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";


function ToDoList(){
  const toDos = useRecoilValue(toDoState);
  // useRecoilState는 value와 modifier 함수를 반환. setState와 비슷
  // value만 얻고 싶을 땐 useRecoilValue를, value를 바꾸고만 싶을 때는 useSetRecoilState 사용

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map(toDo => <ToDo key={toDo.id} {...toDo} />)}
      </ul>
    </div>
  );
}

export default ToDoList;