import React from "react";
import { Categories, IToDo, toDoState } from "./atoms";
import { useSetRecoilState } from "recoil";

function ToDo({ text, category, id }: IToDo){
  const setToDos = useSetRecoilState(toDoState);
  const onChangeCat = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event; 
    setToDos(oldToDos => {
      const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1)
      ];
    })
  }
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onChangeCat}>Doing</button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onChangeCat}>To Do</button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onChangeCat}>Done</button>
      )}
    </li>
  );
}

export default ToDo;