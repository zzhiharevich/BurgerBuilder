import React, { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    render() {
        return (
            <>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    style={{
                        tranform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        //opacity: props.show ? '1' : '0'
                        display: this.props.show ? 'block' : 'none'
                    }}
                    className={classes.Modal}>
                    {this.props.children}
                </div>
            </>
        );
    }

};

export default Modal;