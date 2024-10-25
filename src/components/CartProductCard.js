import React from 'react';
import { Col, Row, Image, InputGroup, Button, Form } from 'react-bootstrap';

const CartProductCard = ({ product, handleUpdateQuantity, handleRemove, handleShowModal }) => {
    return (
        <Row className="py-2 m-0">
            <Col md={1} xs={6}>
                <Image
                    style={{ maxHeight: '6rem' }}
                    className="d-block mx-auto"
                    src={product.image}
                    fluid
                    rounded
                />
            </Col>
            <Col className="d-flex flex-column justify-content-center" md={3} xs={6}>
                <h6 className="mb-0">{product.name}</h6>
                <small style={{ fontSize: '0.7rem' }}>
                    <span className="text-black-50 my-2">Product Code:</span>
                    <span style={{ fontWeight: '500' }}>{product.id}</span>
                </small>
            </Col>
            {product.appliedVoucher ? (
                <Col className="d-flex justify-content-center align-items-center" md={2} xs={6}>
                    <h6 className="mb-0 me-2 text-danger">${(product.discountedPrice * product.quantity).toFixed(2)}</h6>
                    <h6 className="mb-0 text-black-50"><strike>{(product.price * product.quantity).toFixed(2)}</strike></h6>
                </Col>
            ) : (
              <Col className="d-flex justify-content-center align-items-center" md={2} xs={6}>
                  <h6 className="mb-0">${(product.price * product.quantity).toFixed(2)}</h6>
              </Col>
            )}
            
            <Col className="d-flex justify-content-center align-items-center py-2" md={2} xs={6}>
                <InputGroup size="sm" style={{ width: '5rem' }}>
                    <Button
                        variant="outline-secondary"
                        onClick={() => handleUpdateQuantity(product.quantity + 1)}
                    >
                        <i className="fa fa-plus"></i>
                    </Button>
                    <Form.Control
                        size="sm"
                        className="border-secondary text-center px-0"
                        value={product.quantity}
                        onChange={(e) => handleUpdateQuantity(Number(e.target.value))}
                    />
                    <Button
                        variant="outline-secondary"
                        disabled={product.quantity === 1}
                        onClick={() => handleUpdateQuantity(product.quantity - 1)}
                    >
                        <i className="fa fa-minus"></i>
                    </Button>
                </InputGroup>
            </Col>
            <Col
                className="d-flex justify-content-center align-items-center"
                md={2}
                xs={6}
            >
                {product.vouchers.length > 0 && <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleShowModal}
                >
                    Apply Coupon
                </Button>}
            </Col>

            <Col className="d-flex justify-content-center align-items-center" md={2} xs={6}>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={handleRemove}
                >
                    Remove
                </Button>
            </Col>
        </Row>
    );
};

export default CartProductCard;
