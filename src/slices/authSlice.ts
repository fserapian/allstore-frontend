import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStateInterface } from '../types/AuthStateInterface';
import { UserInfoInterface } from '../types/UserInfoInterface';

const initialState: AuthStateInterface = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<UserInfoInterface>) => {
            initialState.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
    },
});
