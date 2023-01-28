import { Label, useId } from "@fluentui/react-components";
import { Combobox, Option } from "@fluentui/react-components/unstable";
import { phylum, classes, orders, families } from "./constant";
import styles from "./App.module.css";
import { CustomCombobox } from "./common/Combobox/index";
import { useQuery } from "@apollo/client";
import { getClasses, getFamilies, getOrders, getPhylums, getTree } from "./api";
import { filterTree, IFilter } from "./hooks/useFilter";
import { useCallback, useState } from "react";

interface IFilterTracker {
  phylums: IFilter[];
  classes: IFilter[];
  orders: IFilter[];
  families: IFilter[];
}

function App() {
  const { data: phylums, loading: pLoad } =
    useQuery<Partial<IFilter[]>>(getPhylums);
  const { data: classes, loading: cLoad } = useQuery(getClasses);
  const { data: orders, loading: oLoad } = useQuery(getOrders);
  const { data: families, loading: fLoad } = useQuery(getFamilies);
  const { data, loading } = useQuery<IFilter[]>(getTree);
  const [filter, setFilter] = useState<IFilterTracker>({
    phylums: [],
    classes: [],
    orders: [],
    families: [],
  });

  const getOptions = useCallback(
    (all: IFilter, filter: IFilterTracker, id: string) => {
      if (filter[id].length)
        return all?.nodes?.map(({ id, title, description }) => ({
          id,
          title,
          description,
        }));
    },
    []
  );

  return (
    <div className={styles.filter}>
      <CustomCombobox
        label="Phylum"
        options={getOptions(phylums, filter?.phylums, "phylums")}
        loading={pLoad}
        onExternalFilter={(e, { optionText: id, optionValue: title }) =>
          console.log(filterTree(data?.nodes, id as string))
        }
      />
      {/* <CustomCombobox
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
      /> */}
    </div>
  );
}

export default App;
