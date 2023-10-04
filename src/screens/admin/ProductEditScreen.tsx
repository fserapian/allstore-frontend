import { ReactElement, useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {
    useGetProductDetailsQuery,
    useUpdateProductMutation,
    useUploadProductImageMutation,
} from '../../slices/productsApiSlice';
import FormContainer from '../../components/FormContainer';
import LoadingSpinner from '../../components/LoadingSpinner';
import MessageAlert from '../../components/MessageAlert';

const ProductEditScreen = (): ReactElement => {
    const { id: productId } = useParams();

    const navigate = useNavigate();

    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [countInStock, setCountInStock] = useState<number>(0);
    const [description, setDescription] = useState<string>('');

    const {
        data: product,
        isLoading: loadingProduct,
        error: errorProduct,
        refetch,
    } = useGetProductDetailsQuery(productId);

    const [
        updateProduct,
        { isLoading: loadingUpdateProduct },
    ] = useUpdateProductMutation();

    const [uploadProductImage, { isLoading: loadingUploadImage }] = useUploadProductImageMutation();

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const productData = {
            productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
        };

        try {
            await updateProduct(productData);
            toast.success('Product updated');
            navigate('/admin/product-list');
        } catch (err) {
            toast.error('Cannot update product');
        }
    };

    const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }

        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (err) {
            toast.error('Cannot upload image');
        }
    };

    return (
        <>
            <Link to="/admin/product-list" className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdateProduct && <LoadingSpinner />}
                {loadingProduct ? (
                    <LoadingSpinner />
                ) : errorProduct ? (
                    <MessageAlert variant="danger">Cannot load product</MessageAlert>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name" className="my-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={name}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="price" className="my-2">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                name="price"
                                value={price}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(+e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="image" className="my-2">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter image URL"
                                name="image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            >
                            </Form.Control>
                            <Form.Control
                                type="file"
                                placeholder="Choose file"
                                onChange={handleUploadFile}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="brand" className="my-2">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter brand"
                                name="brand"
                                value={brand}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setBrand(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="countInStock" className="my-2">
                            <Form.Label>Count in stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter count in stock"
                                name="countInStock"
                                value={countInStock}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setCountInStock(+e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="category" className="my-2">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category"
                                name="category"
                                value={category}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="description" className="my-2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter description"
                                name="description"
                                value={description}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary" className="my-2">Update</Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default ProductEditScreen;
