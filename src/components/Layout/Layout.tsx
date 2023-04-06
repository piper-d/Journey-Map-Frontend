import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Nav/NavBar'
// import Footer from '../Nav/Footer';

export interface ILayoutComponentProps { }

const LayoutComponent: React.FunctionComponent<ILayoutComponentProps> = (props) => {
    return (
        <div>
            <NavBar />
            <Outlet />
            {/* <Footer /> */}
        </div>
    );
};

export default LayoutComponent;