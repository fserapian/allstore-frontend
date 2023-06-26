import React, { ReactElement } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

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
            <MainFooter />
        </>
    );
}

export default App;
