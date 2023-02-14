import React, { useState } from "react";
import axios from "axios";

const FileInput = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios
      .get(`http://localhost:8080/check?filename=${file.name}`)
      .then((response) => {
        if (response.data.exists) {
          const confirmOverwrite = window.confirm(
            "This file already exists. Do you want to overwrite it?"
          );
          if (confirmOverwrite) {
            axios
              .delete(`http://localhost:8080/delete?filename=${file.name}`)
              .then(() => {
                uploadFile(formData);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        } else {
          uploadFile(formData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const uploadFile = (formData) => {
    axios
      .post("http://localhost:8080/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("response", response.data);
        const regex = /File uploaded to: (.+)/;
        const url = response.data.match(regex)[1];
        setUrl(url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
      {url && (
        <p>
          Uploaded file URL: <a href={url}>{url}</a>
        </p>
      )}
    </div>
  );
};

export default FileInput;
