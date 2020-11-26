import React, { useState } from 'react';
import { useHistory } from 'react-router';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Typography, makeStyles, Container, Grid, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { signInUser } from '../services/Firebase';
import FormError from './FormError';

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
		// background: 'linear-gradient(45deg, #F7931E, #009444, #F15A24)'
	},
}));

const SignIn = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);

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
			setErrorMessage(null);
			history.push('/appointments');
		} catch (error) {
			let errorMessage = messages[error.code] || error.message;
			setErrorMessage(errorMessage);
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
					Login
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					{errorMessage !== null ? <FormError theMessage={errorMessage} /> : null}
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
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
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={handleChange}
					/>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						Anmelden
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="./password-reset" variant="body2">
								Passwort vergessen?
							</Link>
						</Grid>
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
};

export default SignIn;
