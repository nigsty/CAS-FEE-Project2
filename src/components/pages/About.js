import React from 'react';
import { MainContainer, Title } from '../ui/ui-partials';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import { Helmet } from 'react-helmet';

//import me from '../../assets/me.png';
import me1 from '../../assets/Nigsty-Equbamichael-Abreha-410.jpg';
//import me2 from '../../assets/Nigsty-Equbamichael-Abreha-410.avif';
//import me3 from '../../assets/Nigsty-Equbamichael-Abreha-280-high-gut.jpg';
//import me4 from '../../assets/Nigsty-Equbamichael-Abreha-280-low-31.jpg';
//import me5 from '../../assets/Nigsty-Equbamichael-Abreha-280-medium-46.jpg';
//import me6 from '../../assets/Nigsty-Equbamichael-Abreha-280-high.jpg';


const useStyles = makeStyles((theme) => ({
	root: {
		padding: 20,
	},
	avatar: {
		width: '13em',
		height: '13em',
		borderRadius: '50%',
		[theme.breakpoints.down('sm')]: {
			width: '16em',
			height: '16em',
			margin: 'auto',
			display: 'block',
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
				<link rel="canonical" href="http://habescha.ch/about" />
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
				<Grid item xs={12} md={9} lg={8}>
					<Grid container>
						<Grid item xs={12}>
							<Title>{aboutMeHeading}</Title>
						</Grid>					
						<Grid item xs={12}>
							<Grid container spacing={4}>
								<Grid item xs={12} md={9}>
									<Typography variant="body1" gutterBottom >
										{aboutMeBodyText}
									</Typography>
								</Grid>
								<Grid item xs={12} md={3}>
									<Avatar alt="Nigsty Abreha" src={me1} className={classes.avatar} />
								</Grid>
							</Grid>
						</Grid>
						{/* <Grid item xs={12}>
							<Grid container spacing={4}>
								<Grid item xs={12} md={3}>
									<picture>
										<source srcset={me2} type="image/avif" className={classes.avatar}/>
										<img src={me1} alt="AVIF with JPEG fallback" className={classes.avatar}></img>
									</picture>
								</Grid>							
							</Grid>
						</Grid> */}
					</Grid>
				</Grid>
				<Grid item lg={2} />
			</MainContainer>
		</div>
	);
}

export default About;
