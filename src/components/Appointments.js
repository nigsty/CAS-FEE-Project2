import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import firebase from './Firebase';
import FormError from './FormError';
import { navigate } from '@reach/router';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

class Appointments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			thema: '',
			errorMessage: null,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const itemName = e.target.name;
		const itemValue = e.target.value;

		this.setState({ 
			[itemName]: itemValue 
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.addAppointment(this.state.thema);
		this.setState({ thema: '' });
	}
	render() {
		const { classes } = this.props;
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Typography component="h1" variant="h5">
						Termin vereinbaren
					</Typography>
					<form className={classes.form} noValidate onSubmit={this.handleSubmit}>
						{this.state.errorMessage !== null ? <FormError theMessage={this.state.errorMessage} /> : null}
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Das Thema"
							name="thema"
							autoComplete="thema"
							autoFocus
							value={this.state.thema}
							onChange={this.handleChange}
						/>
						<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
							Einen Termin vereinbaren
						</Button>
					</form>
				</div>
			</Container>
		);
	}
}

export default withStyles(useStyles)(Appointments);
