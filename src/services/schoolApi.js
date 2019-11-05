import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

let schoolApi = {
	getSchoolDetailById: async id => {
		return axios.get(`/schools/${id}`)
	},

	updateSchoolDetail: async (id, schoolDetail) => {
		return axios.put(`/schools/${id}`, schoolDetail)
	}
}

export default schoolApi
