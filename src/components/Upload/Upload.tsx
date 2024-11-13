"use client";

import React, { forwardRef, useState, ChangeEvent } from "react";
import axios from "axios";
import "./Upload.scss";
import { FieldErrors } from "react-hook-form";
import { FiLoader } from "react-icons/fi";

interface Props {
  id: string;
  name?: string;
  handleChange: (file: { filePath: string; fileName: string }) => void;
  className?: string;
  labelStyle?: string;
  errors?: FieldErrors;
  fileName?: string | undefined;
}

const Upload = (props: Props, ref: React.ForwardedRef<HTMLInputElement>) => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false); // For loading state

  const { id, name, errors, className, labelStyle, handleChange, fileName } =
    props;

  const error = errors && name && errors[name];

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Perform the upload
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        setUploading(true); // Set the loading state
        const response = await axios.post<{
          filePath: string;
          fileName: string;
        }>("/api/admin/upload-doc", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          setMessage("File uploaded successfully!");
          const { filePath, fileName } = response.data;

          // Call the handleChange function passed as a prop
          handleChange({ filePath, fileName });
        } else {
          setMessage("Failed to upload file.");
        }
      } catch (error) {
        console.error(error);
        setMessage("Error uploading file.");
      } finally {
        setUploading(false); // Reset the loading state
      }
    }
  };

  return (
    <div className={`upload-container ${className || ""}`}>
      <label htmlFor={id} className="upload-input">
        <input type="file" id={id} name={name} onChange={onChange} ref={ref} />
        <div className={`field-label-container flex  ${labelStyle || ""}`}>
          <div className="inside-text flex items-center">
            <div>
              {file ? file.name : fileName ? fileName : "Choose File..."}
            </div>
          </div>
          <div className="input-btn flex items-center justify-center">
            {uploading ? (
              <div className="loader-icon-container">
                <FiLoader className="loader-icon" />
              </div>
            ) : (
              "Upload"
            )}
          </div>
        </div>
      </label>

      {error && <p className="error-message">{error.message?.toString()}</p>}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

const UploadInput = forwardRef(Upload);
export default UploadInput;
