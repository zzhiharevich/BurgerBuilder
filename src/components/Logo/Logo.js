import React from 'react';
import burgerLogo from '../../assets/img/burger-logo.png';
import classes from './Logo.module.scss';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}> 
        <img src={burgerLogo} alt='Logo'/>
    </div>
);

export default logo;