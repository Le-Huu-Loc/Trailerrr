import React, { Suspense } from 'react';
import './App.scss'
import { HashRouter } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';

// import 'bootstrap/dist/css/bootstrap.min.css';

//Lazy load - code splitting
const Trailer = React.lazy(() => import('./Config/Routes'))

function App() {
    return (
        <Suspense fallback={<div className='loading'>Loading...</div>}>
            <HashRouter>
                <Header />
                <Trailer />
                <Footer />
            </HashRouter>
        </Suspense>
    );
}

export default App;
