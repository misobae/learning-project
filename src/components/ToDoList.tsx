import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector, catsState } from "./atoms";
import { useForm } from "react-hook-form";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

interface IForm {
  categoryName: string;
}

function ToDoList(){
  // useRecoilState는 value와 modifier 함수를 반환. setState와 비슷
  // value만 얻고 싶을 땐 useRecoilValue를, value를 바꾸고만 싶을 때는 useSetRecoilState 사용
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [customCats, setCustomCats] = useRecoilState(catsState);
  const { handleSubmit, register, setValue } = useForm<IForm>();

  const handleChangeCat = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

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

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(handleAddCat)}>
        <select value={category} onChange={handleChangeCat}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
          {customCats.map((customCat) => (
            <option key={customCat.id} value={customCat.text}>
              {customCat.text}
            </option>
          ))}
        </select>

        <input
          {...register("categoryName", {
            required: "Please, write a category!",
          })}
          placeholder="Write a category."
        />
        <button name="newCat">NEW</button>
      </form>

      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
      {}
    </div>
  );
}

export default ToDoList;