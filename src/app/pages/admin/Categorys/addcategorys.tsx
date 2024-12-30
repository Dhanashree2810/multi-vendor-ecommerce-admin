import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaImage } from 'react-icons/fa6';
import Image from 'next/image';

export default function AddCategory() {
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formState, setFormState] = useState<{ name: string; image: File | null }>({
    name: '',
    image: null,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      setFormState((prevState) => ({ ...prevState, image: file }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formState);
  };

  const resetForm = () => {
    setFormState({ name: '', image: null });
    setImagePreview('');
  };

  const isEdit = Boolean(formState.image || formState.name); // Example to handle `isEdit`

  return (
    <div className="flex flex-col bg-white rounded-md shadow-md p-4">
      <div className="flex justify-between items-center mb-4 p-2 bg-[#EFEFEF] rounded-md border border-gray-300 shadow-sm">
        <h2 className="text-lg font-semibold text-black text-center">
          {isEdit ? 'Edit Category' : 'Add Category'}
        </h2>
        <Button
          className="lg:hidden text-2xl text-gray-400 hover:text-gray-200"
          onClick={resetForm}
        >
          {/* <IoMdCloseCircle /> */}
        </Button>
      </div>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Category Name */}
        <div className="bg-[#EFEFEF] rounded-md border border-gray-300 shadow-sm p-2">
          <Label htmlFor="name" className="block text-black mb-1 text-[16px]">
            Category Name
          </Label>
          <Input
            id="name"
            type="text"
            value={formState.name}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full px-4 py-2 bg-white text-black rounded-md focus:outline-none"
            placeholder="Category Name"
          />
        </div>

        {/* Image Upload */}
        <div>
          <Label
            htmlFor="image"
            className="flex items-center justify-center border border-dashed border-gray-600 rounded-md h-56 cursor-pointer hover:border-gray-400"
          >
            <div className="flex justify-center items-center">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover rounded-md text-center"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <FaImage size={30} />
                  <p>Select Image</p>
                </div>
              )}
            </div>
          </Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-fit bg-[#0097A7] text-white px-4 py-2 text-[16px] rounded-md"
        >
          {isEdit ? 'Update Category' : 'Add Category'}
        </Button>
      </form>
    </div>
  );
}
