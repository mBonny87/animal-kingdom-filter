import {
  Combobox,
  ComboboxProps,
  Option,
  Virtualizer,
  VirtualizerSlots,
} from "@fluentui/react-components/unstable";
import { Label, useId } from "@fluentui/react-components";
import { useComboStyles } from "./style";
import { useReducer } from "react";
import { filterReducer } from "../../hooks/useFilter";

interface ICustomComboboxProps extends ComboboxProps {
  label: string;
  options: { id: string; title: string; description: string }[];
}

export const CustomCombobox = ({
  options,
  label,
  ...rest
}: ICustomComboboxProps) => {
  const comboId = useId();
  const { sContainer, sLabel, sListbox } = useComboStyles();

  const [filter, dispatch] = useReducer(filterReducer, {});

  if (options.length <= 100)
    return (
      <div className={sContainer}>
        <Label className={sLabel} id={comboId}>
          {label}
        </Label>
        <Combobox
          aria-labelledby={comboId}
          listbox={{
            className: sListbox,
          }}
          onOptionSelect={(e, { optionText: key, optionValue: value }) => {
            dispatch({
              type: "ADD",
              payload: {
                key,
                value,
              },
            });
          }}
          {...rest}
        >
          {options.map((option) => (
            <Option key={option.id} value={option.title} text={option.id}>
              {option.title}
            </Option>
          ))}
        </Combobox>
      </div>
    );

  return (
    <div className={sContainer}>
      <Label className={sLabel} id={comboId}>
        {label}
      </Label>
      <Combobox
        aria-labelledby={comboId}
        listbox={{
          className: sListbox,
        }}
        {...rest}
      >
        <Virtualizer
          numItems={options.length}
          virtualizerLength={Math.trunc(options.length / (options.length / 50))}
          itemSize={Math.trunc(options.length / (options.length / 50))}
        >
          {(index) => (
            <Option key={index} text={options[index].title}>
              {options[index].title}
            </Option>
          )}
        </Virtualizer>
      </Combobox>
    </div>
  );
};
