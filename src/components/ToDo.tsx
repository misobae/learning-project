import { ITodo } from "./atoms";

function ToDo({text}: ITodo){
  return (
    <li>
      <span>{text}</span>
    </li>
  );
}

export default ToDo;