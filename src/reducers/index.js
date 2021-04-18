import { combineReducers } from 'redux'
import product from './product'
import cart from './cart'
import authReducer from './authReducer';

const rootReducer = combineReducers({
	product,
	cart,
	auth: authReducer
})

export default rootReducer