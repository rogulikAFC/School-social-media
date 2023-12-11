import "./Title.css"

export type TitleProps = {
  children: string;
  blockName: string;
};

const Title = ({ children, blockName }: TitleProps) => (
  <div className={`title ${blockName}__title`}>{children}</div>
);

export default Title;
