import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const mockSellerData = {
    name: "FlashFusion Finds",
    email: "flashfusion@gmail.com",
    status: "active",
    role: "seller",
    payment: "Paid",
    shopInfo: {
        shopName: "Top Sellers",
        division: "Retail",
        district: "Mumbai",
        sub_district: "Andheri East",
    },
};

const SellerDetails = (sellerId: any) => {
    const [seller, setSeller] = useState<any>(mockSellerData);
    const [status, setStatus] = useState<string>("");
    const [loading, setLoading] = useState(true);

    const fetchSellerDetails = async () => {
        try {
            const res = await fetch(`/api/seller/${sellerId}`);
            const data = await res.json();
            setSeller(data);
            setStatus(data?.status);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch seller details.",
                action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        if (sellerId) {
            fetchSellerDetails();
        }
    }, [sellerId]);

    const submitStatusUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/seller/${sellerId}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });

            if (res.ok) {
                toast({
                    title: "Success",
                    description: "Seller status updated.",
                    action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
                });
                fetchSellerDetails();
            } else {
                toast({
                    title: "Error",
                    description: "Failed to update status.",
                    action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An error occurred.",
                action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
            });
        }
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Seller Details</h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <Card className="p-5 bg-gray-100 rounded-lg shadow-md">
                    <div className=" grid grid-cols-1 lg:grid-cols-3 ">
                        <div className='flex flex-col justify-center items-center py-3'>
                            <div>
                                {
                                    seller?.image ? <img className='w-full h-[230px]' src="http://localhost:3000/images/demo.jpg" alt="" /> :
                                        <span>Image Not Uploaded </span>
                                }
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <h2 className="font-bold text-lg mb-2">Basic Info</h2>
                            <div>
                                <p><strong>Name:</strong> {seller?.name}</p>
                                <p><strong>Email:</strong> {seller?.email}</p>
                                <p><strong>Role:</strong> {seller?.role}</p>
                                <p><strong>Status:</strong> {seller?.status}</p>
                                <p><strong>Payment Status:</strong> {seller?.payment}</p>
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <h2 className="font-bold mt-4 text-lg mb-2">Address</h2>
                            <div>
                                <p><strong>Shop Name:</strong> {seller?.shopInfo?.shopName}</p>
                                <p><strong>Division:</strong> {seller?.shopInfo?.division}</p>
                                <p><strong>District:</strong> {seller?.shopInfo?.district}</p>
                                <p><strong>State:</strong> {seller?.shopInfo?.sub_district}</p>
                            </div>
                        </div>
                    </div>

                    <div className=" grid grid-cols-1 lg:grid-cols-3">
                        <form onSubmit={submitStatusUpdate} className="mt-4">
                            <div className="flex gap-4 mt-3">
                                <Select
                                    value={status}
                                    onValueChange={(value) => setStatus(value)}
                                >
                                    <SelectTrigger className="bg-gray-200 text-black rounded-md">
                                        <SelectValue placeholder="-- Select Status --" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="deactive">Deactive</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button type="submit" className="bg-red-500">
                                    Submit Status
                                </Button>
                            </div>
                        </form>
                    </div>
                </Card>
            )
            }
        </div >
    );
};

export default SellerDetails;
