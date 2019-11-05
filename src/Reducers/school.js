import { GET_SCHOOLDETAIL, UPDATE_SCHOOLDETAIL } from '../Actions/schoolActions'

const initialState = {
	schoolDetail: {}
}

function school(state = initialState, action) {
	const { type, schoolDetail } = action
	switch (type) {
		case GET_SCHOOLDETAIL:
			return {
				schoolDetail
			}
		case UPDATE_SCHOOLDETAIL:
			return {
				schoolDetail
			}
		default:
			return state
	}
}

export default school
