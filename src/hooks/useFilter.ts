import { useReducer } from "react";

export const useTreeFilter = () => {
  const [filter, setFilter] = useReducer<TreeFilter>("");
  return {};
};
