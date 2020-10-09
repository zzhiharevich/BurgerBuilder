import React from 'react';
import classes from './Input.module.scss';

const input = (props) => {

    let element = null;
    let classesArray = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        classesArray.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            element = <input
                className={classesArray.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />;
            break;
        case ('textarea'):
            element = <textarea
                className={classesArray.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />;
            break;
        case ('select'):
            element = <select
                className={classesArray.join(' ')}
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