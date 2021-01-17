import React from 'react';
import { makeStyles } from '@material-ui/core';

import footerImg from '../../assets/habescha-footer.png';

const useStyles = makeStyles((theme) => ({
	footer: {
		backgroundImage: `url(${footerImg})`,
		backgroundRepeat: 'repeat-x',
		width: '100%',
		height: '1.8em',
		[theme.breakpoints.down('md')]: {
			display: 'none',
		},
	},
	tilet: {
		[theme.breakpoints.down('lg')]: {
			height: '6em',
			backgroundRepeat: 'repeat-x',
		},
		[theme.breakpoints.down('md')]: {
			display: 'none',
		},
	},
	mainContainer: {
		position: 'absolute',
	},
}));

export default function Footer() {
	const classes = useStyles();

	return (
		<footer className={classes.footer} />
	);
}
