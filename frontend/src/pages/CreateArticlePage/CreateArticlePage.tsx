import "./CreateArticlePage.css";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createRef } from "react";
import { config } from "../../../config";

const CreateArticlePage = () => {
  const { schoolId } = useParams();
  const quillObjectRef = createRef<ReactQuill>();

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

  return (
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
    />
  );
};

export default CreateArticlePage;
