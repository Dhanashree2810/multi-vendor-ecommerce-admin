"use client"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InputText } from "primereact/inputtext";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    category: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    image: null,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setProductData({ ...productData, image: file });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(productData);
  };

  return (
    <Card className="w-full p-4 bg-[#ffffff] rounded-md border  dark-light ">
<CardHeader className="flex items-center pb-4 px-4 bg-[#EFEFEF] border border-gray-300 rounded-md">
  <h1 className="text-[#6F6F6F] text-xl font-semibold ">Add Product</h1>
  <div className="flex-grow">
  <button
    className="bg-[#0097A7] hover:shadow-[#0097A7] hover:shadow-lg text-white rounded-sm px-7 py-2"
    onClick={() => window.location.href = "/seller/dashboard/products"}
  >
    All Products
  </button>
  </div> {/* Spacer to push button to the end */}

</CardHeader>






<CardContent className="p-4   dark-light">
  <form onSubmit={handleSubmit}>
    <div className="flex flex-col mb-3 md:flex-row gap-4 w-full">
      <div className="flex flex-col w-full gap-1">
        <Label htmlFor="name" className="text-black dark:text-white">Product Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={(e) => setProductData({ ...productData, name: e.target.value })}
          className="px-4 py-2 bg-[#f4f4f4] text-gray-700 focus:border-[#0097A7} outline-none   rounded-md "
        />
      </div>
      <div className="flex flex-col w-full gap-1">
        <Label htmlFor="brand" className="text-black dark:text-white">Product Brand</Label>
        <Input
          type="text"
          name="brand"
          id="brand"
          placeholder="Brand Name"
          value={productData.brand}
          onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
          className="px-4 py-2 bg-[#f4f4f4] text-gray-700 focus:border-[#0097A7} outline-none   rounded-md "
        />
      </div>
    </div>
    <div className="flex flex-col mb-3 md:flex-row gap-4 w-full">
      <div className="flex flex-col w-full gap-1 relative">
        <Label htmlFor="category" className="text-black dark:text-white">Category</Label>
        <Input
          readOnly
          type="text"
          id="category"
          placeholder="--select category--"
          value={productData.category}
          onChange={(e) => setProductData({ ...productData, category: e.target.value })}
          className="px-4 py-2 bg-[#f4f4f4] text-gray-700 focus:border-[#0097A7} outline-none   rounded-md "
        />
        {/* Implement dropdown functionality here */}
      </div>
      <div className="flex flex-col w-full gap-1">
        <Label htmlFor="stock" className="text-black dark:text-white">Product Stock</Label>
        <Input
          type="text"
          name="stock"
          id="stock"
          placeholder="Stock"
          value={productData.stock}
          onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
          className="px-4 py-2 bg-[#f4f4f4] text-gray-700 focus:border-[#0097A7} outline-none   rounded-md "
        />
      </div>
    </div>
    <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-black">
      <div className="flex flex-col w-full gap-1">
        <Label htmlFor="price" className="text-black dark:text-white">Price</Label>
        <Input
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          value={productData.price}
          onChange={(e) => setProductData({ ...productData, price: e.target.value })}
          className="px-4 py-2 bg-[#f4f4f4] text-gray-700 focus:border-[#0097A7} outline-none   rounded-md "
        />
      </div>
      <div className="flex flex-col w-full gap-1">
        <Label htmlFor="discount" className="text-black dark:text-white">Discount</Label>
        <Input
          type="number"
          name="discount"
          id="discount"
          placeholder="Discount by %"
          value={productData.discount}
          onChange={(e) => setProductData({ ...productData, discount: e.target.value })}
          className="px-4 py-2 bg-[#f4f4f4] text-gray-700 focus:border-[#0097A7} outline-none   rounded-md "
        />
      </div>
    </div>
    <div className="flex flex-col w-full gap-1 mb-5">
      <Label htmlFor="description" className="text-black dark:text-white">Description</Label>
      <Textarea
        name="description"
        id="description"
        placeholder="Description"
        value={productData.description}
        onChange={(e) => setProductData({ ...productData, description: e.target.value })}
        className="px-4 py-2 bg-[#f4f4f4] text-gray-700 focus:border-[#0097A7} outline-none   rounded-md "
        rows={4}
      />
    </div>
    <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-black mb-4">
      <label className="flex justify-center items-center flex-col h-[180px] dark:border-white cursor-pointer border border-dashed hover:border-[#0097A7] w-full text-black" htmlFor="image">
        <span>
          {/* Image Icon */}
        </span>
        <span className="dark:text-white">Select Image</span>
      </label>
      <input
        className="hidden "
        multiple
        type="file"
        id="image"
        onChange={handleImageChange}
      />
    </div>
    <div className="flex">
      <Button type="submit" className="bg-[#0097A7] w-[280px]  hover:shadow-purple-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
        Add Product
      </Button>
    </div>
  </form>
</CardContent>

    </Card>
  );
};

export default AddProduct;
