import "./CreateArticlePage.css";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { config } from "../../../config";
import { FieldValues, RegisterOptions, useForm } from "react-hook-form";
import { mergeRefs } from "../../shared/functions/mergeRefs";
import DynamicSelectField, {
  DynamicSelectFieldOption,
} from "../../Forms/DynamicSelectField/DynamicSelectField";

type ArticleForm = {
  text: string;
  categoryId: string;
};

const CreateArticlePage = () => {
  const { schoolId } = useParams();
  const quillObjectRef = useRef<ReactQuill>(null);
  const { register, handleSubmit, setValue } = useForm<ArticleForm>();

  const [categories, setCategories] = useState<DynamicSelectFieldOption[]>([]);

  useEffect(() => {
    const value = (quillObjectRef.current?.value as string) ?? "";

    setValue("text", value);
  }, [quillObjectRef.current?.value]);

  const loadCategoriesByQuery = async (query: string) => {
    const response = await fetch(
      config.SERVER_URL + "api/Categories/?query=" + query
    );

    if (!response.ok) return;

    const categories = (await response.json()) as Category[];

    return categories.map(
      (category) =>
        ({
          inner: category.name,
          value: category.id,
        } as DynamicSelectFieldOption)
    );
  };

  const handleImageUpload = () => {
    const fileInput = document.createElement("input");

    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("accept", "image/*");

    fileInput.click();

    fileInput.onchange = async () => {
      const formData = new FormData();

      const file = fileInput.files![0];

      formData.append("image", file, file.name);

      const response = await fetch(
        config.SERVER_URL + "api/Articles/upload_image",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        console.error("image uploading is unsuccessful");

        return;
      }

      const quillObject = quillObjectRef.current;

      const index = quillObject?.getEditorSelection()?.index ?? 0;

      quillObject
        ?.getEditor()
        .insertEmbed(
          index,
          "image",
          config.SERVER_URL + (await response.text())
        );
    };
  };

  const handleFormSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="create-article-page">
      <form className="form create-article-page__form" onSubmit={handleFormSubmit}>
        <ReactQuill // You can get value using quillObjectRef.current?.value
          ref={quillObjectRef}
          theme="snow"
          modules={{
            toolbar: {
              container: [
                [{ header: [1, false] }],
                ["bold", "italic", "underline"],
                ["image"],
              ],
              handlers: {
                image: handleImageUpload,
              },
            },
          }}
          // {...(register("text") as Omit<RegisterOptions, "ref">)}
        />

        <DynamicSelectField
          blockName="form"
          register={register("categoryId")}
          dataListName="categories"
          loadOptionsByQuery={loadCategoriesByQuery}
          setValue={setCategories}
        />
      </form>
    </div>
  );
};

export default CreateArticlePage;
