import React, { useState } from "react";
import { Categories, IToDo, toDoState, catsState } from "./atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

const ListItem = styled.li`
  position: relative;
  list-style: none;
  border-bottom: 1px solid #333;
  padding: 24px 0 20px;
`;

const BtnClose = styled.button`
  position: absolute;
  top: 10px;
  right: 0;
  background: transparent;
  border: 0;
  color: #888;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

const CatList = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 36px;
  width: 100%;
  margin-top: 16px;
`;
const CatBtnWrap = styled.div`
  flex-basis: calc(100% - 106px);
`;
const CatBtn = styled.button`
  margin: 3px;
  padding: 2px 10px;
  background-color: #f3f3f3;
  border: 1px solid #555;
  border-radius: 8px;
  cursor: pointer;
`;
const CatTitle = styled.div`
  position: relative;
  flex-basis: 70px;
  height: 32px;
  color: #777;
  font-size: 14px;
  font-weight: 600;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -16px;
    width: 1px;
    height: 100%;
    background-color: #d0d0d0;
  }
`;

function ToDo({ text, category, id }: IToDo){
  const setToDos = useSetRecoilState(toDoState)
  const customCats = useRecoilValue(catsState);
  const [isEnter, setIsEnter] = useState(false);
 
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

  const handleEnter = (event: React.MouseEvent<HTMLLIElement>) => {
    setIsEnter(true);

    const handleLeave = () => {
      setIsEnter(false);
      
      if (event.currentTarget) {
        event.currentTarget.removeEventListener('mouseleave', handleLeave);
      }
    };

    event.currentTarget.addEventListener('mouseleave', handleLeave);
  };

  return (
    <ListItem onMouseEnter={handleEnter}>
      <p>{text}</p>
      {isEnter ? (
        <>
          <CatList>
            <CatTitle>
              Move<br />
              Category to
            </CatTitle>

            <CatBtnWrap>
            {category !== Categories.DOING && (
              <CatBtn name={Categories.DOING} onClick={handleChangeCat}>Doing</CatBtn>
            )}
            {category !== Categories.TO_DO && (
              <CatBtn name={Categories.TO_DO} onClick={handleChangeCat}>To Do</CatBtn>
            )}
            {category !== Categories.DONE && (
              <CatBtn name={Categories.DONE} onClick={handleChangeCat}>Done</CatBtn>
            )}
            {customCats.map((customCat) => (
              category !== customCat.text && (
                <CatBtn
                  key={customCat.id}
                  name={customCat.text}
                  onClick={handleChangeCat}
                >
                  {customCat.text}
                </CatBtn>
              )
            ))}
            </CatBtnWrap>
          </CatList>

          <BtnClose onClick={handleDestroy}>X</BtnClose>
        </>
      ) : null}
    </ListItem>
  );
}

export default ToDo;