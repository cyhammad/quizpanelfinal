import React, { useState } from "react";
import { Cell } from "recharts";

export const Pagination = ({ perPage , totalData, paginate, currentPage} ) => {

    const pageNumber = []
 
    const style =  'bg-primary-100 text-secondary-300'

    for(let i = 1 ; i  <= Math.ceil(totalData / perPage) ; i++){
        pageNumber.push(i)
    }

    const prevPage = () => {
        if(currentPage !== 1){
            paginate(currentPage-1)
        }
    }

    const nextPage = () => {
        if(currentPage !== pageNumber.length){
            paginate(currentPage+1)
        }
    }

    // if()
    
    return(
        <nav className="flex flex-row justify-end mr-12 mt-4">
            <ul className="pagination flex flex-row justify-between">
            <div className={` ${currentPage === 1 ? "text-gray-500 cursor-context-menu " : "hover:bg-secondary-300 hover:text-primary-100 prev  cursor-pointer  " }py-2 px-3 ml-3 flex flex-row items-center`}
             onClick={prevPage}
            >
                <svg xmlns="http://www.w3.org/2000/svg" class={` ${currentPage === 1 ? "text-gray-500 " :  "text-secondary-300" } h-4 w-4 mr-2   icon`} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <li>Prev</li>
            </div>
                {pageNumber.map(number => (
                    <li onClick={() => paginate(number)} key={number} className={`cursor-pointer py-2 px-3 ml-3 hover:text-primary-100 hover:bg-secondary-300  hover:transition-colors ${currentPage === number ? style : "" }`}>
                        <a>
                            {number}
                        </a>
                    </li>
                ))}
                <div className={`${currentPage === pageNumber.length ? "text-gray-500 cursor-context-menu " : "hover:bg-secondary-300 hover:text-primary-100 next  cursor-pointer  " } py-2 px-3 ml-3 flex flex-row items-center `} onClick={nextPage}>
                    <li>Next</li>
                    <svg xmlns="http://www.w3.org/2000/svg" class={` ${currentPage === pageNumber.length ? "text-gray-500 " :  "text-secondary-300" } h-4 w-4 mr-2 icon`} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </ul>
        </nav>
    )
}