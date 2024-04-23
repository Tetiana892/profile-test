import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import styles from "./UploaderPhoto.module.scss";

interface ImageControlsProps {
  scale: number;
  handleScaleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveClick: () => void;
  isPhotoUploaded: boolean;
  handleHoverChangeClick: () => void;
  handleRemovePhoto: () => void;
  isControlsEnabled: boolean;
}

const ImageControls: React.FC<ImageControlsProps> = ({
  scale,
  handleScaleChange,
  handleSaveClick,
  isPhotoUploaded,
  handleHoverChangeClick,
  handleRemovePhoto,
  isControlsEnabled,
}) => {
  return (
    <div className={styles.rangeWrapper}>
      <button className={styles.button} onClick={handleRemovePhoto}>
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
      <button
        className={styles.button}
        onClick={handleSaveClick}
        disabled={isPhotoUploaded}
        onMouseEnter={handleHoverChangeClick}
      >
        <DoneIcon
          className={styles.icon}
          sx={{ fontSize: 17, marginRight: "10px", color: "#707e93" }}
        />
      </button>
    </div>
  );
};

export default ImageControls;
