import { useState } from "react";

export default function PaginationL({ Map, current, pageSize ,handlePreviousPage ,handleNextPage  }) {
  return (
    <>
      <Pagination table={Map} current={current} pageSize={pageSize}   handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage}/>
    </>
  );
}

function Pagination({ table, current, pageSize , handleNextPage  , handlePreviousPage}) {
  const [currentPage, setCurrentPage] = useState(current);
  const totalCount = table.length;
  const totalPages = totalCount;



  return (
    <div className="flex items-center justify-center gap-5">
      <div className="btn" onClick={handlePreviousPage}>
        Previous
      </div>
      {<div>{current}</div>}
      {<div>/</div>}
      {<div>{totalPages}</div>}

      <div className="btn" onClick={handleNextPage}>
        Next
      </div>
    </div>
  );
}
