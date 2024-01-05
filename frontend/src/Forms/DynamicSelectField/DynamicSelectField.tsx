import React, { useRef } from "react";
import "./DynamicSelectField.css";

type DynamicSelectFieldProps = {
  blockName: string;
  dataListName: string;
  loadOptionsByQuery: (query: string) => Promise<any>;
  options: DynamicSelectFieldOption[];
  register: any;
  setValue: (name: any, optionData: string | null | undefined) => void;
};

export type DynamicSelectFieldOption = {
  value: string;
  inner: any;
};

const DynamicSelectField = ({
  blockName,
  dataListName,
  loadOptionsByQuery,
  options,
  register,
  setValue
}:
DynamicSelectFieldProps) => {
  const datalistRef = useRef<HTMLDataListElement>(null);

  const onFieldChange = async (data: React.ChangeEvent<HTMLInputElement>) => {
    const value = data.target.value;

    const selectedOption = datalistRef.current?.options.namedItem(value);

    const optionData = selectedOption?.getAttribute("data");

    setValue(register.name, optionData)

    await loadOptionsByQuery(value);
  };

  return (
    <div className={`${blockName}__select-field select-field`}>
      <input
        type="text"
        list={dataListName}
        onChange={onFieldChange}
      />

      <datalist id={dataListName} ref={datalistRef}>
        {options.map((option) => (
          <option value={option.inner} name={option.inner} data={option.value}>
            {option.inner}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default DynamicSelectField;
