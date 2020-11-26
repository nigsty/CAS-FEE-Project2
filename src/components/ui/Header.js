import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import logo from '../../assets/habescha-web-interpret-logo.svg';
import hamburger from '../../assets/hamburger.svg';

function ElevationScroll(props) {
	const { children } = props;

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

const useStyles = makeStyles((theme) => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
		marginBottom: '3em',
		[theme.breakpoints.down('md')]: {
			marginBottom: '2em',
		},
		[theme.breakpoints.down('xs')]: {
			marginBottom: '1.25em',
		},
	},
	logo: {
		height: '6em',
		[theme.breakpoints.down('md')]: {
			height: '6em',
			width: 'auto',
		},
		[theme.breakpoints.down('xs')]: {
			height: '5em',
		},
		paddingLeft: '0',
	},
	logoContainer: {
		paddingLeft: '4em',
		[theme.breakpoints.down('md')]: {
			paddingLeft: '1em',
		},
		'&hover': {
			backgroundColor: 'transparent',
		},
	},
	tabContainer: {
		marginLeft: 'auto',
	},
	tab: {
		...theme.typography.tab,
		minWidth: 10,
		marginLeft: '25px',
	},
	button: {
		borderRadius: '50px',
		marginLeft: '50px',
		marginRight: '25px',
		fontFamily: 'Titillium Web',
		fontWeight: 500,
		fontSize: '1rem',
		height: '45px',
		color: 'white',
		'&:focus': {
			outline: 'none !important',
		},
	},
	drawerIcon: {
		height: '40px',
		width: '40px',
		color: theme.palette.common.green,
	},
	drawerIconContainer: {
		marginLeft: 'auto',
		'&:hover': {
			backgroundColor: 'transparent',
		},
		'&:focus': {
			outline: 'none',
		},
	},
	drawer: {
		color: theme.palette.common.green,
	},
	drawerItem: {
		...theme.typography.tab,
		color: theme.palette.common.green,
		opacity: 0.8,
	},
	drawerItemTermin: {
		backgroundColor: theme.palette.common.red,
	},
	drawerItemSelected: {
		'&. MuiListItemText-root': {
			opacity: 1,
		},
	},
	appbar: {
		zIndex: theme.zIndex.modal + 1,
		backgroundColor: 'white',
		color: theme.palette.common.green,
	},
	testClasse: {
		backgroundColor: theme.palette.common.red,
	},
}));

export default function Header(props) {
	const classes = useStyles();
	const theme = useTheme();
	const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	const [openDrawer, setOpenDrawer] = useState(false);
	const [value, setValue] = useState(0);

	const { user, handleLogOut } = props;

	const handleChange = (e, value) => {
		setValue(value);
	};

	const activeIndex = () => {
		const found = routes.indexOf(routes.filter(({ name, link }) => link === window.location.pathname)[0]);

		return found === -1 ? false : found;
	};

	const routes = [
		{ name: 'Home', link: '/', activeIndex: 0 },
		{ name: 'Telefondolmetschen', link: '/interpreting', activeIndex: 1 },
		{ name: 'Kundenbewertungen', link: '/reviews', activeIndex: 2 },
		{ name: 'FAQ', link: '/faq', activeIndex: 3 },
		{ name: 'Über mich', link: '/about', activeIndex: 4 },
	];

	const tabs = (
		<React.Fragment>
			<Tabs
				value={activeIndex()}
				onChange={handleChange}
				className={classes.tabContainer}
				indicatorColor="primary"
				classes={{ indicator: classes.testClasse }}
			>
				{routes.map((route, index) => (
					<Tab
						key={`${route}${index}`}
						className={classes.tab}
						component={Link}
						to={route.link}
						label={route.name}
					/>
				))}
			</Tabs>
			{user ? (
				<Button variant="contained" color="secondary" className={classes.button} onClick={handleLogOut}>
					Logout
				</Button>
			) : (
				<Button
					component={Link}
					to={'/signin'}
					variant="contained"
					color="secondary"
					className={classes.button}
				>
					Login
				</Button>
			)}
		</React.Fragment>
	);
	const drawer = (
		<React.Fragment>
			<SwipeableDrawer
				disableBackdropTransition={!iOS}
				disableDiscovery={iOS}
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				onOpen={() => setOpenDrawer(true)}
				classes={{ paper: classes.drawer }}
			>
				<div className={classes.toolbarMargin} />
				<List disablePadding>
					{routes.map((route) => (
						<ListItem
							divider
							key={`${route}${route.activeIndex}`}
							button
							component={Link}
							to={route.link}
							selected={value === route.activeIndex}
							classes={{ selected: classes.drawerItemSelected }}
							onClick={() => {
								setOpenDrawer(false);
								setValue(route.activeIndex);
							}}
						>
							<ListItemText className={classes.drawerItem} disableTypography>
								{route.name}
							</ListItemText>
						</ListItem>
					))}
					<ListItem
						onClick={() => {
							setOpenDrawer(false);
							setValue(5);
						}}
						divider
						button
						component={Link}
						classes={{
							root: classes.drawerItemTermin,
							selected: classes.drawerItemSelected,
						}}
						to="/appointments"
						selected={value === 5}
					>
						<ListItemText className={classes.drawerItem} disableTypography>
							Termin vereinbaren?
						</ListItemText>
					</ListItem>
				</List>
			</SwipeableDrawer>
			<IconButton
				className={classes.drawerIconContainer}
				onClick={() => setOpenDrawer(!openDrawer)}
				disableRipple
			>
				{/* <MenuIcon className={classes.drawerIcon} /> */}
				<img alt="" src={hamburger} className={classes.drawerIcon} />
			</IconButton>
		</React.Fragment>
	);
	return (
		<React.Fragment>
			<ElevationScroll>
				<AppBar position="fixed" className={classes.appbar}>
					<Toolbar disableGutters color="habeschaBraun">
						<Button
							component={Link}
							to="/"
							disableRipple
							//onClick={() => props.setValue(0)}
							className={classes.logoContainer}
						>
							<img alt="Habescha logo" className={classes.logo} src={logo} />
						</Button>
						{matches ? drawer : tabs}
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</React.Fragment>
	);
}
