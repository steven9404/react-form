import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid } from '@material-ui/core'
import { Formik } from 'formik'
import * as yup from 'yup'
import {
	handleUpdateSchoolDetail,
	handleGetSchoolDetail
} from '../../Actions/schoolActions.js'
import { useSelector, useDispatch } from 'react-redux'
import BaseProgess from '../Utils/BaseProgress.js'
import {
	formatSchoolDetailFromDownload,
	formatSchoolDetailForUpload
} from '../Utils/Help.js'
import { theTeamOptions } from '../Utils/TheTeamOptions.js'
import {
	RenderTextField,
	RenderCheckboxField,
	RenderTextareaField
} from '../Utils/RenderField.js'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	textField: {
		textAlign: 'left'
	},
	button: {
		margin: theme.spacing(1)
	}
}))

const schema = yup.object().shape({
	school_teaching_staff_summary: yup
		.string()
		.max(1000)
		.label('Teaching Staff Summary')
		.required()
})

const TheTeam = props => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const { schoolId } = props.match.params

	const [isLoading, setIsLoading] = React.useState(true)

	let schoolDetail = useSelector(state => state.school.schoolDetail)

	schoolDetail = formatSchoolDetailFromDownload(schoolDetail, theTeamOptions)

	React.useEffect(() => {
		async function fetchData() {
			setIsLoading(true)
			await dispatch(handleGetSchoolDetail(schoolId))
			setIsLoading(false)
		}
		fetchData()
	}, [schoolId, dispatch])

	return (
		<>
			{isLoading && <BaseProgess />}
			{!isLoading && (
				<Formik
					initialValues={schoolDetail}
					onSubmit={async values => {
						setIsLoading(true)

						try {
							let newSchoolDetail = { ...values }
							newSchoolDetail = formatSchoolDetailForUpload(
								newSchoolDetail,
								theTeamOptions
							)
							await dispatch(
								handleUpdateSchoolDetail(
									schoolId,
									newSchoolDetail
								)
							)
							setIsLoading(false)
						} catch (error) {
							setIsLoading(false)
						}
					}}
					validationSchema={schema}
					// enableReinitialize={true}
					validateOnChange={false}
				>
					{props => {
						const {
							values,
							touched,
							errors,
							dirty,
							isSubmitting,
							handleChange,
							handleBlur,
							handleSubmit,
							handleReset,
							setFieldValue
						} = props
						return (
							<form
								onSubmit={handleSubmit}
								className={classes.container}
							>
								<Grid container>
									<Grid
										item
										xs={12}
										md={6}
										className={classes.textField}
									>
										{RenderTextareaField(
											'school_teaching_staff_summary',
											'Teaching Staff Summary',
											'3',
											values,
											handleChange,
											handleBlur,
											errors
										)}
									</Grid>
									{theTeamOptions.map(option => (
										<Grid
											item
											xs={12}
											md={12}
											className={classes.textField}
											key={option.fieldName}
										>
											{RenderCheckboxField(
												option,
												values,
												setFieldValue,
												errors
											)}
										</Grid>
									))}
								</Grid>
								<Button
									className={classes.button}
									type="submit"
								>
									Update
								</Button>
							</form>
						)
					}}
				</Formik>
			)}
		</>
	)
}

export default TheTeam
