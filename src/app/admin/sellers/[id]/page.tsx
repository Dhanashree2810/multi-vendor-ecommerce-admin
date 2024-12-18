"use client";

import SellerDetails from '@/app/pages/admin/SellerDetails';
import { useParams } from 'next/navigation';

export default function Page() {
  const { sellerId } = useParams();

  return (
    <div>
      <SellerDetails sellerId={sellerId} />
    </div>
  );
}
