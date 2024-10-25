import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import { fetchProducts } from '../store/product'
import { addProduct } from '../store/cart';
import ProductCard from '../components/ProductCard';
import CustomPagination from '../components/Pagination';

export default function Products() {
    const productsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const { products, loading, error } = useSelector((state) => state.products);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = useMemo(() => products.slice(indexOfFirstProduct, indexOfLastProduct), [products, indexOfFirstProduct, indexOfLastProduct]);
    const totalPages = useMemo(() => Math.ceil(products.length / productsPerPage), [products]);

    const handleAddToCart = useCallback((product, quantity) => {
        dispatch(addProduct({ ...product, quantity }));
    }, [dispatch]);

    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <>
            <ListGroup as="ol" className="w-75 mx-auto">
                {currentProducts.map(product => (
                    <ListGroup.Item as="li" className="p-3" key={product.id}>
                        <ProductCard product={product} onAddToCart={handleAddToCart} />
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </>
    );
}
