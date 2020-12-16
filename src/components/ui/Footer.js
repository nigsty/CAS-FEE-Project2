import React from 'react';
import { makeStyles } from '@material-ui/core';

import footerImg from '../../assets/footer.png';
//import footerImg from '../../assets/habescha-footer.svg';

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
	link: {
		color: 'white',
		fontWeight: 'bold',
		'&:hover': {
			color: theme.palette.common.red,
			backgroundColor: '#FFF',
			textDecoration: 'none',
		},
	},
	txtAlign: {
		textAlign: 'right',
		[theme.breakpoints.down('xs')]: {
			textAlign: 'left',
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
		<footer className={classes.footer}>
			{/* 	<Grid container justify="space-between" className={classes.mainContainer}>
				<Grid item>
				<Typography variant="body2">
					{'Copyright © '}
						<Link className={classes.link} to="https://www.habescha.ch">
							Web & Interpret.
						</Link>{' '}
						Alle Rechte vorbehalten
					</Typography>
				</Grid>
				<Grid item>
					<Grid container direction="column">
						<Grid item>
							<Typography variant="body2" >
								<Link className={classes.link} to="/#">Nutzungsbedingungen</Link>
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant="body2">
							<Link className={classes.link} to="/#">Datenschut</Link>
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid> */}
		</footer>
	);
}
