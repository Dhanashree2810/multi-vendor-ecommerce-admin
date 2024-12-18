'use client'
import { useState, useEffect } from 'react';
import { FaEye } from "react-icons/fa";
import Pagination from '@/components/custom/Pagination';
import Search from '@/components/custom/Search';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Seller {
  _id: string;
  name: string;
  email: string;
  payment: string;
  status: string;
}

const SellerRequest = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [parPage, setParPage] = useState(5);
  const [searchValue, setSearchValue] = useState('');

  const fetchSellers = async () => {
    try {
      const response = await fetch(
        `/api/sellerRequests?page=${currentPage}&parPage=${parPage}&search=${searchValue}`
      );
      const data = await response.json();
      setSellers(data.sellers);
    } catch (error) {
      console.error('Failed to fetch sellers', error);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, [currentPage, parPage, searchValue]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[20px] font-bold mb-3">Seller Request</h1>

      <div className="w-full p-4 bg-[#FFF7E6] rounded-md">
        <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />

        <div className="relative overflow-x-auto">
          <Table className="w-full text-sm text-left text-[#d0d2d6]">
            <TableHeader className="text-sm uppercase border-b border-slate-700">
              <TableRow>
                <TableHead scope="col" className="py-3 px-4  text-[#4B5563]">No</TableHead>
                <TableHead scope="col" className="py-3 px-4  text-[#4B5563]">Name</TableHead>
                <TableHead scope="col" className="py-3 px-4  text-[#4B5563]">Email</TableHead>
                <TableHead scope="col" className="py-3 px-4  text-[#4B5563]">Payment Status</TableHead>
                <TableHead scope="col" className="py-3 px-4  text-[#4B5563]">Status</TableHead>
                <TableHead scope="col" className="py-3 px-4  text-[#4B5563]">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sellers.map((d, i) => (
                <TableRow key={d._id} className="border-b border-slate-700">
                  <TableCell scope="row" className="py-2 px-4 font-medium whitespace-nowrap">{i + 1}</TableCell>
                  <TableCell scope="row" className="py-2 px-4 font-medium whitespace-nowrap">{d.name}</TableCell>
                  <TableCell scope="row" className="py-2 px-4 font-medium whitespace-nowrap">{d.email}</TableCell>
                  <TableCell scope="row" className="py-2 px-4 font-medium whitespace-nowrap">
                    <span>{d.payment}</span>
                  </TableCell>
                  <TableCell scope="row" className="py-2 px-4 font-medium whitespace-nowrap">
                    <span>{d.status}</span>
                  </TableCell>

                  <TableCell scope="row" className="py-2 px-4 font-medium whitespace-nowrap">
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        href={`/admin/dashboard/seller/details/${d._id}`}
                        className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                      >
                        <FaEye />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}  // Ideally, replace this with a dynamic total count
            parPage={parPage}
            showItem={3}
          />
        </div>

      </div>
    </div>
  );
};

export default SellerRequest;
