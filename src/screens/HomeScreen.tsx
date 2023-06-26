import { Row, Col } from 'react-bootstrap';
import React, { ReactElement } from 'react';

import { ProductInterface } from '../types/ProductInterface';
import ProductItem from '../components/ProductItem';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const HomeScreen = (): ReactElement => {
    const { data: products, error, isLoading } = useGetProductsQuery();

    const renderProducts = (): ReactElement => {
        return error ? (
            <div>Something went wrong!</div>
        ) : isLoading ? (
            <h2>Loading...</h2>
        ) : (
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
