import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Typography, makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router';

import { passwordReset } from '../services/Firebase';
import { Notification } from './Notification';

import messages from './messages';

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

function PasswordReset() {
	const [email, setEmail] = useState('');
	const [notify, setNotify] = useState(null);

	const classes = useStyles();
	let history = useHistory();

	const handleChange = (e) => {
		const itemName = e.target.name;
		const itemValue = e.target.value;

		if (itemName === 'email') {
			setEmail(itemValue);
		}
	};

	const handleSubmit = async (e) => {
		var registrationInfo = {
			email: email,
		};
		e.preventDefault();
		try {
			await passwordReset(registrationInfo);
			history.push('/signin');
		} catch (error) {
			console.log('Firebase Error:', error.code, error);
			if (error.message !== null) {
				setNotify({ type: 'error', text: messages[error.code] || error.message });
				window.setTimeout(() => {
					setNotify(null);
				}, 3000);
			} else {
				setNotify(null);
			}
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Passwort zurücksetzen
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					{notify !== null ? <Notification type="error" text={notify.text} /> : null}
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="E-mail-Adresse"
						name="email"
						autoComplete="email"
						autoFocus
						value={email}
						onChange={handleChange}
					/>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						E-mail senden
					</Button>
					<Grid container>
						<Grid item>
							{'Neu bei Habesch? '}
							<Link href="/signup" variant="body2">
								{' Jetzt Registrieren.'}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}

export default PasswordReset;
