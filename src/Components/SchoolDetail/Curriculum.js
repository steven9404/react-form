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
import { musicOptions } from '../Utils/CurriculumOptions.js'
import { RenderTextField, RenderCheckboxField } from '../Utils/RenderField.js'

//For custom css style
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

//For validation rule
const schema = yup.object().shape({
	school_curriculum_info_summary: yup
		.string()
		.max(1000)
		.label('School Curriculum Info Summary'),
	school_music_programs_summary: yup
		.string()
		.max(1000)
		.label('School Music Programs Summary')
})

const Curriculum = props => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const { schoolId } = props.match.params

	const [isLoading, setIsLoading] = React.useState(true)

	let schoolDetail = useSelector(state => state.school.schoolDetail)

	schoolDetail = formatSchoolDetailFromDownload(schoolDetail, musicOptions)

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
								musicOptions
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
										{RenderTextField(
											'school_curriculum_info_summary',
											'School Curriculum Info Summary',
											values,
											handleChange,
											handleBlur,
											errors
										)}
									</Grid>
									<Grid
										item
										xs={12}
										md={6}
										className={classes.textField}
									>
										{RenderTextField(
											'school_music_programs_summary',
											'School Music Programs Summary',
											values,
											handleChange,
											handleBlur,
											errors
										)}
									</Grid>
									{musicOptions.map(option => (
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

export default Curriculum
