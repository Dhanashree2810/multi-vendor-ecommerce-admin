'use client'

import React, { useEffect, useRef, useState } from 'react'
import { FaList } from 'react-icons/fa6'
import { IoMdClose } from "react-icons/io"
import { FaRegFaceGrinHearts } from "react-icons/fa6"
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Types
type Seller = {
  _id: string
  name: string
  image: string
}

type Message = {
  senderId: string
  receiverId: string
  message: string
  senderName: string
}

// Mock data
const mockSellers: Seller[] = [
  { _id: '1', name: 'John Doe', image: '/images/seller1.jpg' },
  { _id: '2', name: 'Jane Smith', image: '/images/seller2.jpg' },
  { _id: '3', name: 'Bob Johnson', image: '/images/seller3.jpg' },
]

const mockMessages: Message[] = [
  { senderId: '1', receiverId: '', message: 'Hello, how can I help you?', senderName: 'John Doe' },
  { senderId: '', receiverId: '1', message: 'I have a question about my order.', senderName: 'Admin Support' },
  { senderId: '1', receiverId: '', message: 'Sure, what would you like to know?', senderName: 'John Doe' },
]

const ChatSeller = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  const { id: sellerId } = useParams() // Get dynamic sellerId from URL
  const [text, setText] = useState('')
  const [sellers, setSellers] = useState<Seller[]>(mockSellers)
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [currentSeller, setCurrentSeller] = useState<Seller | null>(null)

  useEffect(() => {
    if (sellerId) {
      const seller = sellers.find(s => s._id === sellerId)
      setCurrentSeller(seller || null)
    } else {
      setCurrentSeller(null)
    }
  }, [sellerId, sellers])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() && sellerId) {
      const newMessage: Message = {
        senderId: '',
        receiverId: sellerId,
        message: text,
        senderName: 'Admin Support'
      }
      setMessages([...messages, newMessage])
      setText('')
    }
  }

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-[#FFF7E6] text-[#4B5563] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <div className={`w-[280px] h-full absolute z-10 ${show ? '-left-[16px]' : '-left-[336px]'} md:left-0 md:relative transition-all`}>
            <div className="w-full h-[calc(100vh-177px)] bg-[#FFF7E6] text-[#4B5563] md:bg-transparent overflow-y-auto">
              <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-[#4B5563]">
                <h2 className='text-[#4B5563]'>Sellers</h2>
                <span onClick={() => setShow(!show)} className="block cursor-pointer md:hidden"><IoMdClose /></span>
              </div>

              {sellers.map((s, i) => (
                <Link key={i} href={`/admin/chatsellers/${s._id}`} className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-md cursor-pointer ${sellerId === s._id ? 'bg-[#FFF7E6]' : ''}`}>
                  <div className="relative">
                    <Image className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full" src={s.image} alt={s.name} width={38} height={38} />
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  </div>
                  <div className="flex justify-center items-start flex-col w-full">
                    <div className="flex justify-between items-center w-full">
                      <h2 className="text-base font-semibold text-[#4B5563]">{s.name}</h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full md:w-[calc(100%-200px)] md:pl-4">
            <div className="flex justify-between items-center">
              {sellerId && currentSeller && (
                <div className="flex justify-start items-center gap-3">
                  <div className="relative">
                    <Image className="w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full" src={currentSeller.image} alt={currentSeller.name} width={45} height={45} />
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  </div>
                  <span className="text-white">{currentSeller.name}</span>
                </div>
              )}

              <div onClick={() => setShow(!show)} className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-blue-500 shadow-lg hover:shadow-blue-500/50 justify-center cursor-pointer items-center text-white">
                <span><FaList /></span>
              </div>
            </div>

            <div className="py-4">
              <div className="bg-gray-700 h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                {sellerId ? messages.map((m, i) => {
                  if (m.senderId === sellerId) {
                    return (
                      <div key={i} ref={scrollRef} className="w-full flex justify-start items-center">
                        <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                          <div>
                            <Image className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]" src="/images/seller1.jpg" alt="Seller" width={38} height={38} />
                          </div>
                          <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-1 px-2 rounded-sm">
                            <span>{m.message}</span>
                          </div>
                        </div>
                      </div>
                    )
                  } else {
                    return (
                      <div key={i} ref={scrollRef} className="w-full flex justify-end items-center">
                        <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                          <div className="flex justify-center items-start flex-col w-full bg-red-500 shadow-lg shadow-red-500/50 text-white py-1 px-2 rounded-sm">
                            <span>{m.message}</span>
                          </div>
                          <div>
                            <Image className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]" src="/images/admin.jpg" alt="Admin" width={38} height={38} />
                          </div>
                        </div>
                      </div>
                    )
                  }
                }) : (
                  <div className="w-full h-full flex justify-center items-center flex-col gap-2 text-white">
                    <span><FaRegFaceGrinHearts /></span>
                    <span>Select Seller</span>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={send} className="flex gap-3">
              <input
                readOnly={!sellerId}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-white"
                type="text"
                placeholder="Input Your Message"
              />
              <button
                disabled={!sellerId}
                className="shadow-lg bg-cyan-500 hover:shadow-cyan-500/50 text-semibold w-[75px] h-[35px] rounded-md text-white flex justify-center items-center"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatSeller
