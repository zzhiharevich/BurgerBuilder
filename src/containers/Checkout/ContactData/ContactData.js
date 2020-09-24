import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

function createFormElements(elType, type, placeholder, value, validation, isValid) {
    return {
        elementType: elType,
        elementConfig: {
            type: type,
            placeholder: placeholder
        },
        value: value,
        validation: {
            required: validation,
        },
        valid: isValid,
        touched: false
    }
}

class ContactData extends Component {

    

    state = {
        orderForm: {
            name: createFormElements('input', 'text', 'Your Name', '', true, false),
            street: createFormElements('input', 'text', 'Your Street', '', true, false),
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    length: 5
                },
                valid: false,
                touched: false
            },
            country: createFormElements('input', 'text', 'Your Country', '', true, false),
            email: createFormElements('input', 'email', 'Your E-mail', '', true, false),
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: '',
                validation: {},
                valid: true,
                touched: false
            },
        },
        formIsValid: false,
        loading: false,
    }

    chackValidity(value, rules) {

        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.length) {
            isValid = value.length === rules.length && isValid;
        }

        return isValid;
    }

    orderHandler = (e) => {
        e.preventDefault();

        this.setState({ loading: true });

        const formData = {};

        for (let el in this.state.orderForm) {
            formData[el] = this.state.orderForm[el].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        }

        axios.post('/orders.json', order)
            .then(responce => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            })

        console.log(this.props.ingredients)
    }

    inputChangedHandler = (e, id) => {
        const updatedForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedForm[id]};

        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.chackValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[id] = updatedFormElement;

        let formIsValid = true;
        for (let inputId in updatedForm) {
            formIsValid = updatedForm[inputId].valid && formIsValid;
        }
        this.setState({orderForm: updatedForm, formIsValid: formIsValid});
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(el => (
                    <Input
                        elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig}
                        value={el.config.value}
                        key={el.id}
                        invalid={!el.config.valid}
                        shouldValidate={el.config.validation}
                        touched={el.config.touched}
                        changed={(e) => this.inputChangedHandler(e, el.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
            </form>);
        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter contact data</h4>
                {form}
            </div>
        )
    }

}

export default ContactData;