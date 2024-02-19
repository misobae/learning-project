import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoState } from "./atoms";

interface IForm {
  toDo: string;
}

function CreateToDo(){
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({toDo}: IForm) => { // Destructuring: data.toDo -> {toDO}
    setToDos(oldToDos => [{
      text: toDo,
      id: Date.now(),
      category}, ...oldToDos])
    setValue("toDo", "");
  }

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input {...register("toDo", {
        required: "Please write a todo"
      })} placeholder="Write somthing" />
      <button>Add</button>
    </form>
  )
}

export default CreateToDo;