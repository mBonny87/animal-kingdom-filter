import { useCallback } from "react";

// interface IAction {
//   type: IFilterDispatch;
//   payload: any;
// }

// type IFilterDispatch =
//   | "ADD"
//   | "UPDATE"
//   | "REMOVE_LEAF"
//   | "REMOVE_PARTIALLY"
//   | "CLEAR";

export interface IFilter {
  id: string;
  title: string;
  nodes: Partial<IFilter>[];
}

// export const useFilter = (
//   filter: Partial<IFilter>,
//   dispatch: React.Dispatch<IAction>
// ) => {
// const addNode = useCallback((payload: Partial<IFilter>) => {
//   dispatch({ type: "ADD", payload });
// }, []);

// return {
//   addNode,
// };
// };

// export const filterReducer = (
//   state: Partial<IFilter>,
//   action: IAction
// ): Partial<IFilter> => {
//   switch (action.type) {
//     case "ADD": // it adds a filter to the tree (it adds a new level of research)
//       // console.log(filter(action.payload)); //!make changes to the state
//       return state;
//     case "UPDATE": //it updates a filter inside the tree (it updates an existing level of research)
//       return state;
//     case "REMOVE_LEAF": //it removes the leaf inside the tree (it remove the last level of research)
//       return state;
//     case "REMOVE_PARTIALLY": //it removes a part of the tree (it removes more than one level of research)
//       return state;
//     case "CLEAR": //it reset the filter
//       return state;
//     default:
//       return state;
//   }
// };

export const filterTree = (array: Partial<IFilter>[], id: string) => {
  let copy = [...array];
  const getNodes = (tree: Partial<IFilter>[], node: Partial<IFilter>) => {
    if (node?.id?.includes(id)) {
      tree.push(node);
      return tree;
    }

    if (Array.isArray(node.nodes)) {
      const nodes = node.nodes.reduce(getNodes, []);
      if (nodes.length) tree.push({ ...node, nodes });
    }

    return tree;
  };

  return copy.reduce(getNodes, []);
};
