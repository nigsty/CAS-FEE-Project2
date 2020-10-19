import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Welcome from '../Welcome';

import logo from '../../assets/habescha-web-interpret-logo.svg';

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
		height: '45px',
		color: 'white',
	},
	drawerIcon: {
		height: '50px',
		width: '50px',
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
	drawerItmeLogin: {
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
}));

export default function Header(props) {
	const classes = useStyles();
	const theme = useTheme();
	const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	const [openDrawer, setOpenDrawer] = useState(false);
	const [value, setValue] = useState(0);

	const handleChange = (e, value) => {
		setValue(value);
	};

	useEffect(() => {
		if (window.location.pathname === '/' && value !== 0) {
			setValue(0);
		} else if (window.location.pathname === '/about' && value !== 1) {
			setValue(1);
		} else if (window.location.pathname === '/interpreting' && value !== 2) {
			setValue(2);
		} else if (window.location.pathname === '/faq' && value !== 3) {
			setValue(3);
		} else if (window.location.pathname === '/reviews' && value !== 4) {
			setValue(4);
		}
	}, [value]);

	const routes = [
		{ name: 'Home', link: '/', activeIndex: 0 },
		{ name: 'About', link: '/about', activeIndex: 1 },
		{ name: 'Telephonedolmetschen', link: '/interpreting', activeIndex: 2 },
		{ name: 'FAQ', link: '/faq', activeIndex: 3 },
		{ name: 'Kundenbewertungen', link: '/reviews', activeIndex: 4 },
	];

	const tabs = (
		<React.Fragment>
			<Tabs value={value} onChange={handleChange} className={classes.tabContainer} indicatorColor="primary">
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
			<Button variant="contained" color="secondary" className={classes.button}>
				Login
			</Button> 
			welcome 
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
							root: classes.drawerItmeLogin,
							selected: classes.drawerItemSelected,
						}}
						to="/login"
						selected={value === 5}
					>
						<ListItemText className={classes.drawerItem} disableTypography>
							Login
						</ListItemText>
					</ListItem> 
				</List>
			</SwipeableDrawer>
			<IconButton
				className={classes.drawerIconContainer}
				onClick={() => setOpenDrawer(!openDrawer)}
				disableRipple
			>
				<MenuIcon className={classes.drawerIcon} />
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
							onClick={() => props.setValue(0)}
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
