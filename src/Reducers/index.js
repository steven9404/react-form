import { combineReducers } from 'redux'
import school from './school.js'
import { reducer as reduxFormReducer } from 'redux-form'

export default combineReducers({
	school,
	form: reduxFormReducer
})
