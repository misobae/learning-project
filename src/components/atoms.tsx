import { atom, selector } from "recoil";

export const enum Categories { // enum은 열거형으로 이름이 있는 상수들의 집합을 정의하는 기능
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: []
})

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({get}) => {
    const toDos = get(toDoState);
    const catecory = get(categoryState);
    
    return toDos.filter(toDo => toDo.category === catecory);
  }
})