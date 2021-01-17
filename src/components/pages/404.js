import React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Helmet } from 'react-helmet';
import ResponsiveImgMaterialUi from "responsive-img-material-ui";

import notFound from '../../assets/habescha-page-not-found-large.png';
import notFoundMedium from '../../assets/habescha-page-not-found-medium.png';
import notFoundSmall from '../../assets/habescha-page-not-found-small.png';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		height: '70vh',
	},
	mainContainer: {
		height: '100%',
	},
}));

function FourOhFour() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Helmet>
				<title>404 | Habescha</title>
				<meta
					name="description"
					content="Habescha: Interkulturelles Telefon-Dolmetschen für Tigrinya, Amharisch, Deutsch"
				/>
			</Helmet>
				<Grid 
					container
					direction="column"
					justify="center"
					alignItems="center"
					className={classes.mainContainer}
				>
					<Grid item>
						<Grid container alignItems="center" justify="center">
							<Grid item xs={12} md={6} align="center">
								<ResponsiveImgMaterialUi
										xs={notFoundSmall}
										md={notFoundMedium}
										lg={notFound}
									/>
							</Grid>
							<Grid item xs={12} md={6}>
								<Typography variant="body1" gutterBottom align="center">
									Diese Seite konnte nicht gefunden werden.
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Button component={Link} to={'/'} variant="contained" color="secondary">
							Zur Startseite
						</Button>
					</Grid>
				</Grid>
		</div>
	);
}
export default FourOhFour;
