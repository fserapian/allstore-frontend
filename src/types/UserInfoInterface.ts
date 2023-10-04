export interface UserInfoInterface {
    _id: string;
    name: string;
    email: string;
    password?: string;
    isAdmin: boolean;
    createdAt?: string;
    updatedAt?: string;
}
