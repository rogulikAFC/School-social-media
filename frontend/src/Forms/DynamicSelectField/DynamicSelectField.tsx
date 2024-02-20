import React, { useEffect, useRef, useState } from "react";
import "./DynamicSelectField.css";

type DynamicSelectFieldProps = {
  blockName: string;
  dataListName: string;
  loadOptionsByQuery: (
    query: string
  ) => Promise<DynamicSelectFieldOption[] | undefined>;
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
  register,
  setValue,
}: DynamicSelectFieldProps) => {
  const datalistRef = useRef<HTMLDataListElement>(null);
  const [options, setOptions] = useState<DynamicSelectFieldOption[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    (async () => {
      const newOptions = await loadOptionsByQuery(query);

      setOptions((prevOptions) =>
        [...prevOptions, ...(newOptions ?? [])].reduce<
          DynamicSelectFieldOption[]
        >((acc, option) => {
          // Filtering for unique options
          if (
            acc
              .map((optionFromAcc) => optionFromAcc.value)
              .includes(option.value)
          )
            return acc;

          return [...acc, option];
        }, [])
      );
    })();
  }, [query]);

  const handleFieldChange = async (
    data: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = data.target.value;

    if (query === "") return;

    setQuery(query);

    const selectedOption = datalistRef.current?.options.namedItem(
      query.replace(/ /g, "")
    );

    setValue(register.name, selectedOption?.getAttribute("data"));
  };

  return (
    <div
      className={`${blockName}__select-field select-field ${blockName}__text-field-wrapper`}
    >
      <input
        type="text"
        list={dataListName}
        onChange={handleFieldChange}
        className={`${blockName}__text-field text-field`}
      />

      <datalist id={dataListName} ref={datalistRef}>
        {options.map((option) => (
          <option
            id={option.inner.replace(/ /g, "")}
            data={option.value}
            key={option.value}
          >
            {option.inner}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default DynamicSelectField;
