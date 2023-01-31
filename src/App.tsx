import { Label, useId } from "@fluentui/react-components";
import { Combobox, Option } from "@fluentui/react-components/unstable";
import { phylum, classes, orders, families } from "./constant";
import styles from "./App.module.css";
import { CustomCombobox } from "./common/Combobox/index";
import { useQuery } from "@apollo/client";
import { getClasses, getFamilies, getOrders, getPhylums, getTree } from "./api";
import { filterTree, IFilter } from "./hooks/useFilter";
import { useCallback, useState } from "react";

function App() {
  const { data: phylums, loading: pLoad } = useQuery(getPhylums);
  const { data: classes, loading: cLoad } = useQuery(getClasses);
  const { data: orders, loading: oLoad } = useQuery(getOrders);
  const { data: families, loading: fLoad } = useQuery(getFamilies);
  const { data, loading } = useQuery(getTree);
  const [filter, setFilter] = useState<{
    phylums: Partial<IFilter>[];
    classes: Partial<IFilter>[];
    orders: Partial<IFilter>[];
    families: Partial<IFilter>[];
  }>({
    phylums: [],
    classes: [],
    orders: [],
    families: [],
  });

  // const getOptions = useCallback(
  //   (all: IFilter, filter: IFilterTracker, id: string): Partial<IFilter> => {
  //     if (filter[id as IFilterTrackerProperty].length)
  //       return all?.nodes?.map(({ id, title }) => ({
  //         id,
  //         title,
  //       })) as Partial<IFilter>;
  //     return { [id as IFilterTrackerProperty]: [] };
  //   },
  //   []
  // );

  return (
    <div className={styles.filter}>
      <CustomCombobox
        label="Phylum"
        options={phylums.options}
        loading={pLoad}
        onExternalFilter={(e, { optionText: id, optionValue: title }) => {
          const [{ nodes: classesNodes }] = filterTree(
            data?.nodes,
            id as string
          );
          console.log("classes", classesNodes);
          const [{ nodes: ordersNodes }] = classesNodes as IFilter[];
          console.log("orders", ordersNodes);
          const [{ nodes: familiesNodes }] = ordersNodes as Partial<IFilter>[]; //should not have nodes in this case
          console.log("families", familiesNodes);
          setFilter({
            phylums: [{ id, title }] as Partial<IFilter>[],
            classes: classesNodes as Partial<IFilter>[],
            orders: ordersNodes as Partial<IFilter>[],
            families: familiesNodes as Partial<IFilter>[],
          });
        }}
      />
      <CustomCombobox
        label="Class"
        options={filter?.classes?.length ? filter.classes : classes?.options}
        loading={cLoad}
        onExternalFilter={(e, { optionText: id, optionValue: title }) =>
          console.log(filterTree(data?.nodes, id as string))
        }
      />
      <CustomCombobox
        label="Order"
        options={filter?.orders?.length ? filter.orders : orders?.options}
        loading={oLoad}
        onExternalFilter={(e, { optionText: id, optionValue: title }) =>
          console.log(filterTree(data?.nodes, id as string))
        }
      />
      <CustomCombobox
        label="Family"
        options={filter?.families?.length ? filter.families : families?.options}
        loading={fLoad}
        onExternalFilter={(e, { optionText: id, optionValue: title }) =>
          console.log(filterTree(data?.nodes, id as string))
        }
      />
    </div>
  );
}

export default App;
