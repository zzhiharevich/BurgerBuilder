import React from 'react';
import classes from './Input.module.css';

const input = (props) => {

    let element = null;

    switch (props.elementType) {
        case ('input'):
            element = <input
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />;
            break;
        case ('textarea'):
            element = <textarea
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />;
            break;
        case ('select'):
            element = <select
                className={classes.InputElement}
                value={props.value}
                onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
            </select>;
            break;
        default:
            element = <input
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />;
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {element}
        </div>
    );
}

export default input;