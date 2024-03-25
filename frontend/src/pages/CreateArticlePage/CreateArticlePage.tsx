import "./CreateArticlePage.css";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { config } from "../../../config";
import { useForm } from "react-hook-form";
import DynamicSelectField, {
  DynamicSelectFieldOption,
} from "../../Forms/DynamicSelectField/DynamicSelectField";
import TextField from "../../Forms/TextField/TextField";
import { UserContext } from "../../contexts/UserContext";
import ImageUploadField from "../../Forms/ImageUploadField/ImageUploadField";

type ArticleForm = {
  title: string;
  content: string;
  categoryId: string;
  schoolId: string;
  userId: string;
};

const CreateArticlePage = () => {
  const { schoolId } = useParams();
  const quillObjectRef = useRef<ReactQuill>(null);
  const { register, handleSubmit, setValue } = useForm<ArticleForm>();
  const { getCredentials } = useContext(UserContext);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  const [quillValue, setQuillValue] = useState<string>("");

  useEffect(() => {
    schoolId == null || setValue("schoolId", schoolId);
  }, [schoolId]);

  useEffect(() => {
    const getUserId = async () => {
      const userCredentials = await getCredentials();

      if (!userCredentials) return;

      setValue("userId", userCredentials.id);
    };

    getUserId();
  }, []);

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

  const handleFormSubmit = handleSubmit(async (data) => {
    console.log(data);

    const articleResponse = await fetch(config.SERVER_URL + "api/Articles", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!articleResponse.ok) return console.log("Response is bad");

    const article = await articleResponse.json();

    console.log(article);

    canvas?.toBlob(async (blob) => {
      if (!blob) throw new Error("No BLOB image");

      const formData = new FormData();

      const file = new File([blob], "image.jpg", { type: "image/jpeg" });

      formData.append("Image", file);

      const previewImageResponse = await fetch(
        config.SERVER_URL + `api/Articles/${article.id}/add_preview_image`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!previewImageResponse.ok)
        return console.error("image uploading is unsuccessful");
    }, "image/jpeg");
  });

  return (
    <div className="create-article-page create-page">
      <form
        className="form create-article-page__form"
        onSubmit={handleFormSubmit}
      >
        <TextField
          name="Заголовок"
          blockName="form"
          register={register("title")}
          errorFromHook={undefined}
        />

        <ReactQuill // You can get value using quillObjectRef.current?.value
          ref={quillObjectRef}
          theme="snow"
          modules={useMemo(
            () => ({
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
            }),
            []
          )}
          value={quillValue}
          onChange={(newValue) => {
            setQuillValue(newValue);
            setValue("content", newValue);
          }}
        />

        <ImageUploadField
          blockName="form"
          setCanvas={setCanvas}
          imageCropperProperties={{
            aspect: 3 / 2,
            borderRadius: 0,
          }}
        />

        <DynamicSelectField
          blockName="form"
          register={register("categoryId")}
          dataListName="categories"
          loadOptionsByQuery={loadCategoriesByQuery}
          setValue={setValue}
        />

        <button className="form__submit-button">Submit</button>
      </form>
    </div>
  );
};

export default CreateArticlePage;
