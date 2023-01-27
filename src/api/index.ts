import { gql } from "@apollo/client";

export const getPhylums = gql`
  query getPhylums {
    options: phylum {
      id
      title
    }
  }
`;
export const getClasses = gql`
  query getClasses {
    options: class {
      id
      title
    }
  }
`;
export const getOrders = gql`
  query getOrders {
    options: order {
      id
      title
    }
  }
`;
export const getFamilies = gql`
  query getFamilies {
    options: family {
      id
      title
    }
  }
`;

export const getTree = gql`
  query getTree {
    nodes: phylum {
      id
      title
      nodes: classes {
        id
        title
        nodes: orders {
          id
          title
          nodes: families {
            id
            title
          }
        }
      }
    }
  }
`;
