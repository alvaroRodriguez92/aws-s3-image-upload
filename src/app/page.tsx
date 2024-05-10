"use client";

import Image from "next/image";
import { useState } from "react";
import { getURL } from "./lib/utils";

export default function CreatePostForm() {
  const [content, setContent] = useState();
  const [urlFile, setUrlFile] = useState();

  function handleChange(e) {
    const file = e.target.files[0];
    setContent(file);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content) {
      const url = URL.createObjectURL(content);
      setUrlFile(url);
      const URLResult = await getURL();
      const URLResponse = URLResult.success.url;
      await fetch(URLResponse, {
        method: "PUT",
        body: content,
        headers: { "Content-Type": content.type },
      });
      console.log(URLResponse);
    } else {
      alert("PERO K ASEE");
    }

    // Do all the image upload and everything
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <form className="flex flex-col gap-5">
        <input type="file" onChange={(e) => handleChange(e)} />
        <button
          onClick={(e) => handleSubmit(e)}
          className="rounded bg-red-300"
          type="submit"
        >
          SUBMIT
        </button>
      </form>
      {urlFile ? <img src={urlFile} /> : <h4>Esperando subida de imagen</h4>}
    </div>
  );
}
