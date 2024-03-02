import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export enum Categories {
  // enum은 열거형으로 이름이 있는 상수들의 집합을 정의하는 기능
  // TypeScript에서 열거형은 객체가 아니라 "리터럴 타입"으로 처리됨
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
  effects_UNSTABLE: [persistAtom],
});

export interface ICategory {
	text: string;
	id: number;
}
export const catsState = atom<ICategory[]>({
  key: "categories",
	default: [],
  effects_UNSTABLE: [persistAtom],
})

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({get}) => {
    const toDos = get(toDoState);
    const catecory = get(categoryState);
    
    return toDos.filter(toDo => toDo.category === catecory);
  }
})
