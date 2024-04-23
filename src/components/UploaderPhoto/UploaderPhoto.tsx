import React, { useState, FC, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import UploadIcon from "@mui/icons-material/Upload";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./UploaderPhoto.module.scss";
import { saveImage } from "./PhotoSaver";
import ImageControls from "./ImageControls";
import useImageDropzone from "../../hooks/utils/useImageDropzone";

interface UploaderPhotoProps {
  onUpload: (file: File) => void;
}

const UploaderPhoto: FC<UploaderPhotoProps> = ({ onUpload }) => {
  const editorRef = useRef<AvatarEditor>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const [isPhotoUploaded, setIsPhotoUploaded] = useState<boolean>(false);
  const [isControlsEnabled, setIsControlsEnabled] = useState(true);

  const [isSaveClicked, setIsSaveClicked] = useState<boolean>(false);
  const [isPhotoEdited, setIsPhotoEdited] = useState<boolean>(false);
  const [, setIsChangePhotoClicked] = useState<boolean>(false);

  const handleDrop = (acceptedFiles: File[]) => {
    setIsSaveClicked(false);
    setIsPhotoEdited(false);
    if (!isPhotoUploaded) {
      const file = acceptedFiles[0];
      setIsLoading(true);
      setTimeout(() => {
        setImageSrc(URL.createObjectURL(file));
        setIsLoading(false);
      }, 2000);
    }
  };

  const { getRootProps, getInputProps } = useImageDropzone(
    handleDrop,
    isPhotoUploaded,
    setIsLoading,
    setImageSrc
  );

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);
  };

  const handleSaveClick = () => {
    setIsPhotoUploaded(true);
    setIsControlsEnabled(false);
    setIsSaveClicked(true);
    setIsPhotoEdited(true);

    const editor = editorRef.current;
    if (editor) {
      saveImage(editor, onUpload)
        .then(() => {})
        .catch((error) => {
          console.error("Failed to save image:", error);
        });
    } else {
      console.error("Avatar editor element not found");
    }
  };

  const handleHoverChangeClick = () => {
    setIsChangePhotoClicked(true);
  };

  const handleRemovePhoto = () => {
    setIsPhotoUploaded(false);
    setImageSrc(null);
    setIsChangePhotoClicked(false);
    setIsSaveClicked(false);
  };

  return (
    <div className={styles.dropzone}>
      {imageSrc ? (
        <div className={styles.imageContainer}>
          <AvatarEditor
            ref={editorRef}
            image={imageSrc}
            width={340}
            height={290}
            border={0}
            scale={scale}
            borderRadius={0}
          />
          {!isPhotoUploaded && (
            <ImageControls
              scale={scale}
              handleScaleChange={handleScaleChange}
              handleSaveClick={handleSaveClick}
              isPhotoUploaded={isPhotoUploaded}
              handleHoverChangeClick={handleHoverChangeClick}
              handleRemovePhoto={handleRemovePhoto}
              isControlsEnabled={isControlsEnabled}
            />
          )}
        </div>
      ) : (
        <div {...getRootProps()} className={styles.dropzoneContent}>
          <input {...getInputProps()} />
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <CircularProgress size={40} sx={{ color: "#d7e2e9" }} />
              <p className={styles.textLoader}>Завантаження зображення...</p>
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
                  Обличчя. До 20МБ 200x200px jpeg, jpg, png, heic, heif
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {isSaveClicked && isPhotoEdited && (
        <div
          className={`${styles.uploadedImageContainer} ${
            isSaveClicked ? styles.hoverVisible : ""
          }`}
          onClick={handleRemovePhoto}
        >
          <h2 className={styles.title}>Змінити фото</h2>
          <p className={styles.textHover}>
            Обличчя. До 20МБ 200x200px jpeg, jpg, png, heic, heif
          </p>
        </div>
      )}
    </div>
  );
};

export default UploaderPhoto;
