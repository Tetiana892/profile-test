import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import UploadIcon from "@mui/icons-material/Upload";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./UploaderPhoto.module.scss";

interface UploaderPhotoProps {
  onUpload: (file: File) => void;
}

const UploaderPhoto: React.FC<UploaderPhotoProps> = ({ onUpload }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editor, setEditor] = useState<AvatarEditor | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [isSaveClicked, setIsSaveClicked] = useState<boolean>(false);
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!imageUploaded) {
        const file = acceptedFiles[0];
        setIsLoading(true);
        setImageUploaded(true);
        onUpload(file);
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          setImageSrc(dataUrl);
          setIsLoading(false);
        };
        reader.readAsDataURL(file);
      }
    },
    [onUpload, imageUploaded]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);
    setIsEdited(true);
  };

  const handleSaveClick = () => {
    setIsSaveClicked(true);
    // Additional logic for saving the image
  };

  useEffect(() => {
    return () => {
      setImageUploaded(false); // Reset the imageUploaded state when the component unmounts
    };
  }, []);

  return (
    <div className={styles.dropzone}>
      {imageSrc ? (
        <div className={styles.imageContainer}>
          <AvatarEditor
            ref={(editor) => setEditor(editor)}
            image={imageSrc}
            width={340}
            height={290}
            border={0}
            scale={scale}
            borderRadius={0}
          />
          <div className={styles.rangeWrapper}>
            <button className={styles.button}>
              <CloseIcon
                className={styles.icon}
                sx={{ fontSize: 17, marginLeft: "10px", color: "#707e93" }}
              />
            </button>
            <div className={styles.range}>
              <RemoveIcon sx={{ fontSize: 12 }} />
              <input
                type="range"
                min="1"
                max="2"
                step="0.01"
                value={scale}
                style={{ color: "red" }}
                onChange={handleScaleChange}
              />
              <AddIcon sx={{ fontSize: 12 }} />
            </div>
            <button onClick={handleSaveClick} className={styles.button}>
              <DoneIcon
                className={styles.icon}
                sx={{ fontSize: 17, marginRight: "10px", color: "#707e93" }}
              />
            </button>
          </div>
        </div>
      ) : (
        <div {...getRootProps()} className={styles.dropzoneContent}>
          <input {...getInputProps()} accept="image/*" />
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <CircularProgress size={40} sx={{ color: "#d7e2e9" }} />
              <p className={styles.textLoader}>Загрузка изображения...</p>
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
                  Лицо. Размер: 200x200px jpeg, jpg, png, heic, heif
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UploaderPhoto;
