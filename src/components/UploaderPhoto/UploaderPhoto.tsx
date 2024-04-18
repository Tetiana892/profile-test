import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import UploadIcon from "@mui/icons-material/Upload";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./UploaderPhoto.module.scss";

interface UploaderPhotoProps {
  onUpload: (file: File) => void;
}

const UploaderPhoto: React.FC<UploaderPhotoProps> = ({ onUpload }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setIsLoading(true);
      setTimeout(() => {
        onUpload(file);
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          setImageSrc(dataUrl);
          setIsLoading(false);
        };
        reader.readAsDataURL(file);
      }, 2000);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={styles.dropzone}>
      <input {...getInputProps()} accept="image/*" />
      <div className={styles.dropzoneContent}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <CircularProgress size={40} sx={{ color: "#d7e2e9" }} />
            <p className={styles.textLoader}>Завантаження зображення...</p>
          </div>
        ) : imageSrc ? (
          <div className={styles.imageContainer}>
            <div className={styles.uploadedImageContainer}>
              <h2 className={styles.title}>Змінити фото</h2>
              <p className={styles.textHover}>
                Обличчя. До 20МБ 200*200 - 8192*8192px jpeg, jpg, png, heic,
                heif
              </p>
            </div>
            <img
              src={imageSrc}
              alt="Uploaded"
              className={styles.uploadedImage}
            />
          </div>
        ) : (
          <>
            <AddAPhotoOutlinedIcon
              className={styles.cameraIcon}
              sx={{ fontSize: 85 }}
            />
            <div className={styles.downDropzone}>
              <UploadIcon className={styles.iconUp} />
              <p className={styles.text}>
                Обличчя. До 20МБ 200*200 - 8192*8192px jpeg, jpg, png, heic,
                heif
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UploaderPhoto;
