import { Dispatch, SetStateAction, useRef, useState } from "react";
import "./ImageUploadField.css";
import WithModal from "../../WithModal/WithModal";
import Cropper, { Area, Point } from "react-easy-crop";

type ImageUploadFieldProps = {
  blockName: string;
  // setValue: (name: any, optionData: string | null | undefined) => void;
  setCanvas: Dispatch<SetStateAction<HTMLCanvasElement | null>>;
};

const ImageUploadField = ({ blockName, setCanvas }: ImageUploadFieldProps) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

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

    const canvas = await getCroppedImage();

    if (canvas === null) {
      return;
    }

    setCanvas(canvas);

    setIsModalShown(false);
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });

  function getRadianAngle(degreeValue: number) {
    return (degreeValue * Math.PI) / 180;
  }

  const getCroppedImage = async (): Promise<HTMLCanvasElement | null> => {
    const image = await createImage(imageUrl);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (ctx === null) throw new Error("No canvas context");

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    // set each dimensions to double largest dimension to allow for a safe area for the
    // image to rotate in without being clipped by canvas context
    canvas.width = safeArea;
    canvas.height = safeArea;

    // translate canvas context to a central location on image to allow rotating around the center.
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);

    // draw rotated image and store data.
    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5
    );
    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    // paste generated rotate image with correct offsets for x,y crop values.
    ctx.putImageData(
      data,
      Math.round(0 - safeArea / 2 + image.width * 0.5 - croppedAreaPixels.x),
      Math.round(0 - safeArea / 2 + image.height * 0.5 - croppedAreaPixels.y)
    );

    // As Base64 string
    // return canvas.toDataURL('image/jpeg');

    setImageUrl(canvas.toDataURL());

    return canvas;

    // As a data URL
    // return new Promise((resolve, reject) => {
    //   resolve(canvas.toDataURL());
    // });
  };

  return (
    <div className={`image-field ${blockName}__image-field`}>
      {/* <img src={imageUrl} className="image-field__preview" /> */}

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
        <label
          htmlFor="image-field__input"
          className="image-field__file-upload-button"
        >
          Загрузить изображение
        </label>

        {inputRef.current
          ? inputRef.current.value.replace("C:\\fakepath\\", "")
          : "Ничего не выбрано"}
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
            aspect={3 / 3}
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
    </div>
  );
};

export default ImageUploadField;
