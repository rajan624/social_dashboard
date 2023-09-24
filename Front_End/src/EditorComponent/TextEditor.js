import React, { useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import AddBlogForm from "../components/Form/AddBlogForm";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import CommanLoadingScreen from "../components/LoadingScreen/CommanLoadingScreen";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const editorContentStyle = {
  /* Add your custom styles here */
  border: "1px solid #ccc",
  padding: "10px",
  backgroundColor: "#f9f9f9",
};
const TextEditor = () => {
  const cookies = new Cookies();
  const [value, setValues] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleImageUpload = (file) => {
    setLoading(true);
    return new Promise(async (resolve, reject) => {
      // Perform the image upload logic here
      // Once the upload is complete, resolve the promise with the image URL

      const tempUrl = await uploadImage(file);
      setLoading(false);
      console.log(
        "🚀 ~ file: TextEditor.js:46 ~ returnnewPromise ~ tempUrl:",
        tempUrl
      );
      resolve({ data: { link: tempUrl } });
    });
  };

  const getHtml = () => {
    let text = editorState.getCurrentContent().getPlainText("\u0001");
    text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    return text;
  };
  const handelSubmit = async (data, event) => {
    setLoading(true);
    let html = getHtml();
    if (!html) {
      html = "";
    }
    const post = {
      html1: html,
    };
    const token = cookies.get("token");
    console.log(token);
    if (!token) {
      return;
    }
    // Configure the request headers
    const config = {
      headers: {
        Authorization: token,
      },
    };
    // Make the API request to upload the image
    await axios
      .post(`${process.env.REACT_APP_API_URL}/blog/createBlog`, post, config)
      .then((response) => {
        // Handle the response after successful upload
        console.log(response.data);
        reset({});

        setLoading(false);
        toast.success("Post Published!");
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        // Handle any errors during the upload
        toast.error(error.message);
        console.error(error);
      });
  };
  const uploadImage = async (file) => {
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    const token = cookies.get("token");
    console.log(token);
    if (!token) {
      return;
    }
    // Configure the request headers
    const config = {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };
    // Make the API request to upload the image
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/blog/uploadBlogImage`,
        formData,
        config
      );
      // Handle the response after successful upload
      console.log(response.data);
      return `${response.data.imageUrl}`; // Return the image URL
    } catch (error) {
      setLoading(false);
      // Handle any errors during the upload
      toast.error(error.message);
      console.error(error);
      throw error; // Rethrow the error to be caught in the Promise rejection
    }
  };
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      component={"form"}
      noValidate
      onSubmit={handleSubmit(handelSubmit)}
    >
      {/* <AddBlogForm
        register={register}
        errors={errors}
        value={value}
        setValues={setValues}
        setFileUrl={setFileUrl}
        setImage={setImage}
        url={url}
        image={image}
      /> */}
      <Box
        style={{
          width: "80vw",
          marginTop: "2vw",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        }}
      >
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          toolbar={{
            image: {
              uploadCallback: handleImageUpload,
              alt: { present: true, mandatory: false },
            },
            defaultSize: {
              width: "50vw",
              height: "50vh",
            },
          }}
          toolbarClassName="editor-toolbar"
          wrapperClassName="editor-wrapper"
          editorClassName="editor-content"
          customStyleMap={{
            "editor-content": editorContentStyle, // Apply the custom styles to the editor-content class
          }}
        />
        <Box
          style={{
            justifyContent: "center",
            display: "flex",
            gap: "20px",
            margin: "2vw",
          }}
        >
          <button
            type="submit"
            name="publish"
            loading={loading}
            className={"Black-button"}
          >
            Post
          </button>
        </Box>
      </Box>
      <CommanLoadingScreen open={loading} />
    </Box>
  );
};

export default TextEditor;
