import "./Title.css"

export type TitleProps = {
  children: string | string[];
  blockName: string;
};

const Title = ({ children, blockName }: TitleProps) => (
  <div className={`title ${blockName}__title title_large`}>{children}</div>
);

export default Title;
