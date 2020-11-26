import React from 'react';
import { makeStyles, useTheme, Grid, Typography, useMediaQuery } from '@material-ui/core';

const useStylesMainContainer = makeStyles((theme) => ({
	root: {
		padding: 20,
	},
	mainContainer: {
		marginTop: '2em',
		[theme.breakpoints.down('md')]: {
			marginTop: '2em',
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: '1em',
		},
	},
}));

export function MainContainer({ children }) {
	const classes = useStylesMainContainer();
	return (
		<Grid container className={classes.mainContainer}>
			{children}
		</Grid>
	);
}

export function Title({ children }) {
	const theme = useTheme();
	const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
	return (
		<Typography style={{ fontSize: matchesXS ? '2rem' : null }} variant="h1" color="primary" gutterBottom>
			{children}
		</Typography>
	);
}
