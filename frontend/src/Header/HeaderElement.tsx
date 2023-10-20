import { FC } from "react";

const HeaderElement: FC<{ name: string; relativeLink: string }> = ({
  name,
  relativeLink,
}) => (
  <a className="header-elements__element" href={relativeLink}>
    {name}
  </a>
);

export default HeaderElement;
