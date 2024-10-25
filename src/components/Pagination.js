import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (pageNumber) => {
        onPageChange(pageNumber);
    };

    return (
        <Pagination className="justify-content-center mt-4">
            <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => handlePageChange(i + 1)}
                >
                    {i + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            />
        </Pagination>
    );
};

export default CustomPagination;
