import React from 'react';
import { MainContainer, Title } from '../ui/ui-partials';
import { Typography, Avatar, Grid, makeStyles } from '@material-ui/core';
import { Helmet } from 'react-helmet';

import me from '../../assets/me.png';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 20,
	},
	large: {
		width: '80%',
		height: 'auto',
		[theme.breakpoints.down('md')]: {
			margin: 'auto',
			display: 'block',
			width: '80%',
		},
	},
}));

const aboutMeHeading = 'I am habescha';
const aboutMeBodyText =
	'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. ';

function About() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Helmet>
				<title>Habescha: Nigsty Abreha </title>
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
			<MainContainer>
				<Grid item lg={2} />
				<Grid item xs={12} md={12} lg={8}>
					<Grid container>
						<Grid item xs={12}>
							<Title>{aboutMeHeading}</Title>
						</Grid>
						<Grid item xs={12}>
							<Grid container spacing={4}>
								<Grid item xs={12} md={6}>
									<Typography variant="body1" gutterBottom>
										{aboutMeBodyText}
									</Typography>
								</Grid>
								<Grid item xs={12} md={6}>
									<Avatar alt="Nigsty Abreha" src={me} className={classes.large} />
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item lg={2} />
			</MainContainer>
		</div>
	);
}

export default About;
