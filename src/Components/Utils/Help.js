const camelCase = require('camelcase')

export function getValidationErrors(error) {
	const validationErrors = error.inner.reduce((x, y) => {
		x[y.path] = y.message
		return x
	}, {})
	return validationErrors
}

export const buildOptionsLabels = (options, prefix) => {
	return options.map(option => ({
		name: camelCase(`${prefix} ${option}`),
		label: option
	}))
}

export const rebuildFullOptions = fullOptions => {
	fullOptions.subOptionsLabels = buildOptionsLabels(
		fullOptions.options,
		fullOptions.prefix
	)
	return fullOptions
}

export const formatSchoolDetailFromDownload = (
	schoolDetail,
	generalOptions
) => {
	generalOptions.forEach(option => {
		const { fieldName, prefix } = option
		if (schoolDetail[fieldName] && schoolDetail[fieldName].length > 0) {
			schoolDetail[fieldName].forEach(option => {
				let camelCaseName = camelCase(`${prefix} ${option}`)
				schoolDetail[camelCaseName] = true
			})
		}
		delete schoolDetail[fieldName]
	})

	return schoolDetail
}

export const formatSchoolDetailForUpload = (schoolDetail, generalOptions) => {
	generalOptions.forEach(option => {
		let subOptions = []
		let subOptionsLabels = option.subOptionsLabels
		let filedName = option.fieldName
		subOptionsLabels.forEach(label => {
			if (schoolDetail[label.name]) {
				subOptions.push(label.label)
			}
			delete schoolDetail[label.name]
		})

		if (subOptions.length > 0) {
			schoolDetail[filedName] = subOptions
		}
	})

	return schoolDetail
}
