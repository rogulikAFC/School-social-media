import { useParams } from "react-router-dom";
import TextField from "../../Forms/TextField/TextField";
import { useForm } from "react-hook-form";
import PasswordField from "../../Forms/PasswordField/PasswordField";
import useCheckIfSelfProfile from "../../hooks/useCheckIfSelfProfile";

type ChangeUserForm = {
  name?: string;
  email?: string;
  password1?: string;
  password2?: string;
};

const ChangeUser = () => {
  const { userId: userFromProfileId } = useParams();
  const { isSelfProfile } = useCheckIfSelfProfile(userFromProfileId);

  const {
    register,
    formState: { errors },
    watch,
  } = useForm<ChangeUserForm>();

  if (!isSelfProfile) return;

  return (
    <div className="create-page change-user-page">
      <form className="form change-user-page__form">
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
      </form>
    </div>
  );
};

export default ChangeUser;
