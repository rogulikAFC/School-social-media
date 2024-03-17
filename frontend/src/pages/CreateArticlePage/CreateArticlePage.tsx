import "./CreateArticlePage.css"
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

const CreateArticlePage = () => {
  const { schoolId } = useParams();
  const [quillValue, setQuillValue] = useState<string>("");

  return (
    <ReactQuill
      theme="snow"
      value={quillValue}
      onChange={(value) => {
        setQuillValue(value);
        console.log(value);
      }}
    />
  );
};

export default CreateArticlePage;
