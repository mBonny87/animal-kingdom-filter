import { Label, useId } from "@fluentui/react-components";
import { Combobox, Option } from "@fluentui/react-components/unstable";
import { phylum, classes, orders, families } from "./constant";
import styles from "./App.module.css";
import { CustomCombobox } from "./common/Combobox/index";

function App() {
  return (
    <div className={styles.filter}>
      <CustomCombobox label="Phylum" options={phylum} />
      <CustomCombobox label="Classes" options={classes} />
      <CustomCombobox label="Orders" options={orders} />
      <CustomCombobox label="Families" options={families} />
    </div>
  );
}

export default App;
