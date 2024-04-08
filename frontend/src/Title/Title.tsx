import "./Title.css"

export type TitleProps = {
  children: any;
  blockName: string;
};

const Title = ({ children, blockName }: TitleProps) => (
  <div className={`title ${blockName}__title title_large`}>{children}</div>
);

export default Title;
