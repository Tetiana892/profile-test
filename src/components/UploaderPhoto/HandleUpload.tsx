import React from "react";
import UploaderPhoto from "./UploaderPhoto";

const HandleUpload: React.FC = () => {
  const handleUpload = (file: File) => {
    // Имитация отправки файла на сервер
    console.log("Файл успешно загружен на сервер:", file.name);
    // Дополнительные действия после успешной загрузки
  };

  return (
    <div style={{ marginLeft: "50px" }}>
      <h2>Створення профілю</h2>
      <UploaderPhoto onUpload={handleUpload} />
    </div>
  );
};

export default HandleUpload;
