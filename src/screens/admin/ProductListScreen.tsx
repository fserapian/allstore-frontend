import { ReactElement } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';

import {
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
} from '../../slices/productsApiSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import MessageAlert from '../../components/MessageAlert';
import { ProductInterface } from '../../types/ProductInterface';

const ProductListScreen = (): ReactElement => {
    const {
        data: { products } = {},
        isLoading: loadingProduct,
        error: errorGetProduct,
        refetch: refetchProducts,
    } = useGetProductsQuery();

    const [
        createProduct,
        { isLoading: loadingCreateProduct, error: errorCreateProduct },
    ] = useCreateProductMutation();

    const [deleteProduct, { isLoading: loadingDeleteProduct }] = useDeleteProductMutation();

    const handleDeleteProduct = async (productId: string) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteProduct(productId);
                refetchProducts();
                toast.success('Product deleted');
            } catch (err) {
                toast.error('Cannot delete product');
            }
        }
    };

    const handleCreateProduct = async () => {
        if (window.confirm('Are you sure')) {
            try {
                await createProduct();
                refetchProducts();
                toast.success('Product created');
            } catch (err) {
                toast.error('Cannot create product');
            }
        }
    };

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-end">
                    <Button className="btn-sm m-3" variant="dark" onClick={handleCreateProduct}>
                        <FaEdit /> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingCreateProduct && <LoadingSpinner />}
            {loadingDeleteProduct && <LoadingSpinner />}
            {errorCreateProduct && <MessageAlert variant="danger">Cannot create product</MessageAlert>}
            {loadingProduct ? (
                <LoadingSpinner />
            ) : errorGetProduct ? (
                <MessageAlert variant="danger">Error loading products</MessageAlert>
            ) : (
                <Table striped hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product: ProductInterface) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button className="btn-sm mx-2" variant="dark">
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        className="btn-sm mx-2"
                                        variant="danger"
                                        onClick={() => handleDeleteProduct(product._id)}
                                    >
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default ProductListScreen;
