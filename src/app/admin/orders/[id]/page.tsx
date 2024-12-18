"use client";

import OrderDetails from '@/app/pages/admin/OrderDetails';
import { useParams } from 'next/navigation';

export default function Page() {
  const { orderId } = useParams();

  return (
    <div>
      <OrderDetails orderId={orderId} />
    </div>
  );
}
