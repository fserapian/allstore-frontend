import React, { ReactElement } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainHeader from './components/MainHeader';
import MainFooter from './components/MainFooter';

const App = (): ReactElement => {
    return (
        <>
            <MainHeader />
            <main className="py-3">
                <Container>
                    <Outlet />
                </Container>
            </main>
            <ToastContainer />
            <MainFooter />
        </>
    );
};

export default App;
