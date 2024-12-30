"use client";

import AddCategory from '@/app/pages/admin/Categorys/addcategorys';
import { useParams } from 'next/navigation';

export default function Page() {
  const { sellerId } = useParams();

  return (
    <div>
      <AddCategory sellerId={sellerId} />
    </div>
  );
}
