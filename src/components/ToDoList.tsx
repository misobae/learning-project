import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector, toDoState } from "./atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";


function ToDoList(){
  // useRecoilState는 value와 modifier 함수를 반환. setState와 비슷
  // value만 얻고 싶을 땐 useRecoilValue를, value를 바꾸고만 싶을 때는 useSetRecoilState 사용
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onChange={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
      {}
    </div>
  );
}

export default ToDoList;