import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constants';
import { UserInfoInterface } from '../types/UserInfoInterface';

export interface LoginCredentialsInterface {
    email: string;
    password: string;
}

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<UserInfoInterface, LoginCredentialsInterface>({
            query: (data: LoginCredentialsInterface) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
} = usersApiSlice;
