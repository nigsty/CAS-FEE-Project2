import React from 'react';
import { makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import { MainContainer, Title } from '../ui/ui-partials';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 20,
	},
	ol: {
		paddingLeft: theme.spacing(2.3),
		marginTop: 0,
		marginBottom: 0,
		marginLeft: 5,
	},
	a: {
		color: theme.palette.common.red,
		textDecoration: 'none',
	},
	h2: {
		marginBottom: 0,
		fontSize: '1.3rem',
	},
}));

const interpretHeading = <FormattedMessage id="telefondolmetschen_title" />;
const InterpretBody = () => {
	const classes = useStyles();
	const theme = useTheme();
	const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
	return (
		<span>
			<FormattedMessage id="telefondolmetschen_body" />
			<h2 style={{ fontSize: matchesXS ? '1.1rem' : null }} className={classes.h2}>
				<FormattedMessage id="telefondolmetschen_body2_subtitle" />
			</h2>
			<FormattedMessage id="telefondolmetschen_body2" />{' '}
			<h2 style={{ fontSize: matchesXS ? '1.1rem' : null }} className={classes.h2}>
				<FormattedMessage id="telefondolmetschen_body3_subtitle" />
			</h2>
			<ol className={classes.ol}>
				<li>
					<FormattedMessage
						id="telefondolmetschen_body3_list1"
						values={{
							a: (chunks) => (
								<a href="/signup" className={classes.a}>
									{chunks}
								</a>
							),
						}}
					/>
				</li>
				<li>
					<FormattedMessage id="telefondolmetschen_body3_list2" />
				</li>{' '}
				<li>
					<FormattedMessage id="telefondolmetschen_body3_list3" />
				</li>
				<li>
					<FormattedMessage id="telefondolmetschen_body3_list4" />
				</li>
				<li>
					<FormattedMessage
						id="telefondolmetschen_body3_list5"
						values={{
							a: (chunks) => (
								<a href="/reviews" className={classes.a}>
									{chunks}
								</a>
							),
						}}
					/>
				</li>
			</ol>
			<h2 style={{ fontSize: matchesXS ? '1.1rem' : null }} className={classes.h2}>
				<FormattedMessage id="telefondolmetschen_body4_subtitle" />
			</h2>
			<FormattedMessage
				id="telefondolmetschen_body4"
				values={{
					strong: (chunks) => <strong>{chunks}</strong>,
					a: (chunks) => (
						<a className={classes.a} href="/reviews">
							{chunks}
						</a>
					),
				}}
			/>
		</span>
	);
};

function TelephoneInterpreting() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Helmet>
				<title>Habescha: Interkulturelles Telefondolmetschen </title>
				<link rel="canonical" href="http://habescha.ch/interpreting" />
				<meta
					name="description"
					content="Habescha: Das Telefondolmetschdienst für Tigrinya, Amharisch, Deutsch"
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
							<Title>{interpretHeading}</Title>
						</Grid>
						<Grid item xs={12}>
							<Grid container>
								<Grid item xs={12} lg={10} xl={8}>
									<Typography variant="body1" component={'span'} gutterBottom>
										<InterpretBody />
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item md={2}></Grid>
			</MainContainer>
		</div>
	);
}
export default TelephoneInterpreting;
