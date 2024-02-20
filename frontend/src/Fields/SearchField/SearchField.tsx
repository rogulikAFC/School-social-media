import "./SearchField.css";
import "../Field.css";
import Cancel from "../../assets/CancelSearch.svg";
import SearchImg from "../../assets/SearchIcon.svg";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type SearchFieldProps = {
  blockName: string;
  onCancelClick: Function;
};

const SearchField = ({ blockName, onCancelClick }: SearchFieldProps) => {
  const placeholder = "Найти";

  const [content, setContent] = useState<string>(placeholder);

  const handleContent = (value: string) =>
    setContent(value ? value : placeholder);

  const [inputWidth, setInputWidth] = useState<number>();
  const navigate = useNavigate();

  const sizerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sizer = sizerRef.current;

    if (sizer === null) {
      return;
    }

    setInputWidth(sizer.scrollWidth);
  }, [content]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleContent(e.target.value);

  const handleCancelClick = () => {
    const input = inputRef.current;

    if (input === null) {
      return;
    }

    input.value = "";

    handleContent("");

    onCancelClick();
  };

  const handleSearchClick = () => {
    const query = inputRef.current?.value;

    if (query === null) {
      return;
    }

    navigate({ pathname: "search", search: `?q=${query}` });

    location.reload()
  };

  return (
    <div
      className={`field ${blockName}__field field_text-field field_search`}
      style={{ maxWidth: "90%" }}
    >
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
        ref={inputRef}
        style={{ width: inputWidth }}
      />

      <div className="field__sizer" ref={sizerRef}>
        {content}
      </div>

      <div className="field_search__buttons">
        <button className="field_search__cancel" onClick={handleCancelClick}>
          <img src={Cancel} alt="Cancel" />
        </button>

        <button className="field_search__search" onClick={handleSearchClick}>
          <img src={SearchImg} alt="Search" />
        </button>
      </div>
    </div>
  );
};

export default SearchField;
