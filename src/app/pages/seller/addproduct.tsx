"use client"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
    <Card className="w-full p-4 bg-[#6a5fdf] rounded-md">
      <CardHeader className="flex justify-between items-center pb-4">
        <h1 className="text-[#d0d2d6] text-xl font-semibold">Add Product</h1>
        <a className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2" href="/seller/dashboard/products">
          All Products
        </a>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
            <div className="flex flex-col w-full gap-1">
              <Label htmlFor="name">Product Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
                value={productData.name}
                onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <Label htmlFor="brand">Product Brand</Label>
              <Input
                type="text"
                name="brand"
                id="brand"
                placeholder="Brand Name"
                value={productData.brand}
                onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
              />
            </div>
          </div>
          <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
            <div className="flex flex-col w-full gap-1 relative">
              <Label htmlFor="category">Category</Label>
              <Input
                readOnly
                type="text"
                id="category"
                placeholder="--select category--"
                value={productData.category}
                onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
              />
              {/* Implement dropdown functionality here */}
            </div>
            <div className="flex flex-col w-full gap-1">
              <Label htmlFor="stock">Product Stock</Label>
              <Input
                type="text"
                name="stock"
                id="stock"
                placeholder="Stock"
                value={productData.stock}
                onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
              />
            </div>
          </div>
          <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
            <div className="flex flex-col w-full gap-1">
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                placeholder="Price"
                value={productData.price}
                onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <Label htmlFor="discount">Discount</Label>
              <Input
                type="number"
                name="discount"
                id="discount"
                placeholder="Discount by %"
                value={productData.discount}
                onChange={(e) => setProductData({ ...productData, discount: e.target.value })}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-1 mb-5">
            <Label htmlFor="description" className="text-[#d0d2d6]">Description</Label>
            <Textarea
              name="description"
              id="description"
              placeholder="Description"
              value={productData.description}
              onChange={(e) => setProductData({ ...productData, description: e.target.value })}
              className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
              rows={4}
            />
          </div>
          <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
            <label className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-red-500 w-full text-[#d0d2d6]" htmlFor="image">
              <span>
                {/* Image Icon */}
              </span>
              <span>Select Image</span>
            </label>
            <input
              className="hidden"
              multiple
              type="file"
              id="image"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex">
            <Button type="submit" className="bg-red-500 w-[280px] hover:shadow-red-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
              Add Product
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddProduct;
