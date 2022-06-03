import React, { useState } from "react";
import Image from "next/image";
export default function ImageInput() {
  const [img, setImg] = useState('');

  const onImageChange = (e: any) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };

  return (
    <div>
      <input type="file" onChange={onImageChange} />
      {img !== '' ? (<Image src={img} alt="" width={500} height={300} />): <></>}
    </div>
  );
}