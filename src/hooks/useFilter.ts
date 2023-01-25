import { useCallback } from "react";

type IAction = {
  type: "ADD" | "UPDATE" | "REMOVE_LEAF" | "REMOVE_PARTIALLY" | "CLEAR";
  payload: any;
};

type IFilter =
  | {
      id: string;
      title: string;
      Node: IFilter[];
    }
  | {};

export const useFilter = (
  filter: IFilter,
  dispatch: React.Dispatch<IAction>
) => {
  const addNode = useCallback((payload: IFilter) => {
    dispatch({ type: "ADD", payload });
  }, []);

  return {
    addNode,
  };
};

export const filterReducer = (state: IFilter, action: IAction): IFilter => {
  switch (action.type) {
    case "ADD": // it adds a filter to the tree (it adds a new level of research)
      console.log(action.payload);
      return state;
    case "UPDATE": //it updates a filter inside the tree (it updates an existing level of research)
      return state;
    case "REMOVE_LEAF": //it removes the leaf inside the tree (it remove the last level of research)
      return state;
    case "REMOVE_PARTIALLY": //it removes a part of the tree (it removes more than one level of research)
      return state;
    case "CLEAR": //it reset the filter
      return state;
    default:
      return state;
  }
};
