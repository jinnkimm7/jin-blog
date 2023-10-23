interface PaginationProps {
  postLength: number;
  postsPerPage: number;
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
}

function Pagination({
  postLength,
  postsPerPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const totalPages = Math.ceil(postLength / postsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mt-10 flex justify-center">
      <ul>
        {pageNumbers.map(number => (
          <li key={number} className="inline-block mx-1">
            <button
              type="button"
              onClick={() => {
                handlePageClick(number);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              // eslint-disable-next-line prettier/prettier
              className={`px-3 py-1 rounded-[50%] ${currentPage === number ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-700"} hover:bg-blue-300 hover:text-white`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
