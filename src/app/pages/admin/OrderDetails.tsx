'use client'
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import productimg from '@/assets/images/productimg.jpg'


interface Order {
    id: string;
    date: string;
    delivery_status: string;
    payment_status: string;
    price: number;
    shippingInfo: {
        name: string;
        address: string;
        province: string;
        city: string;
        area: string;
    };
    products: Array<{
        images: string;
        name: string;
        brand: string;
        quantity: number;
    }>;
    suborder: Array<{
        delivery_status: string;
        products: Array<{
            images: string;
            name: string;
            brand: string;
            quantity: number;
        }>;
    }>;
}

export default function OrderDetails(orderId: any) {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const id = orderId;
    fetchOrderDetails(id);
  }, []);

  const handleStatusChange = (value:string) => {
    console.log("Selected value:", value);
  };

  const fetchOrderDetails = async (id: string) => {
    try {
      const data:Order = {
        id: "675d166ac12e898f62dda26b", 
        date: "December 14, 2024 10:53 AM",
        delivery_status: "cancelled",
        payment_status: "unpaid",
        price: 292,
        shippingInfo: {
          name: "Supriya",
          address: "NashikVelit voluptatem obNashikNashik",
          province: "",
          city: "",
          area: ""
        },
        products: [
          {
            images:productimg.src,
            name: "Women Chanderi Kurta Pant Dupatta Set",
            brand: "DISHWA FASHION",
            quantity: 1
          }
        ],
        suborder: [
          {
            delivery_status: "cancelled",
            products: [
              {
                images: productimg.src,
                name: "Women Chanderi Kurta Pant Dupatta Set",
                brand: "DISHWA FASHION",
                quantity: 1
              }
            ]
          }
        ]
      };
      setOrder(data);
    } catch (error) {
      console.error("Error fetching order details:", error);
      // Add your error handling logic here
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <Card className="bg-white border-none shadow-none text-black max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl">Order Details</h2>
          <Select  defaultValue="cancelled" onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full sm:w-32 bg-[#EFEFEF] text-black border-none">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="warehouse">Warehouse</SelectItem>
              <SelectItem value="placed">Placed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between">
            <p className="text-lg font-semibold">#{order?.id}</p>
            <p className="text-sm">{order?.date}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-1">Deliver To: {order?.shippingInfo?.name}</h3>
            <p className="text-sm">
              {order?.shippingInfo?.address}, {order?.shippingInfo?.province},{' '}
              {order?.shippingInfo?.city}, {order?.shippingInfo?.area}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold">Payment Status:</h2>
              <span className="text-sm">{order?.payment_status}</span>
            </div>
            <div>
              <span className="font-semibold">Price: </span>
              <span className="text-sm">₹{order?.price}</span>
            </div>
          </div>

          <div className="bg-[#EFEFEF] p-4 rounded-lg">
            {order?.products?.map((product, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-4 items-center sm:items-start mb-4 last:mb-0">
                <img
                  src={product.images}
                  alt={product.name}
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div>
                  <h2 className="font-semibold text-center sm:text-left">{product.name}</h2>
                  <p className="text-sm">
                    <span>Brand: {product.brand}</span>
                  </p>
                  <p className="text-sm">
                    <span>Quantity: {product.quantity}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {order?.suborder?.map((sub, i) => (
              <div key={i} className="bg-[#EFEFEF] p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">Seller {i + 1} Order:</h2>
                  <span className="text-sm">{sub.delivery_status}</span>
                </div>
                {sub.products.map((product, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row gap-4 items-center sm:items-start mb-4 last:mb-0"
                  >
                    <img
                      src={product.images}
                      alt={product.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                      <h2 className="font-semibold text-center sm:text-left">{product.name}</h2>
                      <p className="text-sm">
                        <span>Brand: {product.brand}</span>
                      </p>
                      <p className="text-sm">
                        <span>Quantity: {product.quantity}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

