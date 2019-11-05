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
import { RenderTextField, RenderSelectField } from '../Utils/RenderField.js'

const schoolSectorOptions = ['Catholic', 'Independent', 'Government']

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
	school_school_name: yup
		.string()
		.max(30)
		.label('School Name')
		.required(),
	school_postcode: yup
		.number()
		.min(1000)
		.max(10000)
		.label('Postcode')
})

const TheTeam = props => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const { schoolId } = props.match.params

	const [isSubmitionCompleted, setSubmitionCompleted] = useState(false)

	const [isLoading, setIsLoading] = React.useState(true)

	let schoolDetail = useSelector(state => state.school.schoolDetail)

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
										md={4}
										className={classes.textField}
									>
										{RenderTextField(
											'school_school_name',
											'School Name',
											values,
											handleChange,
											handleBlur,
											errors
										)}
									</Grid>
									<Grid
										item
										xs={12}
										md={4}
										className={classes.textField}
									>
										{RenderTextField(
											'school_postcode',
											'Postcode',
											values,
											handleChange,
											handleBlur,
											errors
										)}
									</Grid>
									<Grid
										item
										xs={12}
										md={4}
										className={classes.textField}
									>
										{RenderSelectField(
											'school_school_sector',
											'School Sector',
											schoolSectorOptions,
											values,
											handleChange,
											handleBlur,
											errors
										)}
									</Grid>
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
