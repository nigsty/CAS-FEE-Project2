import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Helmet } from 'react-helmet';

import ReviewsList from '../ReviewsList';
import { FormSuccess, FormError } from '../FormAlert';
import { auth, getReviews, addReview, AuthContext } from '../../services/Firebase';

import messages from '../messages';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 20,
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	table: {
		minWidth: 650,
	},
	tableHead: {
		fontWeight: 700,
	},
	tablePadding: {
		padding: '16px',
	},
	errorIcon: {
		color: 'red',
	},
}));

function Reviews() {
	const user = useContext(AuthContext);
	const [review, setReview] = useState('');
	const [nameAndInstitution, setNameAndInstitution] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	const [reviews, setReviews] = useState(null); // [] array

	const readReviews = async () => {
		try {
			const reviews = await getReviews();
			setReviews(reviews);
		} catch (error) {
			console.log('could not get reviews.', error);
		}
	};

	useEffect(() => {
		readReviews();
	}, []);

	const classes = useStyles();

	const handleSubmit = async (e) => {
		e.preventDefault();
		let tempReview = {
			review: review,
			reviewedDate: new Date(),
			nameAndInstitution: nameAndInstitution,
			email: auth.currentUser ? auth.currentUser.email : '',
			uid: auth.currentUser ? auth.currentUser.uid : '',
		};
		if (!tempReview.review || !tempReview.nameAndInstitution) {
			setErrorMessage(messages['empty-fields'] || 'Bitte füllen Sie alle Felder aus.');
			window.setTimeout(() => setErrorMessage(null), 2000);
			return;
		} else if (tempReview.review && tempReview.nameAndInstitution) {
			setErrorMessage(null);
			setSuccessMessage(messages['thank-you-review'] || 'Danke, ich schätze Ihre Meinung!');
			window.setTimeout(() => setSuccessMessage(null), 2000);
		} else {
			setErrorMessage(null);
		}

		let newDocRef;
		try {
			newDocRef = await addReview(tempReview);
			console.log('Document written with ID: ', newDocRef.id);
			setReview('');
			setNameAndInstitution('');
		} catch (error) {
			console.error('Error adding review: ', error);
		}

		try {
			await readReviews();
		} catch (error) {
			console.error('Error reading document: ', error);
		}
	};

	const handleChange = (e) => {
		const itemName = e.target.name;
		const itemValue = e.target.value;
		if (itemName === 'review') {
			setReview(itemValue);
		} else if (itemName === 'nameAndInstitution') {
			setNameAndInstitution(itemValue);
		}
	};

	return (
		<>
			<Helmet>
				<title>Habescha: Kundenbewertungen </title>
				<link rel="canonical" href="http://habescha.ch/reviews" />
				<meta
					name="description"
					content="Habescha: Interkulturelles Telefon-Dolmetschen für Tigrinya, Amharisch, Deutsch"
				/>
				<meta
					name="keywords"
					content="Habescha, Interkulturelles Dolmetschen, Telefondolmetschen, Tigrigna, Tigrinya, Amharisch, Deutsch"
				/>
			</Helmet>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				{user ? (
					<div className={classes.paper}>
						<Typography component="h1" variant="h5">
							Rezesion schreiben
						</Typography>

						<form className={classes.form} noValidate onSubmit={handleSubmit}>
							{errorMessage !== null ? <FormError theMessage={errorMessage} /> : null}
							{successMessage !== null ? <FormSuccess theMessage={successMessage} /> : null}
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="review"
								label="Ihre Bewertung..."
								name="review"
								autoComplete="thema"
								autoFocus
								multiline
								rows={3}
								rowsMax={10}
								value={review}
								onChange={handleChange}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="nameAndInstitution"
								label="Name & Institution"
								name="nameAndInstitution"
								autoComplete="institution"
								value={nameAndInstitution}
								onChange={handleChange}
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
							>
								Senden
							</Button>
						</form>
					</div>
				) : null}
			</Container>
			<Grid container>
				<Grid item lg={2} />
				<Grid item xs={12} lg={8} className={classes.tablePadding}>
					<Grid container>
						<Grid item xs={12}>
							{reviews && reviews.length ? (
								<Typography variant="h3" color="primary" gutterBottom>
									Aktuelle Bewertungen
								</Typography>
							) : null}
						</Grid>
						<Grid item xs={12}>
							<Grid container spacing={2}>
								{reviews ? <ReviewsList reviews={reviews} /> : null}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item lg={2} />
			</Grid>
		</>
	);
}
export default Reviews;
