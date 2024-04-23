import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const useImageDropzone = (
  onDrop: (acceptedFiles: File[]) => void,
  isPhotoUploaded: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setImageSrc: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!isPhotoUploaded) {
        const file = acceptedFiles[0];
        setIsLoading(true);
        setTimeout(() => {
          setImageSrc(URL.createObjectURL(file));
          setIsLoading(false);
        }, 2000);
      }
    },
    [isPhotoUploaded, setIsLoading, setImageSrc]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  return { getRootProps, getInputProps };
};

export default useImageDropzone;
