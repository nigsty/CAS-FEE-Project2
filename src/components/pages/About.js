import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import me from '../../img/me.png';
import Grid from '@material-ui/core/Grid';
import { Typography, useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 20,
	},
	toolbarMargin: {
		...theme.mixins.toolbar,
		marginBottom: '1em',
		[theme.breakpoints.down('md')]: {
			marginBottom: '2em',
		},
		[theme.breakpoints.down('xs')]: {
			marginBottom: '1.25em',
		},
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
	imgStyle: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
	},
}));

const aboutMeHeading = 'About me';
const aboutMeBodyText =
	'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. ';

function About() {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<div className={classes.root}>
			<Grid container className={classes.mainContainer} >
				<Grid item md={2} sm={0}></Grid>
				<Grid item item xs={12} md={8}>
					<Grid container>
						<Grid item xs={12}>
							<Typography variant="h1" color="primary" gutterBottom>
									{aboutMeHeading}
							</Typography></Grid>
						<Grid item xs={12}>
							<Grid container spacing={4}>
								<Grid item item xs={12} md={6}>
								<Typography variant="body1" gutterBottom>
									{aboutMeBodyText}
								</Typography>
								</Grid>
								<Grid item item xs={12} md={6}><img src={me} alt="Nigsty" className={classes.imgStyle} /></Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item md={2} sm={0}></Grid>
			</Grid>
			<div className={classes.toolbarMargin} />
		</div>
	);
}

export default About;
