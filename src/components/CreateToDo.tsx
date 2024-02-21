import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoState } from "./atoms";
import styled from "styled-components";

const AddBox = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  border: 1px solid #333;
  border-radius: 16px;
  padding: 6px 12px;
`;
const AddInput = styled.input`
  display: block;
  width: 100%;
  border: 0;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;
const AddBtn = styled.button`
  border: 0;
  background: transparent;
  font-size: 22px;
  cursor: pointer;
`;
interface IForm {
  toDo: string;
}

function CreateToDo(){
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => { // Destructuring: data.toDo -> {toDO}
    setToDos(oldToDos => [{
      text: toDo,
      id: Date.now(),
      category}, ...oldToDos])
    setValue("toDo", "");
  }

  return (
    <AddBox onSubmit={handleSubmit(handleValid)}>
      <AddInput {...register("toDo", {
        required: "Please write a todo",
      })} placeholder="Click here and write somthing to complete!" />
      <AddBtn>+</AddBtn>
    </AddBox>
  )
}

export default CreateToDo;