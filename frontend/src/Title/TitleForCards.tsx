import "./Title.css"
import { TitleProps } from "./Title"

const TitleForCards = ({ children, blockName }: TitleProps) => (
  <div className={`title ${blockName}__title ${blockName}__title_for-cards title_for-cards`}>{children}</div>
);

export default TitleForCards;