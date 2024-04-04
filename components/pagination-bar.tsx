import { useState } from "react";

export default function PaginationL({
  Map,
  current,
  totalPages,
  handlePreviousPage,
  handleNextPage,
  
}) {
  console.log('pagination');
  return (
    <>
      <Pagination
        table={Map}
        current={current}
        totalPages={totalPages}
       handleNextPage={handleNextPage}
       handlePreviousPage={handlePreviousPage}
      />
    </>
  );
}

function Pagination({
  table,
  current,
  totalPages,
  handleNextPage,
  handlePreviousPage,
  
}) {
  // const [currentPage, setCurrentPage] = useState(current);
  const totalCount = table.length;
  // const totalPages = totalCount;
  console.log({totalCount})
  console.log({totalPages})
  return (
    <div className="flex items-center justify-center gap-5 mt-3">
      <div className="text-sm text-gray-800 cursor-pointer hover:text-gray-500" onClick={handlePreviousPage}>
        Previous
      </div>
      <div className="flex justify-center gap-3 text-gray-700 ">
        {<div className="flex items-center justify-center w-8 h-8 text-white bg-blue-600 rounded-md"> {current}</div>}
        {<div> - </div>}
        {<div className="flex items-center justify-center w-8 h-8 text-black bg-gray-200 rounded-md">{totalPages}</div>}
      </div>

      <div className="text-sm text-gray-800 cursor-pointer hover:text-gray-500" onClick={handleNextPage}>
        Next
      </div>
    </div>
  );
}
