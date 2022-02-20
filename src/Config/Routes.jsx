import React from "react";

import { Routes as Switch, Route } from "react-router-dom";
import Catalog from "../Pages/Catalog";
import Detail from "../Pages/Detail";
import Home from "../Pages/Home";

const Routes = () => {
    return (
        <Switch>
            <Route path='/' element={<Home />} />
            <Route path='/:category/' element={<Catalog />} />
            <Route path='/:category/genre' element={<Catalog />} />
            <Route path='/:category/search/:keywork' element={<Catalog />} />
            <Route path='/:category/:id' element={<Detail />} />
        </Switch>
    );
};

export default Routes;
