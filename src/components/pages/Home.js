import React from 'react';
import { makeStyles, Paper, Grid, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import {Helmet} from "react-helmet";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		height: '60vh'
	},
	paper: {
		textAlign: 'center',
		border: 'solid',
		color: '#009444',
		padding: '20px',
		fontWeight: 'bold',
		margin: 'auto',
		maxWidth: 400,
		[theme.breakpoints.down('xs')]: {
			maxWidth: 250,
		},
	},
	mainContainer: {
		height: '100%',
	},
	'@global': {
		a: {			
			'&:hover': {textDecoration: 'none',}
		}
	}
}));

function Home(props) {
	const classes = useStyles();
	const { user} = props;	
	console.log('test user' + user);
	return (
		<div className={classes.root}>
			<Helmet>
					<title>Habescha: Tigrinya & Amharisch Telefondolmetsch Termin vereinbaren</title>
					<link rel="canonical" href="http://habescha.ch/home" />
					<meta
						name="description"
						content="Habescha: Interkulturelles Telefon-Dolmetschen für Tigrinya, Amharisch, Deutsch"
					/>
					<meta
						name="keywords"
						content="Habescha, Interkulturelles Dolmetschen, Telefondolmetschen, Tigrigna, Tigrinya, Amharisch, Deutsch"
					/>
			</Helmet>
			<Grid  container direction="column" justify="center" alignItems="center" className={classes.mainContainer}>
				<Grid  item >
				{user ? (
					<Link underline='none' href="./appointments" variant="body2">				
						<Paper className={classes.paper}>
							<Typography variant="h2" >
								Termin vereinbaren?
							</Typography>
						</Paper>
						</Link>
					) : (
						<Link underline='none' href="./signin" variant="body2">				
							<Paper className={classes.paper}>
								<Typography variant="h2" >
									Termin vereinbaren?
								</Typography>
							</Paper>
						</Link>
						)}
				</Grid>
			</Grid>
		</div>
	);
}
export default Home;
