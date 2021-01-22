import React, { useState, useContext } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
	makeStyles,
	Typography,
	Container,
	Grid,
	TextField,
	Link,
	CssBaseline,
	Button,
	Avatar,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import { AuthContext, signUpUser } from '../services/Firebase';

import { FormSnackbarMessage } from './FormAlert';
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
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const SignUp = ({ registerUser }) => {
	const user = useContext(AuthContext);
	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [snackbarMessage, setSnackbarMessage] = useState(null);

	const classes = useStyles();
	let history = useHistory();

	const handleChange = (e) => {
		const itemName = e.target.name;
		const itemValue = e.target.value;

		if (itemName === 'email') {
			setEmail(itemValue);
		} else if (itemName === 'password') {
			setPassword(itemValue);
		} else if (itemName === 'displayName') {
			setDisplayName(itemValue);
		}
	};

	const handleSubmit = async (e) => {
		let registrationInfo = {
			displayName: displayName,
			email: email,
			password: password,
		};
		e.preventDefault();

		if (!registrationInfo.displayName) {
			setSnackbarMessage({ type: 'error', text: messages['empty-fields'] || 'Bitte füllen Sie alle Felder aus' });
			window.setTimeout(() => {
				setSnackbarMessage(null);
			}, 2000);
			return;
		}

		try {
			await signUpUser(registrationInfo);
			if (typeof registerUser === 'function') {
				registerUser(registrationInfo.firstName);
			}
			setSnackbarMessage(null);
			history.push('/');
		} catch (error) {
			setSnackbarMessage({ type: 'error', text: messages[error.code] || error.message });
		}
	};

	if (user) {
		return <Redirect to="/" />;
	}
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Registrieren
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					{snackbarMessage ? <FormSnackbarMessage type="error" text={snackbarMessage.text} /> : null}
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								autoComplete="fname"
								name="displayName"
								variant="outlined"
								required
								fullWidth
								id="displayName"
								label="Full Name"
								autoFocus
								value={displayName}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Adresse"
								name="email"
								autoComplete="email"
								value={email}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
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
						</Grid>
					</Grid>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						Registrieren
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							{'Haben Sie berits ein Login? '}
							<Link href="./signin" variant="body2">
								Hier einloggen.
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};
export default SignUp;
