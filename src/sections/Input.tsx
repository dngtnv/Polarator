"use client";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Input = () => {
  const router = useRouter();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const imageUrl = URL.createObjectURL(file);
        router.push(`/upload?image=${encodeURIComponent(imageUrl)}`);
      }
    },
    [router],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png"] },
    maxFiles: 1,
  });
  return (
    <section>
      <div className="py-12">
        <div className="container">
          <div className="mx-auto max-w-lg">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <div className="mx-auto h-60 w-[90%] border-spacing-2 rounded-lg border-4 border-dashed border-black bg-gray-300/35 md:w-full">
                  <div className="flex h-full flex-col items-center justify-center">
                    <span className="mt-2 text-gray-400">
                      Or drag and drop here
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mx-auto h-60 w-[90%] border-spacing-2 rounded-lg border-4 border-dashed border-black md:w-full">
                  <div className="flex h-full flex-col items-center justify-center">
                    <span className="cursor-pointer rounded-3xl border-4 border-black bg-[#bae6ff] px-3 py-2 font-semibold">
                      Click to choose a file
                    </span>
                  </div>
                </div>
              )}
            </div>
            <p className="mt-2 text-center text-sm md:text-base">
              (Only *.jpeg and *.png images will be accepted)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Input;
