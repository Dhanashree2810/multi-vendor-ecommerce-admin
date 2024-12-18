'use client'
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const PaymentRequest: React.FC = () => {
  const [paymentId, setPaymentId] = useState<string>('');
  const [pendingWithdrawals, setPendingWithdrawals] = useState<any[]>([]);
  const [loader, setLoader] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Mock API calls for fetching and confirming requests
  useEffect(() => {
    const fetchPaymentRequests = async () => {
      try {
        // Replace with actual API call
        const response = await Promise.resolve([
          { id: '1', amount: 100, status: 'Pending', createdAt: new Date().toISOString() },
          { id: '2', amount: 200, status: 'Pending', createdAt: new Date().toISOString() },
        ]);
        setPendingWithdrawals(response);
      } catch (error) {
        console.error('Failed to fetch payment requests', error);
      }
    };
    fetchPaymentRequests();
  }, []);

  const confirmRequest = async (id: string) => {
    setPaymentId(id);
    setLoader(true);
    try {
      // Replace with actual API call
      await Promise.resolve();
      setSuccessMessage('Payment request confirmed successfully!');
      setPendingWithdrawals(prev => prev.filter(request => request.id !== id));
    } catch (error) {
      setErrorMessage('Failed to confirm payment request.');
    } finally {
      setLoader(false);
      setPaymentId('');
    }
  };

  useEffect(() => {
    if (successMessage) {
      alert(successMessage);
      setSuccessMessage(null);
    }
    if (errorMessage) {
      alert(errorMessage);
      setErrorMessage(null);
    }
  }, [successMessage, errorMessage]);

  const Row = ({ index, style }:{ index: number; style: React.CSSProperties }) => (
    <div style={style} className="flex text-sm text-[#4B5563]  font-medium">
      <div className="w-[20%] p-2">{index + 1}</div>
      <div className="w-[20%] p-2">₹{pendingWithdrawals[index]?.amount}</div>
      <div className="w-[20%] p-2">
        <span className="py-1 px-2 bg-slate-300 text-blue-500 rounded-md text-sm">
          {pendingWithdrawals[index]?.status}
        </span>
      </div>
      <div className="w-[20%] p-2">
        {moment(pendingWithdrawals[index]?.createdAt).format('LL')}
      </div>
      <div className="w-[20%] p-2">
        <Button
          onClick={() => confirmRequest(pendingWithdrawals[index]?.id)}
          disabled={loader && paymentId === pendingWithdrawals[index]?.id}
          className="bg-[#FFF7E6] hover:bg-[#FFF7E6] text-[#4B5563]  text-sm"
        >
          {loader && paymentId === pendingWithdrawals[index]?.id ? 'Loading...' : 'Confirm'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="px-4 sm:px-8 py-5">
      <Card className="w-full bg-[#FFF7E6] rounded-md">
        <CardHeader>
          <h2 className="text-xl font-medium pb-5 text-[#4B5563] ">Withdrawal Request</h2>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <div className="flex bg-[#a7a3de] text-[#4B5563]  uppercase text-xs font-bold min-w-[340px] rounded-md">
              <div className="w-[20%] p-2 text-[#4B5563] ">No</div>
              <div className="w-[20%] p-2 text-[#4B5563] ">Amount</div>
              <div className="w-[20%] p-2 text-[#4B5563] ">Status</div>
              <div className="w-[20%] p-2 text-[#4B5563] ">Date</div>
              <div className="w-[20%] p-2 text-[#4B5563] ">Action</div>
            </div>

            {pendingWithdrawals.length > 0 ? (
              <div className="flex flex-col max-h-[350px] overflow-y-auto text-[#4B5563] ">
                {pendingWithdrawals.map((_, index) => (
                  <Row key={index} index={index} style={{}} />
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-[#4B5563] ">No withdrawal requests found.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentRequest;
