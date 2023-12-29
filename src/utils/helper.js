import { TODO_STATUS } from "./const";

export const filterByStatus = (listTodos = [], status = "", id) => {
  switch (status) {
    case TODO_STATUS.PENDING:
      return listTodos.filter((item) => !item.isCompleted);
    case TODO_STATUS.COMPLETED:
      return listTodos.filter((item) => item.isCompleted);
    case TODO_STATUS.REMOVE:
      return listTodos.filter((item) => item.id !== id);
    default:
      return listTodos;
  }
};

export const hashString = (str) => {
  let hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};

export const filterTodosLeft = (listTodos = []) => {
  return listTodos.filter((item) => !item.isCompleted);
};
