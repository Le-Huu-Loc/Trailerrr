import React, { Suspense } from 'react';
import './App.scss'
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';

// import 'bootstrap/dist/css/bootstrap.min.css';

//Lazy load - code splitting
const Trailer = React.lazy(() => import('./Config/Routes'))

function App() {
    return (
        <Suspense fallback={<div className='loading'>Loading...</div>}>
            <BrowserRouter>
                <Header />
                <Trailer />
                <Footer />
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
