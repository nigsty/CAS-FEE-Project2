import React from 'react';
import { MainContainer, Title } from '../ui/ui-partials';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
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
const aboutMeBody = (
	<span>
		Mein Name ist <strong>Nigsty Equbamichael Abreha</strong>. Im Jahre 1998 kam ich aus meinem Heimatland
		Äthiopien, in dem ich geboren und aufgewachsen bin, in die Schweiz. Meine Muttersprachen sind{' '}
		<strong>Tigrinya und Amharisch</strong>. Ich bin Mutter einer 14-jährigen Tochter, welche Schülerin einer
		Sekundarschule ist. Ich bin als Frontend Web-Entwicklerin tätig. Weiterhin erhielt ich das{' '}
		<strong>Zertifikat Interpret</strong> zum interkulturellen Dolmetschen, was mich dazu befähigte von 2010 bis
		2019 als <strong>interkulturelle Dolmetscherin vor Ort bei KOMIN</strong>, sowie als Femmes-Tische Moderatorin,
		zu arbeiten. Seit März 2019 bin ich nun <strong>bei HEKS als interkulturelle Telefondolmetscherin</strong> bei
		beschleunigten Asylverfahren bezüglich Rechtsschutzes in Bundesasylzentren tätig.
		<br />
		<strong>Habescha</strong> ist der Oberbegriff für Menschen aus Äthiopien und Eritrea.
	</span>
);

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
				<Grid item md={2} />
				<Grid item xs={12} md={8} lg={8}>
					<Grid container>
						<Grid item xs={12}>
							<Title>{aboutMeHeading}</Title>
						</Grid>
						<Grid item xs={12}>
							<Grid container spacing={4}>
								<Grid item xs={12} md={9}>
									<Typography variant="body1">{aboutMeBody}</Typography>
								</Grid>
								<Grid item xs={12} md={2}>
									<Avatar alt="Nigsty Abreha" src={me1} className={classes.avatar} />
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item md={2} />
			</MainContainer>
		</div>
	);
}

export default About;
