import React, { useRef, useState, useEffect } from "react";
import styles from "./ImageAdd.module.css";
import axios from "axios";

const ImageAdd = props => {
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  function sendImage() {
    let formData = new FormData();
    formData.append("email", "thebhauze@gmail.com");
    formData.append("image", file);
    axios.post("/api/addImage", formData);
  }

  function pickImage() {
    filePickerRef.current.click();
  }
  console.log(file);
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  function imagePicked(event) {
    let isValid = false;
    console.log(event.target.files);
    if (event.target.files && event.target.files.length === 1) {
      setFile(event.target.files[0]);
      isValid = true;
      console.log(file);
    }
  }

  return (
    <div id={styles.moveSouth}>
      <input
        onChange={imagePicked}
        ref={filePickerRef}
        id={props.id}
        type="file"
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
      />
      {previewUrl ? (
        <img src={previewUrl} alt="Preview" />
      ) : (
        <div>Choose a picture!</div>
      )}
      <button type="button" onClick={pickImage}>
        Pick Image
      </button>
      <button onClick={sendImage}>Send Image</button>
    </div>
  );
};

export default ImageAdd;
