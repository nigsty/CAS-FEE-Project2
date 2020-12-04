import React from 'react';
import { makeStyles, Grid, Link, Typography } from '@material-ui/core';

import notFound from '../../assets/habescha-page-not-found.png';
import notFoundMedium from '../../assets/habescha-page-not-found-medium.png';
import notFoundSmall from '../../assets/habescha-page-not-found-small.png';

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

function FourOhFour() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Grid  container direction="column" justify="center" alignItems="center" spacing={4} className={classes.mainContainer} >
					<Grid item>
						<Grid container alignItems="center" justify="center" spacing={4}>
							<Grid item xs={12} md={6} align="center">
								<img src={notFound} srcset={`${notFoundSmall} 320w,
								${notFound} 800w, ${notFoundMedium} 1024w`} alt="Habescha page not found" />
							</Grid>
							<Grid item xs={12} md={6}>
							<Typography variant="body1" gutterBottom align="center">
										The page is not found. Sorry!
									</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
							<Link underline='none' href="./">				
								<Typography variant="body2">
											Home
								</Typography>
							</Link>
					</Grid>
			</Grid>
		</div>
	);
}

export default FourOhFour;
