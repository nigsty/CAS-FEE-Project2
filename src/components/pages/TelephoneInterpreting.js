import React from 'react';
import { makeStyles, Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {Helmet} from "react-helmet";

import { MainContainer, Title } from '../ui/ui-partials';


const useStyles = makeStyles((theme) => ({
	root: {
		padding: 20,
	},
	ol: {paddingLeft: 19,
			marginTop: 0}
}));

const interpretHeading = 'Telefondolmetschen';
const InterpretBody = () =>{
	const classes = useStyles();
	return (
	<span>
	Telefondolmetschen funktioniert genauso wie Dolmetschen vor Ort, nur ohne die Voraussetzung, dass sich die Teilnehmenden am gleichen Platz befinden müssen. Der Service, welchen Habescha bereitstellt, soll zur Überbrückung für Eritreer und Äthiopier, deren Sprachen Amharisch und Tigrinisch ist, dienen.
	<br /><br /><strong>Was sind die Vorteile von Telefondolmetschen?</strong><br />Durch Telefondolmetschen ergibt sich eine effektivere Kommunikation, da das Übersetzen durch eine trainierte, erfahrene und professionell tätige Dolmetscherin stattfindet. Somit werden Informationsverlust sowie potenzielle Missverständnisse vermieden. Weiterhin ist dies eine effiziente und kostengünstige Alternative zur herkömmlichen Art der Sprachmittlung, da der Übersetzer nicht vor Ort präsent sein muss, um den Service zur Verfügung zu stellen. <br /><br /><strong>Wie funktioniert Telefondolmetschen?</strong>
	<ol className={classes.ol}>
	<li>Zunächst registriert man sich über das Anmeldeformular, woraufhin man zur Terminvereinbarung weitergeleitet wird.</li>
	<li>Am vereinbarten Termin wählen Sie die folgende Telefonnummer: 07X XXX XX XX.</li>									<li>Voraussetzung ist, dass Sie sich am selben Ort wie Ihr Gesprächspartner, mit dem Sie sich verständigen möchten, befinden. Nun erklären Sie Ihre Ausgangssituation sowie das Gesprächsziel. Daraufhin betätigen Sie an Ihrem Telefon den Lautsprecher, um das Gespräch mit Hilfe des Telefondolmetschers sofort zu starten.</li>
	<li>Die Abrechnung des Dolmetscherdienstes erfolgt per E-mail.</li>
	<li>Ihre Meinung ist sehr wichtig. Hinterlassen Sie bitte ein Feedback unter dem Formular «Rezension schreiben».</li>
	</ol>
	</span>
)};

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
			<Grid item md={2}/>
			<Grid item xs={12} md={10} lg={8}>
				<Grid container>
					<Grid item xs={12}>
						<Title>
							{interpretHeading}
						</Title>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={4}>
							<Grid item xs={12} md={9}>
							<Typography variant="body1" component={'span'} >
								<InterpretBody/>
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
