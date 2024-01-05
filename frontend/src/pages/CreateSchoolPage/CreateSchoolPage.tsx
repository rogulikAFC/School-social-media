import { SubmitHandler, useForm } from "react-hook-form";
import TextField from "../../Forms/TextField/TextField";
import "./CreateSchoolPage.css";
import "../../Forms/Form.css";
import DynamicSelectField, {
  DynamicSelectFieldOption,
} from "../../Forms/DynamicSelectField/DynamicSelectField";
import { useState } from "react";
import { config } from "../../../config";

type SchoolPageInput = {
  city: string;
  address: string;
  name: string;
  creatorUserId: string;
};

const CreateSchoolPage = () => {
  const { register, handleSubmit, setValue } = useForm<SchoolPageInput>();

  const [testOptions, setTestOptions] = useState<DynamicSelectFieldOption[]>(
    []
  );

  const onSubmit: SubmitHandler<SchoolPageInput> = async (data) => {
    // data.creatorUserId = "cceee826-79c9-4909-a3ac-cd3675f85f4b";

    console.log(data);
  };

  const loadTestOptions = async (query: string) => {
    const response = await fetch(
      config.SERVER_URL + "api/Articles?query=" + query.toLowerCase()
    );

    const jsonArticles: Article[] = await response.json();

    setTestOptions(
      jsonArticles.map((article) => {
        const schoolOption: DynamicSelectFieldOption = {
          value: article.id,
          inner: article.title,
        };

        return schoolOption;
      })
    );
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
          register={register("city")}
        />
        <TextField
          name="Адрес"
          blockName="form"
          register={register("address")}
        />
        <TextField
          name="Название"
          blockName="form"
          register={register("name")}
        />

        <DynamicSelectField
          blockName="form"
          dataListName="tests"
          loadOptionsByQuery={loadTestOptions}
          options={testOptions}
          register={register("creatorUserId")}
          setValue={setValue}
        />

        <input type="submit" className="form__submit-button" />
      </form>
    </div>
  );
};

export default CreateSchoolPage;
