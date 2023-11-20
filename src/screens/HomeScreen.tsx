import { Row, Col } from 'react-bootstrap';
import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import { ProductInterface } from '../types/ProductInterface';
import ProductItem from '../components/ProductItem';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import MessageAlert from '../components/MessageAlert';
import PaginateList from '../components/PaginateList';

const HomeScreen = (): ReactElement => {
    const { pageNumber } = useParams();

    const {
        data: { products, page, pages } = {},
        error,
        isLoading,
    } = useGetProductsQuery({ pageNumber });

    const renderProducts = (): ReactElement => {
        return error ? (
            <MessageAlert variant="danger">Something went wrong!</MessageAlert>
        ) : isLoading ? (
            <LoadingSpinner />
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
            <PaginateList page={page} pages={pages} />
        </div>
    );
};

export default HomeScreen;
