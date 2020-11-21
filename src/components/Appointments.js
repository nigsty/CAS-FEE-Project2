import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import { auth, addAppointment, editAppointment } from '../services/Firebase';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import FormError from './FormError';
import AppointmentsList from './AppointmentsList';
import messages from './messages';

import deLocale from 'date-fns/locale/de';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const styles = (theme) => ({
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
});

class Appointments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '', // for editing existing appointment
			thema: '',
			institution: '',
			aptDateTime: new Date(),
			errorMessage: null,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	componentDidMount() {
		//console.log('[Appointments] listAll:', this.props.match.params.listAll === 'all');
		if (this.props.match.params.listAll === 'all') {
			this.props.loadAll(); // set the state in App {loadAll: true}
		}
	}

	handleDateChange(newDate) {
		this.setState({
			aptDateTime: newDate,
		});
	}
	handleChange(e) {
		const itemName = e.target.name;
		const itemValue = e.target.value;
		this.setState({
			[itemName]: itemValue,
		});
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		let tempApt = {
			id: this.state.id,
			thema: this.state.thema,
			institution: this.state.institution,
			aptDateTime: this.state.aptDateTime,
			email: auth.currentUser.email,
			uid: auth.currentUser.uid,
		};
		// console.log('Test date and time', tempApt.aptDateTime);
		if (!tempApt.thema || !tempApt.institution || !tempApt.aptDateTime) {
			let errorMessage = messages['empty-fields'] || 'Bitte füllen Sie alle Felder aus';
			this.setState({ errorMessage });
			return;
		} else {
			this.setState({ errorMessage: null });
		}

		try {
			let docRef;
			if (tempApt.id) {
				// EDIT EXISTING APT
				docRef = await editAppointment(tempApt);
			} else {
				docRef = await addAppointment(tempApt);
			}
			console.log('Document written with ID: ', docRef ? docRef.id : tempApt.id);
			this.props.readAppointments();
			this.setState({ id: '', thema: '', institution: '' });
		} catch (error) {
			console.error('Error adding document: ', error);
		}
	};
	editAppointment = (e, item) => {
		//console.log('item:', item, item.aptDateTime.toDate());
		this.setState({
			id: item.id,
			thema: item.thema,
			institution: item.institution,
			aptDateTime: item.aptDateTime.toDate(),
		});
	};

	render() {
		const { classes, appointments } = this.props;
		return (
			<MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
						<div className={classes.paper}>
							<Typography component="h1" variant="h5">
								Termin vereinbaren
							</Typography>
							<form className={classes.form} noValidate onSubmit={this.handleSubmit}>
								{this.state.errorMessage !== null ? (
									<FormError theMessage={this.state.errorMessage} />
								) : null}
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
									value={this.state.thema}
									onChange={this.handleChange}
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
									value={this.state.institution}
									onChange={this.handleChange}
								/>
								<DateTimePicker
									//disableToolbar
									variant="dialog"
									margin="normal"
									required
									fullWidth
									ampm={false}
									name="aptDateTime"
									id="datetime-local"
									// format="dd/mm/yyyy hh:mm"
									label="Nächster Termin"
									value={this.state.aptDateTime}
									onChange={this.handleDateChange}
								/>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									className={classes.submit}
								>
									{this.state.id ? `Änderungen speichern` : `Einen Termin vereinbaren`}
								</Button>
							</form>
						</div>
				</Container>
				<Grid container>
					<Grid item lg={2}/>
					<Grid item xs={12} md={12} lg={8} className={classes.tablePadding}>
						<Grid container>
							<Grid item xs={12} className={classes.mobileMargin}>
								{appointments && appointments.length ? (
									<Typography variant="h3" color="primary" gutterBottom>
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
											{this.props.appointments && (
												<AppointmentsList
													handleDelete={this.props.handleDelete}
													userID={this.props.userID}
													appointments={this.props.appointments}
													editAppointment={this.editAppointment}
												/>
											)}
										</TableBody>
									</Table>
								</TableContainer>
							</Grid>
						</Grid>
					</Grid>
					<Grid item lg={2}/>
				</Grid>
			</MuiPickersUtilsProvider>
		);
	}
}

export default withStyles(styles)(Appointments);
