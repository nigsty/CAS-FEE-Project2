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

import { Notification } from '../Notification';
import AppointmentsList from '../AppointmentsList';
import messages from '../messages';

import deLocale from 'date-fns/locale/de';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Redirect } from 'react-router-dom';
import LoadingIndicator from '../ui/LoadingIndicator';

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
		'& thead th': {
			fontWeight: 700,
			backgroundColor: theme.palette.secondary.light,
		},
		'& tbody tr:hover': {
			backgroundColor: theme.palette.secondary.light,
			cursor: 'pointer',
		},
	},
	dateTimeColumn: {
		width: '25%',
	},
	tablePadding: {
		padding: theme.spacing(2),
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
	const [notify, setNotify] = useState(null);
	const [loading, setLoading] = useState(true);

	const user = useContext(AuthContext);
	const classes = useStyles();

	useEffect(() => {
		if (user) {
			(async () => {
				await readAppointments();
				setLoading(false);
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

	const headCells = [
		{ id: 'thema', label: 'Das Thema' },
		{ id: 'institution', label: 'Institution' },
		{ id: 'termin', label: 'Datum & Uhrzeit' },
		{ id: 'bearbeiten', label: 'Bearbeiten' },
		{ id: 'loeschen', label: 'Löschen' },
	];

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
			setNotify({
				type: 'error',
				text: messages['empty-fields'] || 'Bitte füllen Sie alle Felder aus.',
			});
			window.setTimeout(() => {
				setNotify(null);
			}, 2000);
			return;
		} else if (tempApt.thema && tempApt.institution && tempApt.aptDateTime) {
			setNotify(null);
			if (id) {
				setNotify({
					type: 'success',
					text: messages['thank-you-appointment-edit'] || 'Danke! edited',
				});
			} else {
				setNotify({
					type: 'success',
					text: messages['thank-you-appointment'] || 'Ihre Änderungen sind gespeichert!',
				});
			}
			window.setTimeout(() => {
				setNotify(null);
			}, 2000);
		} else {
			setNotify(null);
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

	if (user === null) {
		return <Redirect to="/" />;
	}
	return (
		<MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Typography component="h1" variant="h5">
						Termin vereinbaren
					</Typography>
					<form className={classes.form} noValidate onSubmit={handleSubmit}>
						{notify ? <Notification type={notify.type} text={notify.text} /> : null}

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
							{loading && <LoadingIndicator />}
							{!loading && appointments && appointments.length ? (
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
												{headCells.map((headCell) => (
													<TableCell
														classes={{ root: classes.tableHead }}
														align="left"
														key={headCell.id}
													>
														{headCell.label}
													</TableCell>
												))}
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
