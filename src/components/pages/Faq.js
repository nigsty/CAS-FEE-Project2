import React from 'react';
import { withStyles, makeStyles, Grid, Typography } from '@material-ui/core';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { Helmet } from 'react-helmet';
import { MainContainer, Title } from '../ui/ui-partials';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 20,
	},
}));

const Accordion = withStyles({
	root: {
		border: '1px solid rgba(0, 0, 0, .125)',
		boxShadow: 'none',
		'&:not(:last-child)': {
			borderBottom: 0,
		},
		'&:before': {
			display: 'none',
		},
		'&$expanded': {
			margin: 'auto',
		},
	},
	expanded: {},
})(MuiAccordion);

const AccordionDetails = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiAccordionDetails);

const AccordionSummary = withStyles({
	root: {
		backgroundColor: 'rgba(241, 90, 36, .06)',
		borderBottom: '1px solid rgba(0, 0, 0, .125)',
		marginBottom: -1,
		minHeight: 56,
		'&$expanded': {
			minHeight: 56,
		},
	},
	content: {
		'&$expanded': {
			margin: '12px 0',
		},
	},
	expanded: {},
})(MuiAccordionSummary);

const faqContainer = [
	{ heading: 'Frage 1', body: 'Body text 1' },
	{ heading: 'Frage 2', body: 'Body text 2' },
	{ heading: 'Frage 3', body: 'Body text 3' },
];

const faqHeading = 'Häufig gestellte Fragen';

function Faq() {
	const classes = useStyles();

	const [expanded, setExpanded] = React.useState(0);

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	return (
		<div className={classes.root}>
			<Helmet>
				<title>Habescha: Häufig gestellte Fragen</title>
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
							<Title>{faqHeading}</Title>
						</Grid>
						<Grid item xs={12}>
							<Grid container>
								<Grid item xs={12} md={9}>
									{faqContainer.map((faq, i) => {
										return (
											<div key={i}>
												<Accordion square expanded={expanded === i} onChange={handleChange(i)}>
													<AccordionSummary
														aria-controls="panel1d-content"
														id="panel1d-header"
													>
														<Typography>{faq.heading}</Typography>
													</AccordionSummary>
													<AccordionDetails>
														<Typography>{faq.body}</Typography>
													</AccordionDetails>
												</Accordion>
											</div>
										);
									})}
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

export default Faq;
