"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Input = () => {
  const onDrop = useCallback((acceptedFiles) => {
    return;
  }, []);
  const { getRootProps, acceptedFiles, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: { "image/*": [".jpeg", ".png"] },
    });
  const selectedFile = acceptedFiles[0];
  console.log(selectedFile);
  return (
    <section>
      <div className="py-12">
        <div className="container">
          <div className="mx-auto max-w-lg">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <div className="h-60 w-full border-spacing-2 rounded-lg border-4 border-dashed border-black bg-gray-300/35">
                  <div className="flex h-full flex-col items-center justify-center">
                    <span className="mt-2 text-gray-400">
                      Or drag and drop here
                    </span>
                  </div>
                </div>
              ) : (
                <div className="h-60 w-full border-spacing-2 rounded-lg border-4 border-dashed border-black">
                  <div className="flex h-full flex-col items-center justify-center">
                    <span className="cursor-pointer rounded-3xl border-4 border-black bg-[#bae6ff] px-3 py-2 font-semibold">
                      Click to choose a file
                    </span>
                  </div>
                </div>
              )}
            </div>
            <p className="mt-2 text-center">
              (Only *.jpeg and *.png images will be accepted)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Input;
