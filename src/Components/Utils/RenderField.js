import React from 'react'
import {
	TextField,
	MenuItem,
	FormHelperText,
	Checkbox,
	FormControlLabel,
	FormControl,
	FormLabel,
	RadioGroup,
	FormGroup,
	Radio,
	Grid
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	checkboxFormControl: {
		width: '100%'
	}
}))

export const RenderTextField = (
	name,
	label,
	values,
	handleChange,
	handleBlur,
	errors,
	className
) => (
	<>
		<TextField
			label={label}
			fullWidth={true}
			name={name}
			className={className}
			value={values[name]}
			onChange={handleChange}
			onBlur={handleBlur}
			error={errors[name] ? true : false}
			margin="normal"
		/>
		{errors[name] && <FormHelperText error>{errors[name]}</FormHelperText>}
	</>
)

export const RenderTextareaField = (
	name,
	label,
	row,
	values,
	handleChange,
	handleBlur,
	errors,
	className
) => (
	<>
		<TextField
			label={label}
			fullWidth={true}
			name={name}
			className={className}
			value={values[name]}
			onChange={handleChange}
			onBlur={handleBlur}
			error={errors[name] ? true : false}
			margin="normal"
			rows={row}
			multiline
		/>
		{errors[name] && <FormHelperText error>{errors[name]}</FormHelperText>}
	</>
)

export const RenderSelectField = (
	name,
	label,
	options,
	values,
	handleChange,
	handleBlur,
	errors,
	className
) => (
	<>
		<TextField
			select
			label={label}
			fullWidth={true}
			margin="normal"
			className={className}
			name={name}
			value={values[name] ? values[name] : ''}
			onChange={handleChange}
			onBlur={handleBlur}
			error={errors[name] ? true : false}
		>
			{options.map(option => (
				<MenuItem key={option} value={option}>
					{option}
				</MenuItem>
			))}
		</TextField>
		{errors[name] && <FormHelperText error>{errors[name]}</FormHelperText>}
	</>
)

export const RenderCheckboxField = (options, values, setFieldValue, errors) => {
	const classes = useStyles()

	return (
		<>
			<FormControl className={classes.checkboxFormControl}>
				<FormLabel>{options.prefix}</FormLabel>
				<FormGroup aria-label="position" row>
					{options.subOptionsLabels.map(subOptionsLabel => {
						const { name, label } = subOptionsLabel
						return (
							<Grid item xs={12} md={4} key={name}>
								<FormControlLabel
									control={
										<Checkbox
											checked={
												values[name] ? true : false
											}
											name={name}
											onChange={() =>
												setFieldValue(
													name,
													!values[name],
													false
												)
											}
										/>
									}
									label={label}
								/>
							</Grid>
						)
					})}
				</FormGroup>
			</FormControl>
		</>
	)
}

// export const renderRadioGroup = ({
// 	validationErrors,
// 	input,
// 	labels,
// 	title,
// 	...rest
// }) => (
// 	<>
// 		<FormControl>
// 			<FormLabel>{title}</FormLabel>
// 			<RadioGroup row {...input} {...rest}>
// 				{labels.map(label => (
// 					<FormControlLabel
// 						key={label.value}
// 						value={label.value}
// 						control={<Radio color="primary" />}
// 						label={label.name}
// 						labelPlacement="end"
// 					/>
// 				))}
// 			</RadioGroup>
// 		</FormControl>
// 	</>
// )
