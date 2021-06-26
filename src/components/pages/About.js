import React from 'react';
import { MainContainer, Title } from '../ui/ui-partials';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import me1 from '../../assets/Nigsty-Equbamichael-Abreha-410.jpg';

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

const aboutMeHeading = <FormattedMessage id="about_title" />;
const aboutMeBody = (
	<span>
		<FormattedMessage
			id="about_body1"
			values={{
				strong: (chunks) => <strong>{chunks}</strong>,
				br: () => <br />,
			}}
		/>
		<br />
		<br />
		<FormattedMessage
			id="about_body2"
			values={{
				strong: (chunks) => <strong>{chunks}</strong>,
			}}
		/>
	</span>
);

function About() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Helmet>
				<title>Habescha: Nigsty Equbamichael Abreha </title>
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
				<Grid item xs={12} md={8}>
					<Grid container>
						<Grid item xs={12}>
							<Title>{aboutMeHeading}</Title>
						</Grid>
						<Grid item xs={12}>
							<Grid container spacing={4}>
								<Grid item xs={12} md={8}>
									<Typography variant="body1">{aboutMeBody}</Typography>
								</Grid>
								<Grid item xs={12} md={4}>
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
