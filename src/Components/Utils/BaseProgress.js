import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: 'calc(100vh - 64px)'
	},
	circularProgress: {
		// margin: '50px'
	}
}))

export default function CircularIndeterminate() {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<CircularProgress className={classes.circularProgress} />
		</div>
	)
}
