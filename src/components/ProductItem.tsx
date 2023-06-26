import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { ProductInterface } from '../types/ProductInterface';
import { ReactElement } from 'react';
import VisualRating from './VisualRating';

type ProductItemProps = {
    product: ProductInterface,
};

const ProductItem = ({ product }: ProductItemProps): ReactElement => {
    return (
        <Card className="product-item my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant="top" />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <VisualRating value={product.rating} text={`${product.numReviews} reviews`} />
                <Card.Text as="h3">
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ProductItem;
