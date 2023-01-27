import { Label, useId } from "@fluentui/react-components";
import { Combobox, Option } from "@fluentui/react-components/unstable";
import { phylum, classes, orders, families } from "./constant";
import styles from "./App.module.css";
import { CustomCombobox } from "./common/Combobox/index";
import { gql, useQuery } from "@apollo/client";
import { getClasses, getFamilies, getOrders, getPhylums, getTree } from "./api";
import { useReducer } from "react";
import { filterReducer, filterTree, useFilter } from "./hooks/useFilter";

function App() {
  const { data: phylums, loading: pLoad } = useQuery(getPhylums);
  const { data: classes, loading: cLoad } = useQuery(getClasses);
  const { data: orders, loading: oLoad } = useQuery(getOrders);
  const { data: families, loading: fLoad } = useQuery(getFamilies);
  const { data, loading } = useQuery(getTree);
  const [filter, dispatch] = useReducer(filterReducer, {});
  const { addNode } = useFilter(filter, dispatch);
  return (
    <div className={styles.filter}>
      <CustomCombobox
        label="Phylum"
        options={phylums?.options}
        loading={pLoad}
        onExternalFilter={(e, { optionText: id, optionValue: title }) =>
          console.log(filterTree(data?.nodes, id as string))
        }
      />
      <CustomCombobox
        label="Class"
        options={classes?.options}
        loading={cLoad}
        onExternalFilter={(e, { optionText: id, optionValue: title }) =>
          console.log(filterTree(data?.nodes, id as string))
        }
      />
      <CustomCombobox
        label="Order"
        options={orders?.options}
        loading={oLoad}
        onExternalFilter={(e, { optionText: id, optionValue: title }) =>
          console.log(filterTree(data?.nodes, id as string))
        }
      />
      <CustomCombobox
        label="Family"
        options={families?.options}
        loading={fLoad}
        onExternalFilter={(e, { optionText: id, optionValue: title }) =>
          console.log(filterTree(data?.nodes, id as string))
        }
      />
    </div>
  );
}

export default App;
