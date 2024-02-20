import { useForm } from "react-hook-form";
import "./SignUpPage.css";
import TextField from "../../Forms/TextField/TextField";
import DynamicSelectField, {
  DynamicSelectFieldOption,
} from "../../Forms/DynamicSelectField/DynamicSelectField";
import { config } from "../../../config";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import ImageUploadField from "../../Forms/ImageUploadField/ImageUploadField";
import PasswordField from "../../Forms/PasswordField/PasswordField";

type UserSignUpForm = Omit<UserToSignUp, "password"> & {
  password1: string;
  password2: string;
};

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserSignUpForm>({ shouldUnregister: true });

  const { signUp, getCredentials } = useContext(UserContext);

  const [imageCanvas, setImageCanvas] = useState<HTMLCanvasElement | null>(
    null
  );

  const [schoolOptions, setSchoolOptions] = useState<
    DynamicSelectFieldOption[]
  >([]);

  const loadSchoolsByQuery = async (query: string) => {
    const response = await fetch(
      config.SERVER_URL + "api/Schools/?query=" + query.toLowerCase()
    );

    if (!response.ok) return;

    const schools: School[] = await response.json();

    return schools.map(
      (school) =>
        ({
          value: school.id,
          inner: school.nameWithAddress,
        } as DynamicSelectFieldOption)
    );
  };

  const onSubmit = async (userFromSignUpForm: UserSignUpForm) => {
    console.log({ userFromSignUpForm });

    const signUpUser: UserToSignUp = {
      name: userFromSignUpForm.name,
      schoolId: userFromSignUpForm.schoolId,
      email: userFromSignUpForm.email,
      password: userFromSignUpForm.password2,
    };

    console.log({ signUpUser });

    const isSignUpSuccessful = await signUp(signUpUser);

    if (!isSignUpSuccessful) {
      console.error("sign up is unsuccessful");

      return;
    }

    const user = await getCredentials();

    if (!user) return;

    imageCanvas?.toBlob(async (blob) => {
      if (!blob) throw new Error("No BLOB image");

      const formData = new FormData();

      const file = new File([blob], "image.jpg", { type: "image/jpeg" });

      formData.append("Image", file);

      const response = await fetch(
        config.SERVER_URL + `api/Users/${user.id}/add_image`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        console.error("image uploading is unsuccessful");

        return;
      }
    }, "image/jpeg");
  };

  return (
    <div className="create-page">
      <form
        className="create-page__form form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          name="Имя"
          blockName="form"
          register={register("name", {
            required: "Необходимо указать имя",
            maxLength: {
              value: 32,
              message: "Максимальная длина имени - 32 символа",
            },
          })}
          errorFromHook={errors.name?.message}
        />

        <TextField
          name="Электронная почта"
          blockName="form"
          register={register("email", {
            required: "Необходимо указать электронную почту",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Некорректно введена электронная почта",
            },
          })}
          errorFromHook={errors.email?.message}
        />

        <PasswordField
          blockName="form"
          register={register("password1", {
            required: "Необходимо указать пароль",
          })}
          errorFromHook={errors.password1?.message}
        />

        <TextField
          name="Повторите пароль"
          blockName="form"
          register={register("password2", {
            validate: () =>
              watch("password1") == watch("password2") || "Пароли не совпадают",
            required: "Необходимо повторить пароль",
          })}
          errorFromHook={errors.password2?.message}
          password
        />

        <DynamicSelectField
          blockName="form"
          dataListName="schools"
          loadOptionsByQuery={loadSchoolsByQuery}
          options={schoolOptions}
          register={register("schoolId", {
            required: false,
          })}
          setValue={setValue}
        />

        <ImageUploadField setCanvas={setImageCanvas} blockName="form" />

        <input type="submit" className="form__submit-button" />
      </form>
    </div>
  );
};

export default SignUpPage;
