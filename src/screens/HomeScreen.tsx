import { Row, Col } from 'react-bootstrap';
import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';

// import data from '../products';
import { ProductInterface } from '../types/ProductInterface';
import ProductItem from '../components/ProductItem';

const HomeScreen = (): ReactElement => {
    const [products, setProducts]
        = useState<ProductInterface[]>([]);

    useEffect(() => {
        axios.get('/api/products')
            .then((res) => {
                setProducts(res.data);
            });
    }, []);

    const renderProducts = (): ReactElement => {
        return (
            <Row>
                {products?.map((product: ProductInterface) => (
                    <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                        <ProductItem product={product} />
                    </Col>))}
            </Row>
        );
    };

    return (
        <div className="home-screen">
            <h1>Latest products</h1>
            {renderProducts()}
        </div>
    );
};

export default HomeScreen;
