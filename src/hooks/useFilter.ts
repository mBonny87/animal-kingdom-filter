import { useCallback } from "react";

interface IAction {
  type: IFilterDispatch;
  payload: any;
}

type IFilterDispatch =
  | "ADD"
  | "UPDATE"
  | "REMOVE_LEAF"
  | "REMOVE_PARTIALLY"
  | "CLEAR";

interface IFilter {
  id: string;
  title: string;
  Node: IPartialFilter[];
}

type IPartialFilter = Partial<IFilter>;

export const useFilter = (
  filter: IPartialFilter,
  dispatch: React.Dispatch<IAction>
) => {
  const addNode = useCallback((payload: IPartialFilter) => {
    dispatch({ type: "ADD", payload });
  }, []);

  return {
    addNode,
  };
};

export const filterReducer = (
  state: IPartialFilter,
  action: IAction
): IPartialFilter => {
  switch (action.type) {
    case "ADD": // it adds a filter to the tree (it adds a new level of research)
      console.log(action.payload); //!make changes to the state
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
