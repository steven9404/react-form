import schoolApi from '../services/schoolApi.js'

export const GET_SCHOOLDETAIL = 'GET_SCHOOLDETAIL'
export const UPDATE_SCHOOLDETAIL = 'UPDATE_SCHOOLDETAIL'

function getSchoolDetail(schoolDetail) {
	return {
		type: GET_SCHOOLDETAIL,
		schoolDetail
	}
}

function updateSchoolDetail(schoolDetail) {
	return {
		type: UPDATE_SCHOOLDETAIL,
		schoolDetail
	}
}

export function handleGetSchoolDetail(schoolId) {
	return async dispatch => {
		try {
			const response = await schoolApi.getSchoolDetailById(schoolId)
			const schoolDetail = response.data
			schoolDetail && dispatch(getSchoolDetail(schoolDetail))
		} catch (e) {
			console.log(e)
		}
	}
}

export function handleUpdateSchoolDetail(schoolId, schoolDetail) {
	return async dispatch => {
		try {
			const response = await schoolApi.updateSchoolDetail(
				schoolId,
				schoolDetail
			)
			let returnSchoolDetail = response.data

			returnSchoolDetail &&
				dispatch(updateSchoolDetail(returnSchoolDetail))
		} catch (e) {
			console.log(e)
		}
	}
}
