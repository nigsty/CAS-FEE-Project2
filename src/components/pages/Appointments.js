import React, { useState, useEffect, useContext } from 'react';
import { auth, addAppointment, editAppointment, AuthContext } from '../../services/Firebase';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Typography, Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { FormError, FormSuccess } from '../FormAlert';
import AppointmentsList from '../AppointmentsList';
import messages from '../messages';

import deLocale from 'date-fns/locale/de';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
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
	dateTimeColumn: {
		width: '25%',
	},
	tablePadding: {
		padding: '16px',
	},
	errorIcon: {
		color: 'red',
	},
}));

const Appointments = ({ appointments, match, readAppointments, handleDelete, loadAll }) => {
	const [id, setId] = useState('');
	const [thema, setThema] = useState('');
	const [institution, setInstitution] = useState('');
	const [aptDateTime, setAptDateTime] = useState(new Date());
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const user = useContext(AuthContext);

	const classes = useStyles();

	useEffect(() => {
		if (user) {
			(async () => {
				await readAppointments();
				//await getReviews();
			})();
		}
	}, [user, readAppointments]);

	useEffect(() => {
		//console.log('[Appointments] listAll:', match.params.listAll === 'all');
		if (match.params.listAll === 'all') {
			loadAll(); // set the state in App {loadAll: true}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [match.params.listAll]);

	const handleDateChange = (newDate) => {
		setAptDateTime(newDate);
	};

	const handleChange = (e) => {
		const itemName = e.target.name;
		const itemValue = e.target.value;
		if (itemName === 'thema') {
			setThema(itemValue);
		} else if (itemName === 'institution') {
			setInstitution(itemValue);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let tempApt = {
			id: id,
			thema: thema,
			institution: institution,
			aptDateTime: aptDateTime,
			email: auth.currentUser.email,
			uid: auth.currentUser.uid,
		};
		if (!tempApt.thema || !tempApt.institution || !tempApt.aptDateTime) {
			setErrorMessage(messages['empty-fields'] || 'Bitte füllen Sie alle Felder aus.');
			window.setTimeout(() => setErrorMessage(null), 2000);
			return;
		} else if (tempApt.thema && tempApt.institution && tempApt.aptDateTime) {
			setErrorMessage(null);
			if (id) {
				setSuccessMessage(messages['thank-you-appointment-edit'] || 'Danke! edited');
			} else {
				setSuccessMessage(messages['thank-you-appointment'] || 'Ihre Änderungen sind gespeichert!');
			}
			window.setTimeout(() => setSuccessMessage(null), 2000);
		} else {
			setErrorMessage(null);
		}

		let newDocRef;
		try {
			if (tempApt.id) {
				// EDIT EXISTING APT
				newDocRef = await editAppointment(tempApt);
				setId('');
				setThema('');
				setInstitution('');
			} else {
				newDocRef = await addAppointment(tempApt);
			}
			console.log('Document written with ID: ', newDocRef.id);
			setId('');
			setThema('');
			setInstitution('');
		} catch (error) {
			console.error('Error adding document: ', error);
		}

		try {
			await readAppointments();
		} catch (error) {
			console.error('Error reading document: ', error);
		}
	};

	const setFormEditAppointment = (e, item) => {
		setId(item.id);
		setThema(item.thema);
		setInstitution(item.institution);
		setAptDateTime(item.aptDateTime.toDate());
	};
	return (
		<MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Typography component="h1" variant="h5">
						Termin vereinbaren
					</Typography>
					<form className={classes.form} noValidate onSubmit={handleSubmit}>
						{errorMessage !== null ? <FormError theMessage={errorMessage} /> : null}
						{successMessage !== null ? <FormSuccess theMessage={successMessage} /> : null}
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="thema"
							label="Das Thema"
							name="thema"
							autoComplete="thema"
							autoFocus
							value={thema}
							onChange={handleChange}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="institution"
							label="Name & Institution"
							name="institution"
							autoComplete="institution"
							value={institution}
							onChange={handleChange}
						/>
						<DateTimePicker
							disablePast
							variant="dialog"
							margin="normal"
							required
							fullWidth
							ampm={false}
							name="aptDateTime"
							id="datetime-local"
							label="Nächster Termin"
							value={aptDateTime}
							onChange={handleDateChange}
						/>
						<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
							{id ? `Änderungen speichern` : `Termin vereinbaren`}
						</Button>
					</form>
				</div>
			</Container>
			<Grid container>
				<Grid item lg={2} />
				<Grid item xs={12} md={12} lg={8} className={classes.tablePadding}>
					<Grid container>
						<Grid item xs={12} className={classes.mobileMargin}>
							{appointments && appointments.length ? (
								<Typography variant="h2" color="primary" gutterBottom>
									Ihre Termine
								</Typography>
							) : null}
						</Grid>
						<Grid item xs={12} className={classes.mobileMargin}>
							<TableContainer component={Paper}>
								<Table className={classes.table} size="small" aria-label="a dense table">
									{appointments && appointments.length ? (
										<TableHead>
											<TableRow>
												<TableCell classes={{ root: classes.tableHead }} align="left">
													Das Thema
												</TableCell>
												<TableCell classes={{ root: classes.tableHead }} align="left">
													Institution
												</TableCell>
												<TableCell classes={{ root: classes.tableHead }} align="left">
													Datum & Uhrzeit
												</TableCell>
												<TableCell classes={{ root: classes.tableHead }} align="left">
													Bearbeiten
												</TableCell>
												<TableCell classes={{ root: classes.tableHead }} align="left">
													Löschen
												</TableCell>
											</TableRow>
										</TableHead>
									) : null}
									<TableBody>
										{appointments && (
											<AppointmentsList
												handleDelete={handleDelete}
												id={id}
												appointments={appointments}
												editAppointment={setFormEditAppointment}
											/>
										)}
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
					</Grid>
				</Grid>
				<Grid item lg={2} />
			</Grid>
		</MuiPickersUtilsProvider>
	);
};
export default Appointments;
