import React, { useState } from 'react';
import { useHistory } from 'react-router';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Typography, makeStyles, Container, Grid } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { signInUser } from '../services/Firebase';
import { Notification } from './Notification';

import messages from './messages';
import { FormattedMessage } from 'react-intl';

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
		// background: 'linear-gradient(45deg, #F7931E, #009444, #F15A24)'
	},
	a: {
		color: theme.palette.primary.main,
		textDecoration: 'none',
		'&:hover': {
			color: theme.palette.secondary.main,
		},
	},
}));

const SignIn = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	//const [errorMessage, setErrorMessage] = useState(null);
	const [notify, setNotify] = useState(null);

	const classes = useStyles();
	let history = useHistory();

	const handleChange = (e) => {
		const itemName = e.target.name;
		const itemValue = e.target.value;

		if (itemName === 'email') {
			setEmail(itemValue);
		} else if (itemName === 'password') {
			setPassword(itemValue);
		}
	};

	const handleSubmit = async (e) => {
		let registrationInfo = {
			email: email,
			password: password,
		};
		e.preventDefault();
		try {
			await signInUser(registrationInfo);
			setNotify(null);
			history.push('/appointments');
		} catch (error) {
			setNotify({ type: 'error', text: messages[error.code] || error.message });
			window.setTimeout(() => {
				setNotify(null);
			}, 3000);
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
					<FormattedMessage id="signin_page_title" />
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					{notify !== null ? <Notification type="error" text={notify.text} /> : null}
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label={<FormattedMessage id="signin_page_input_email" />}
						name="email"
						autoComplete="email"
						autoFocus
						type="email"
						value={email}
						onChange={handleChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label={<FormattedMessage id="signin_page_input_password" />}
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={handleChange}
					/>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						<FormattedMessage id="signin_page_button_anmelden" />
					</Button>
					<Grid container>
						<Grid item xs>
							<FormattedMessage
								id="signin_page_Passwort_vergessen"
								values={{
									a: (chunks) => (
										<a href="./password-reset" className={classes.a}>
											{chunks}
										</a>
									),
								}}
							/>
						</Grid>
						<Grid item>
							<FormattedMessage
								id="signin_page_neu_habescha"
								values={{
									a: (chunks) => (
										<a href="/signup" className={classes.a}>
											{chunks}
										</a>
									),
								}}
							/>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};
export default SignIn;
