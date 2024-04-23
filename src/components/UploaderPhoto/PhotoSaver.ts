import * as htmlToImage from "html-to-image";
import AvatarEditor from "react-avatar-editor";

export const saveImage = (
  editor: AvatarEditor,
  onUpload: (file: File) => void
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!editor) {
      reject(new Error("Editor element not found"));
      return;
    }

    htmlToImage
      .toPng(editor.getImage())
      .then((dataUrl) => {
        const image = new Image();
        image.src = dataUrl;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = 200;
          canvas.height = 200;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
              if (blob) {
                onUpload(new File([blob], "avatar.png", { type: "image/png" }));
                resolve();
              } else {
                reject(new Error("Failed to create blob"));
              }
            }, "image/png");
          } else {
            reject(new Error("Unable to get 2D context"));
          }
        };
      })
      .catch((error) => {
        reject(new Error("Failed to save image: " + error.message));
      });
  });
};
