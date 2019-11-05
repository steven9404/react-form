import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex'
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	appBar: {
		marginLeft: drawerWidth,
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`
		}
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		paddingTop: '64px'
	}
}))

const schoolTabs = [
	{ id: 1, text: 'Overview', link: '' },
	{ id: 2, text: 'Curriculum', link: 'curriculum' },
	{ id: 3, text: 'Enrolment', link: 'enrolment' },
	{ id: 4, text: 'The Team', link: 'team' }
]

function ResponsiveDrawer({ container, children }) {
	const classes = useStyles()
	const theme = useTheme()
	const [mobileOpen, setMobileOpen] = React.useState(false)
	const [tabTitle, setTabTitle] = React.useState('Overview')

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen)
	}

	const handleChangeTab = title => {
		setTabTitle(title)
	}

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				{schoolTabs.map((tab, index) => (
					<Link
						to={`/school/1/${tab.link}`}
						style={{ textDecoration: 'none' }}
						key={tab.id}
					>
						<ListItem
							button
							onClick={() => handleChangeTab(tab.text)}
						>
							<ListItemText primary={tab.text} />
						</ListItem>
					</Link>
				))}
			</List>
			<Divider />
		</div>
	)

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						{`Seethrough Portal - ${tabTitle}`}
					</Typography>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>{children}</main>
		</div>
	)
}

ResponsiveDrawer.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	container: PropTypes.instanceOf(
		typeof Element === 'undefined' ? Object : Element
	)
}

export default ResponsiveDrawer
