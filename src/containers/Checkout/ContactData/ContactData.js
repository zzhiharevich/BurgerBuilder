import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

function createFormElements(elType, type, placeholder, value) {
    return {
        elementType: elType,
        elementConfig: {
            type: type,
            placeholder: placeholder
        },
        value: value,
        validation: {
            required: true
        }
    }
}

class ContactData extends Component {

    state = {
        orderForm: {
            name: createFormElements('input', 'text', 'Your Name', ''),
            street: createFormElements('input', 'text', 'Your Street', ''),
            zipCode: createFormElements('input', 'text', 'Your ZIP Code', ''),
            country: createFormElements('input', 'text', 'Your Country', ''),
            email: createFormElements('input', 'email', 'Your E-mail', ''),
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: ''
            },
        },
        loading: false,
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
        updatedForm[id] = updatedFormElement;
        this.setState({orderForm: updatedForm});
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
                        changed={(e) => this.inputChangedHandler(e, el.id)} />
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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