import { SubmitHandler, useForm } from "react-hook-form";
import TextField from "../../Forms/TextField/TextField";
import "./CreateSchoolPage.css";
import "../../Forms/Form.css";
import ImageUploadField from "../../Forms/ImageUploadField/ImageUploadField";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { config } from "../../../config";
import FormValidateErrors from "../../shared/enums/FormValidateErrors";

type SchoolPageInput = {
  city: string;
  address: string;
  name: string;
  creatorUserId: string;
};

const CreateSchoolPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchoolPageInput>();

  const { getCredentials } = useContext(UserContext);

  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  const onSubmit: SubmitHandler<SchoolPageInput> = async (data) => {
    const userId = (await getCredentials())?.id;

    if (userId == null) return;

    data.creatorUserId = userId;

    console.log(data);

    const schoolResponse = await fetch(config.SERVER_URL + "api/Schools", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!schoolResponse.ok) return;

    const schoolId = ((await schoolResponse.json()) as School).id;

    canvas?.toBlob(async (blob) => {
      if (!blob) throw new Error("No image BLOB");

      const formData = new FormData();

      const file = new File([blob], "image.jpg");

      formData.append("Image", file);

      const imageResponse = await fetch(
        config.SERVER_URL +
          "api/Schools/" +
          schoolId +
          "/add_image/by_admin/" +
          userId,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!imageResponse.ok)
        return console.error("image uploading is unsuccessful");
    }, "image/jpeg");
  };

  return (
    <div className="create-page">
      <form
        className="create-page__form form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          name="Населенный пункт"
          blockName="form"
          register={register("city", {
            required: {
              value: true,
              message: FormValidateErrors.required,
            },
            maxLength: {
              value: 32,
              message: FormValidateErrors.maxLengthAchieved,
            },
          })}
          errorFromHook={errors.city?.message}
        />

        <TextField
          name="Адрес"
          blockName="form"
          register={register("address", {
            required: {
              value: true,
              message: FormValidateErrors.required,
            },
            maxLength: {
              value: 128,
              message: FormValidateErrors.maxLengthAchieved,
            },
          })}
          errorFromHook={errors.address?.message}
        />

        <TextField
          name="Название"
          blockName="form"
          register={register("name", {
            required: {
              value: true,
              message: FormValidateErrors.required,
            },
            maxLength: {
              value: 32,
              message: FormValidateErrors.maxLengthAchieved,
            },
          })}
          errorFromHook={errors.name?.message}
        />

        <ImageUploadField blockName="form" setCanvas={setCanvas} />

        <input type="submit" className="form__submit-button" />
      </form>
    </div>
  );
};

export default CreateSchoolPage;
