import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constants';
import { UserInfoInterface } from '../types/UserInfoInterface';

export interface LoginCredentialsInterface {
    email: string;
    password: string;
}

export interface RegisterCredentialsInterface extends LoginCredentialsInterface {
    name: string;
}

export interface UpdateProfileRequestInterface {
    _id?: string;
    name: string;
    email: string;
    password?: string;
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
        register: builder.mutation<UserInfoInterface, RegisterCredentialsInterface>({
            query: (data: RegisterCredentialsInterface) => ({
                url: USERS_URL,
                method: 'POST',
                body: data,
            }),
        }),
        updateProfile: builder.mutation<UserInfoInterface, UpdateProfileRequestInterface>({
            query: (data: UpdateProfileRequestInterface) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: { ...data },
            }),
        }),
        getUsers: builder.query<UserInfoInterface[], void>({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
        deleteUser: builder.mutation<any, string | undefined>({
            query: (id: string | undefined) => ({
                url: `${USERS_URL}/${id}`,
                method: 'DELETE',
            }),
        }),
        getUserDetails: builder.query<any, string | undefined>({
            query: (id: string | undefined) => ({
                url: `${USERS_URL}/${id}`,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
        updateUser: builder.mutation<UserInfoInterface, any>({
            query: (data) => ({
                url: `${USERS_URL}/${data.userId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useUpdateProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserMutation,
} = usersApiSlice;
