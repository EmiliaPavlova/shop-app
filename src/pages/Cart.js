import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Form, Button, Container, ListGroup, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { removeProduct, updateQuantity, applyVoucher } from '../store/cart';
import CartProductCard from '../components/CartProductCard';
import BillingForm from '../components/BillingForm';

export default function Cart() {
    const [modalData, setModalData] = useState({ show: false, currentProduct: null });
    const [voucherCode, setVoucherCode] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        address: '',
        zip: '',
    });
    const [errors, setErrors] = useState({});
    const cartProducts = useSelector(state => state.cart.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleModalClose = () => setModalData({ show: false, currentProduct: null });
    const handleModalShow = (product) => setModalData({ show: true, currentProduct: product });

    const handleRemove = (productId) => dispatch(removeProduct(productId));

    const handleUpdateQuantity = (id, quantity) => dispatch(updateQuantity({ id, quantity }));

    const handleApplyVoucher = () => {
        if (modalData.currentProduct) {
            dispatch(applyVoucher({ id: modalData.currentProduct.id, voucherCode }));
            handleModalClose();
        }
    };

    const validatePhone = (phone) => {
        // Regex pattern for : +X XX XXX XX
        const phonePattern = /^\+\d{1,2} \d{1,2} \d{3} \d{2}$/;
        return phonePattern.test(phone);
    };

    const validateForm = (formData) => {
        const newErrors = {};
        for (const field in formData) {
            if (!formData[field]) {
                newErrors[field] = 'This field is required';
            }
        }
        if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Phone must be in the format: +X XX XXX XX';
        }
        return newErrors;
    };

    const handleInputChange = ({ target: { name, value } }) => {
        const updatedFormData = {
            ...formData,
            [name]: value,
        };
        setFormData(updatedFormData);

        const newErrors = validateForm(updatedFormData);
        setErrors(newErrors);
    };

    const handleNextClick = () => {
        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            navigate('/confirmation');
        }
    };

    const isFormValid = Object.keys(errors).length === 0 && Object.values(formData).every(value => value);

    return (
        <>
            <Card
                className="w-75 rounded-full border-0"
                style={{ margin: 'auto', background: '#f3f3f3' }}
            >
                <Card.Body className="p-3 p-lg-5">
                    <Card.Title>Shopping cart</Card.Title>

                    <ListGroup as="ol" style={{ marginTop: '1rem' }}>
                        {cartProducts.length === 0 ? (
                            <ListGroup.Item className="text-center">
                                Your cart is empty
                            </ListGroup.Item>
                        ) : (
                            cartProducts.map(product => (
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start border-0 p-0"
                                    key={product.id}
                                >
                                    <Container fluid="md" className="p-2">
                                        <CartProductCard
                                            key={product.id}
                                            product={product}
                                            handleUpdateQuantity={(newQuantity) => handleUpdateQuantity(product.id, newQuantity)}
                                            handleRemove={() => handleRemove(product.id)}
                                            handleShowModal={() => handleModalShow(product)}
                                        />
                                        <hr className="text-black-50 my-2"></hr>
                                    </Container>
                                </ListGroup.Item>
                            ))
                        )}
                    </ListGroup>
                </Card.Body>

                <Card.Body className="p-lg-5 p-3">
                    <Card.Title>Billing Information</Card.Title>
                    <BillingForm formData={formData} handleInputChange={handleInputChange} errors={errors} />
                </Card.Body>

                <Button
                    className="mx-5 mb-5"
                    variant="primary"
                    type="submit"
                    disabled={!isFormValid}
                    onClick={handleNextClick}
                >
                    Next
                </Button>
            </Card>
            <Modal show={modalData.show} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Coupon</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formVoucherCode">
                        <Form.Control
                            type="text"
                            placeholder="Enter coupon code"
                            value={voucherCode}
                            onChange={(e) => setVoucherCode(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleApplyVoucher}>
                        Apply Coupon
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
