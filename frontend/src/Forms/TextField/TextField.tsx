import "./TextField.css";

type TextFieldProps = {
  blockName: string;
  name: string;
  register: any;
};

const TextField = ({ name, blockName, register }: TextFieldProps) => {
  return (
    <input
      className={`${blockName}__text-field text-field`}
      placeholder={name}
      type="text"
      {...register}
    />
  );
};

export default TextField;
