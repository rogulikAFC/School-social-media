import Title from "../Title/Title";
import "./WithModal.css";

type WithModalProps = {
  children: React.ReactElement | React.ReactElement[];
  blockName: string;
  title: string;
  isShown: boolean;
};

const WithModal = ({ children, blockName, title, isShown }: WithModalProps) => {
  return (
    <div
      className={`modal-wrapper ${blockName}__modal-wrapper`}
      style={{
        visibility: isShown ? "visible" : "hidden",
      }}
    >
      <div className="modal__modal-wrapper modal">
        <header className="modal__header">
          <Title blockName="modal">{title}</Title>
        </header>
        <main className="modal__main">{children}</main>
      </div>
    </div>
  );
};

export default WithModal;
