"use client";

import React, { useState } from "react";
import Image from "next/image";

const AddBanner = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleAddBanner = () => {
    if (selectedImage) {
      alert("Banner Added Successfully!");
    } else {
      alert("Please select an image!");
    }
  };

  return (
    <div className="flex flex-col items-center bg-[#EFEFEF] min-h-screen">
      <div className="w-full max-w-4xl p-8 bg-white dark-light  rounded-lg mt-10 shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">Add Banner</h1>
        <div className="flex flex-col items-center bg-[#EFEFEF] p-6 rounded-md border-dashed border-2 border-black relative">
          {!selectedImage ? (
            <label
              htmlFor="fileInput"
              className="flex flex-col items-center justify-center cursor-pointer text-black"
            >
              <Image
                src="/images/image-placeholder.svg"
                alt="Select Banner Image"
                width={50}
                height={50}
                className="mb-4"
              />
              {/* <span>Select Banner Image</span> */}
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          ) : (
            <div className="relative w-full max-w-sm h-48">
              <Image
                src={URL.createObjectURL(selectedImage)}
                alt="Selected Banner"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          )}
        </div>
        <button
          onClick={handleAddBanner}
          className="mt-6 hover:bg-red-600 bg-[#0097A7]  text-white py-2 px-6 rounded-md"
        >
          Add Banner
        </button>
      </div>
    </div>
  );
};

export default AddBanner;
