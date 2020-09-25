import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    price: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.6,
    meat: 1.0
}

const ingredientsReducer = (state = initialState, action) => {

    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                price: state.price + INGREDIENT_PRICES[action.ingredientName]
            };
        case (actionTypes.REMOVE_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                price: state.price - INGREDIENT_PRICES[action.ingredientName]
            };
        case (actionTypes.SET_INGREDIENTS):
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            };
        case (actionTypes.FETCH_INGREDIENTD_FAILED):
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default ingredientsReducer;