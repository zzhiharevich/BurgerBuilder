import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utillity';

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
            const newIngredient = {
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            }
            const updatedIngredients = updateObject(state.ingredients, newIngredient);
            const newState = {
                ingredients: updatedIngredients,
                price: state.price + INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, newState);
        case (actionTypes.REMOVE_INGREDIENT):
            const newIngredients = {
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            }
            const updatedIngredient = updateObject(state.ingredients, newIngredients);
            const newStates = {
                ingredients: updatedIngredient,
                price: state.price + INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, newStates);
        case (actionTypes.SET_INGREDIENTS):
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                price: 4
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