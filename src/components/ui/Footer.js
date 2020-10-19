import React from 'react';
import { makeStyles, Typography, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import { Link } from '@reach/router';

import footerTlet from '../../assets/footer3.svg';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://habescha.ch/">
        Habescha Web & Interpret
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
	footer: {
		backgroundColor: theme.palette.common.green,
		color: 'black',
		fontSize: '0.75rem',
		width: '100%',
		zIndex: 1302,
		position: 'relative',
		overflow: 'hidden',
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
		width: '60em',
		marginLeft: '-25px',
		marginBottom: '-12px',
		marginTop: '-8px',
		verticalAlign: 'bottom',
		[theme.breakpoints.down('md')]: {
			width: '50em',
		},
		[theme.breakpoints.down('xs')]: {
			width: '20em',
		},
	},
	mainContainer: {
		position: 'absolute',
	},
}));

export default function Footer() {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<footer className={classes.footer}>
			<Grid container justify="space-between" className={classes.mainContainer}>
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
				{/*<!-- col-md-6 -->*/}
			</Grid>
			<img alt="habesch decorative tilet" src={footerTlet} className={classes.tilet} />
		</footer>
	);
}
