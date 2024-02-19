import React from "react";
import { Categories, IToDo, toDoState } from "./atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

function ToDo({ text, category, id }: IToDo){
  const setToDos = useSetRecoilState(toDoState)
  const toDos = useRecoilValue(toDoState);
  const handleChangeCat = (event: React.MouseEvent<HTMLButtonElement>) => {
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

  const handleDestroy = () => {
    setToDos(toDos => toDos.filter(toDo => toDo.id !== id));
  }

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={handleChangeCat}>Doing</button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={handleChangeCat}>To Do</button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={handleChangeCat}>Done</button>
      )}
      <button onClick={handleDestroy}>X</button>
    </li>
  );
}

export default ToDo;