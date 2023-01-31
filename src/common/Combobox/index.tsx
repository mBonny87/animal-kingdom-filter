import {
  Combobox,
  ComboboxProps,
  Option,
  Virtualizer,
} from "@fluentui/react-components/unstable";
import { Label, Spinner, useId } from "@fluentui/react-components";
import { useComboStyles } from "./style";
import { useState } from "react";

interface ICustomComboboxProps extends ComboboxProps {
  label: string;
  options: { id: string; title: string }[];
  loading: boolean;
  onExternalFilter: (
    id:
      | React.ChangeEvent<HTMLElement>
      | React.KeyboardEvent<HTMLElement>
      | React.MouseEvent<HTMLElement>,
    title: OptionOnSelectData
  ) => void;
}

type OptionOnSelectData = {
  optionValue: string | undefined;
  optionText: string | undefined;
  selectedOptions: string[];
};

export const CustomCombobox = ({
  options,
  label,
  loading,
  onExternalFilter,
  ...rest
}: ICustomComboboxProps) => {
  const comboId = useId();
  const { sContainer, sLabel, sListbox } = useComboStyles();

  console.log(options);

  if (loading) {
    return (
      <div className={sContainer}>
        <Label className={sLabel} id={comboId}>
          {label}
        </Label>
        <Combobox
          expandIcon={<Spinner />}
          aria-labelledby={comboId}
          placeholder={`Select a ${label.toLowerCase()}`}
          listbox={{
            className: sListbox,
          }}
          {...rest}
        ></Combobox>
      </div>
    );
  }
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
          placeholder={`Select a ${label.toLowerCase()}`}
          onOptionSelect={onExternalFilter}
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
        placeholder={`Select a ${label.toLowerCase()}`}
        onOptionSelect={onExternalFilter}
        {...rest}
      >
        <Virtualizer
          numItems={options.length}
          virtualizerLength={Math.trunc(options.length / (options.length / 50))}
          itemSize={Math.trunc(options.length / (options.length / 50))}
        >
          {(i) => (
            <Option
              key={options[i].id}
              value={options[i].title}
              text={options[i].id}
            >
              {options[i].title}
            </Option>
          )}
        </Virtualizer>
      </Combobox>
    </div>
  );
};
