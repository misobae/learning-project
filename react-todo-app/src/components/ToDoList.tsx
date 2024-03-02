import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector, catsState } from "./atoms";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

interface SelectBtnProps {
  isopen: boolean;
}

const Wrapper = styled.div`
  max-width: 800px;
  width: 90%;
  margin: 24px auto;
`;

const SelectBox = styled.div`
  position: relative;
  width: 100%;
  cursor: pointer;
`;

const SelectBtn = styled.div<SelectBtnProps>`
  display: flex;
  align-items: center;
  padding: 4px 0;
  font-size: 28px;
  font-weight: 600;
  &::before {
    content: '►';
    margin-right: 0.5em;
    font-size: 0.75em;
    transition: .25s;
    transform: rotate(${({ isopen }) => isopen ? '90deg' : '0'});
  }
`;

const OptionList = styled.ul<SelectBtnProps>`
  overflow-y: scroll;
  position: absolute;
  z-index: 1;
  top: 41px;
  left: 0;
  width: 100%;
  max-height: ${({ isopen }) => isopen ? '186px' : '0'};
  border: ${({ isopen }) => isopen ? '2px solid #000' : '0'};
  background-color: ${({ isopen }) => isopen ? '#fff' : 'transparent'};
  border-radius: 16px;
  transition: .3s ease-in;
  list-style: none;
`;

const Option = styled.li`
  padding: 0.45em 0.75em;
  font-size: 22px;
  &:hover {
    background-color: #f3f3f3;
  }
  &:last-child:hover {
    background-color: transparent;
  }
`;

const AddBox = styled.div`
  margin: 8px 0;
`;
const AddCatInput = styled.input`
  display: block;
  width: calc(100% - 8px);
  padding: 8px 4px;
  border: 0;
  border-bottom: 1px solid #999;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;
const AddBtn = styled.button`
  display: block;
  width: 48px;
  height: 48px;
  margin: 0 auto;
  border: 2px solid #000;
  background: transparent;
  border-radius: 10px;
  font-size: 28px;
  transition: .3s;
  cursor: pointer;
`;

const ErrorMsg = styled.span`
  font-size: 14px;
  color: #f23333;
`;

interface IForm {
  categoryName: string;
}

function ToDoList(){
  // useRecoilState는 value와 modifier 함수를 반환. setState와 비슷
  // value만 얻고 싶을 땐 useRecoilValue를, value를 바꾸고만 싶을 때는 useSetRecoilState 사용
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [customCats, setCustomCats] = useRecoilState(catsState);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue } = useForm<IForm>();
  const [isopen, setOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);

	const handleAddCat = ({ categoryName }: IForm) => {
    setCustomCats((oldCats) => [
      ...oldCats,
      {
        text: categoryName,
        id: Date.now()
      },
    ]);
    setCategory(categoryName as any);
		setValue("categoryName", "");
	};

  const handleSelectCat = (category: Categories | string) => {
    setCategory(category as Categories);
    setOpen(false);
  };

  const toggleDropDown = () => {
    setOpen(!isopen);
  }

  const handleShowInput = () => {
    setShowInput(!showInput);
  }

  return (
    <Wrapper>
        <SelectBox className={isopen ? "isopen" : ""}>
          <SelectBtn
            onClick={toggleDropDown}
            isopen={isopen}>
              {category}
          </SelectBtn>
          <OptionList isopen={isopen}>
            <Option onClick={() => handleSelectCat(Categories.TO_DO)}>To Do</Option>
            <Option onClick={() => handleSelectCat(Categories.DOING)}>Doing</Option>
            <Option onClick={() => handleSelectCat(Categories.DONE)}>Done</Option>

            {customCats.map((customCat) => (
              <Option key={customCat.id} onClick={() => handleSelectCat(customCat.text)}>
                {customCat.text}
              </Option>
            ))}

            <Option>
              <AddBox>
                {showInput ? (
                  <form onSubmit={handleSubmit(handleAddCat)}>
                    <AddCatInput
                      {...register("categoryName", {
                        required: "Please, write a category!",
                        maxLength: {
                          value: 15,
                          message: "Please name the category within 15 characters.",
                        },
                      })}
                      placeholder="Click here and write a new category."
                      type="text"
                    />
                    <ErrorMsg>{errors?.categoryName?.message}</ErrorMsg>
                  </form>
                ) : (
                  <AddBtn onClick={handleShowInput}>+</AddBtn>
                )}
              </AddBox>
            </Option>

          </OptionList>
        </SelectBox>

      <CreateToDo />
      
      <ul>
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>

    </Wrapper>
  );
}

export default ToDoList;