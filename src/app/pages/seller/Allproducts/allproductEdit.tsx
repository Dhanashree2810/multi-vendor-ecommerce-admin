// pages/edit-product.tsx
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function EditProduct() {
  return (
    <div className="min-h-screen bg-[#EFEFEF] p-8 ">
      <div className="max-w-7xl mx-auto bg-white  dark-light  text-black p-6 rounded-md shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Product</h1>
          <Button variant="secondary " className='bg-[#0097A7]  text-white'>All Products</Button>
        </div>

        <form className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Product Name</label>
              <Input placeholder="Women Regular Fit Black Trousers" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Category</label>
              <Input placeholder="Women" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Price</label>
              <Input placeholder="1999" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Description</label>
              <Textarea placeholder="Add description here..." />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Product Brand</label>
              <Input placeholder="FashionWear" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Product Stock</label>
              <Input placeholder="20" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Discount</label>
              <Input placeholder="5%" />
            </div>
          </div>
        </form>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block font-semibold">Image Preview</label>
            <img
              src="/product-image.jpg"
              alt="Product"
              className="w-full h-48 object-cover rounded-md border border-gray-300"
            />
          </div>
          <div>
            <img
              src="/product-large.jpg"
              alt="Large Product Preview"
              className="w-full h-64 object-cover rounded-md border border-gray-300"
            />
          </div>
        </div>

        <div className="mt-8 text-right">
          <Button variant="primary" className="bg-[#0097A7] text-white  hover:bg-red-600">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
