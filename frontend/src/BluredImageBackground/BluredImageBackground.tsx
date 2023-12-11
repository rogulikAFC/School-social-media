import "./BluredImageBackground.css";

type BluredImageBackgroudProps = {
  blockName: string;
  imageUrl: string;
};

const BluredImageBackground = ({
  imageUrl,
  blockName,
}: BluredImageBackgroudProps) => {
  return (
    <div
      className={`blured-background-image ${blockName}__blured-background-image`}
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    />
  );
};

export default BluredImageBackground;
