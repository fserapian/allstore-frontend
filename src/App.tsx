import React, { ReactElement } from 'react';
import MainHeader from './components/MainHeader';
import MainFooter from './components/MainFooter';

function App(): ReactElement {
    return (
        <>
            <MainHeader />
            <main className="py-3">
                <p>Hello, world</p>
            </main>
            <MainFooter />
        </>
    );
}

export default App;
