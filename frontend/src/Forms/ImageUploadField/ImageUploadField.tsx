import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import "./ImageUploadField.css";
import WithModal from "../../WithModal/WithModal";
import Cropper, { Area, Point } from "react-easy-crop";
import { getCroppedImage } from "./functions";

type ImageCropperProperties = {
  aspect?: number;
  borderRadius?: number | string;
};

type ImageUploadFieldProps = {
  blockName: string;
  setCanvas: Dispatch<SetStateAction<HTMLCanvasElement | null>>;
  imageCropperProperties?: ImageCropperProperties;
};

const ImageUploadField = ({
  blockName,
  setCanvas,
  imageCropperProperties,
}: ImageUploadFieldProps) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  if (!imageCropperProperties)
    imageCropperProperties = {
      aspect: 3 / 3,
      borderRadius: "50%",
    };

  const inputRef = useRef<HTMLInputElement>(null);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const imageUrl = URL.createObjectURL(e.target.files![0]);
    setImageUrl(imageUrl);

    setIsModalShown(true);
  };

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCropDone = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const canvas = await getCroppedImage(
      imageUrl,
      setImageUrl,
      rotation,
      croppedAreaPixels
    );

    if (canvas === null) {
      return;
    }

    setCanvas(canvas);

    setIsModalShown(false);
  };

  return (
    <div className={`image-field ${blockName}__image-field`}>
      <input
        type="file"
        accept="image/*"
        className="image-field__input"
        id="image-field__input"
        onChange={onInputChange}
        ref={inputRef}
        hidden
      />

      <div className="image-field__field-container">
        <div className="image-field__upload-label">
          <label
            htmlFor="image-field__input"
            className="image-field__file-upload-button"
          >
            Загрузить изображение
          </label>

          <div className="image-field__file-name">
            {inputRef.current?.value
              ? inputRef.current.value.replace("C:\\fakepath\\", "")
              : "Ничего не выбрано"}
          </div>
        </div>

        {imageUrl && (
          <img
            className="image-field__preview"
            src={imageUrl}
            alt=""
            style={{
              borderRadius:
                imageCropperProperties?.borderRadius == (null || 0)
                  ? 15
                  : imageCropperProperties!.borderRadius,
            }}
          />
        )}
      </div>

      <WithModal
        blockName="image-field"
        title="Обрезка изображения"
        isShown={isModalShown}
      >
        <div className="image-field__crop-containers crop-container">
          <Cropper
            image={imageUrl}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={imageCropperProperties?.aspect}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            classes={{
              containerClassName: "crop crop-container__crop",
              cropAreaClassName: "crop__crop-area",
            }}
          />
        </div>

        <button
          className="form__submit-button modal__button"
          onClick={onCropDone}
        >
          Готово
        </button>
      </WithModal>

      <style>
        {`.crop__crop-area {border-radius: ${imageCropperProperties?.borderRadius}}`}
      </style>
    </div>
  );
};

export default ImageUploadField;
