import "./BluredImageBackgroud.css";

type BluredImageBackgroudProps = {
  blockName: string;
  imageUrl: string;
};

const BluredImageBackgroud = ({
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

export default BluredImageBackgroud;
