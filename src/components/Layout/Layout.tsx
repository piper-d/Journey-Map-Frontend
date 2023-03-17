import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Nav/NavBar'
import Container from '@mui/material/Container';

export interface ILayoutComponentProps { }

const LayoutComponent: React.FunctionComponent<ILayoutComponentProps> = (props) => {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
};

export default LayoutComponent;