import React from 'react';
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

interface PaginationProps {
    pageNumber: number;
    setPageNumber: (page: number) => void;
    totalItem: number;
    parPage: number;
    showItem: number;
}

const Pagination  = ({ pageNumber, setPageNumber, totalItem, parPage, showItem }:PaginationProps) => {
    const totalPage = Math.ceil(totalItem / parPage);
    let startPage = pageNumber;
    const difference = totalPage - pageNumber;

    if (difference <= showItem) {
        startPage = totalPage - showItem;
    }

    const endPage = startPage < 0 ? showItem : showItem + startPage;
    if (startPage <= 0) {
        startPage = 1;
    }

    const createButtons = () => {
        const buttons = [];
        for (let i = startPage; i < endPage; i++) {
            buttons.push(
                <li
                    key={i}
                    onClick={() => setPageNumber(i)}
                    className={`${
                        pageNumber === i
                            ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/50'
                            : 'bg-gray-600 text-gray-300 hover:bg-indigo-400 hover:text-white shadow hover:shadow-indigo-500/50'
                    } w-8 h-8 rounded-full flex justify-center items-center cursor-pointer`}
                >
                    {i}
                </li>
            );
        }
        return buttons;
    };

    return (
        <ul className="flex gap-3">
            {pageNumber > 1 && (
                <li
                    onClick={() => setPageNumber(pageNumber - 1)}
                    className="w-8 h-8 rounded-full flex justify-center items-center bg-gray-300 text-black cursor-pointer"
                >
                    <MdOutlineKeyboardDoubleArrowLeft />
                </li>
            )}
            {createButtons()}
            {pageNumber < totalPage && (
                <li
                    onClick={() => setPageNumber(pageNumber + 1)}
                    className="w-8 h-8 rounded-full flex justify-center items-center bg-gray-300 text-black cursor-pointer"
                >
                    <MdOutlineKeyboardDoubleArrowRight />
                </li>
            )}
        </ul>
    );
};

export default Pagination;
