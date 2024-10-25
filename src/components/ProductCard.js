import React from 'react';
import { Col, Row, Image, Button } from 'react-bootstrap';

const ProductCard = React.memo(({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(product, 1);
  };

  return (
    <Row>
      <Col md={2}>
        <Image src={product.image} alt={product.name} fluid rounded />
      </Col>
      <Col md={10} className="d-flex flex-column justify-content-center">
        <h5 className="mt-0 font-weight-bold mb-2">{product.name}</h5>
        <p className="font-italic text-muted mb-0 small mb-3">{product.short_description}</p>
        <div className="d-flex align-items-center justify-content-between mt-1">
          <h6 className="font-weight-bold my-2">${product.price.toFixed(2)}</h6>
          <Button
            variant="outline-primary"
            size="sm"
            style={{ fontSize: '0.7rem' }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </Col>
    </Row>
  );
});

export default ProductCard;
