import React, { useMemo } from 'react';
import { Card, Row, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { productsPurchased } from '../store/cart';

export default function Confirmation() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartProducts = useSelector(state => state.cart.products);

    const { totalProducts, totalPrice } = useMemo(() => {
        const totalProducts = cartProducts.reduce((acc, product) => acc + product.quantity, 0);

        const totalPrice = cartProducts.reduce((acc, product) => {
            const price = product.discountedPrice || product.price;
            return acc + (price * product.quantity);
        }, 0).toFixed(2);

        return { totalProducts, totalPrice };
    }, [cartProducts]);

    const handleConfirm = () => {
        dispatch(productsPurchased());
        navigate('/');
    };

    return (
        <Card
            className="w-75 rounded-full border-0"
            style={{ margin: 'auto', background: '#f3f3f3' }}
        >
            <Card.Body className="p-3 p-lg-5">
                <Card.Title>Confirmation</Card.Title>
                <Row className="py-2 m-0">You have selected {totalProducts} products</Row>
                <Row className="py-2 m-0">Total price to pay: ${totalPrice}</Row>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={handleConfirm}
                >
                    Confirm
                </Button>
            </Card.Body>
        </Card>
    );
}
