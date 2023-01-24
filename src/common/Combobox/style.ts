import { makeStyles, shorthands } from "@fluentui/react-components";

export const useComboStyles = makeStyles({
  sContainer: {
    maxHeight: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    ...shorthands.padding("1rem"),
  },
  sLabel: {
    alignSelf: "flex-start",
    ...shorthands.padding("0.5rem", "0"),
  },
  sListbox: {
    maxHeight: "200px",
    overFlow: "auto",
  },
});
