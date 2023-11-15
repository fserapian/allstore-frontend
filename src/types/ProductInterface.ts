export interface ReviewInterface {
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProductInterface {
    _id: string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
    user?: string;
    reviews: ReviewInterface[];
}
