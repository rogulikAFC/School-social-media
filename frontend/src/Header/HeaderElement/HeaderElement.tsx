import "./HeaderElement.css";

export type HeaderElementProps = {
  name: string;
  onClick: () => void;
};

const HeaderElement = ({ name, onClick }: HeaderElementProps) => {
  return (
    <button className="header-elements__element" onClick={onClick}>
      {name}
    </button>
  );
};

export default HeaderElement;
