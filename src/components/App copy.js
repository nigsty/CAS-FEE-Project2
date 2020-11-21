import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router';
import {
	logOutUser,
	getAppointments,
	deleteAppointment,
	getReviews,
	onAuthStateChanged,
	auth,
} from '../services/Firebase';

import Home from './pages/Home';
import About from './pages/About';
import TelephoneInterpreting from './pages/TelephoneInterpreting';
import Faq from './pages/Faq';
import Reviews from './pages/Reviews';
import Appointments from './Appointments';
import SignIn from './SignIn';
import SignUp from './SignUp';
import PasswordReset from './PasswordReset';

import Header from './ui/Header';
import Footer from './ui/Footer';
import MobileFooter from './ui/MobileFooter';

import '../css/App.css';
import { ThemeProvider } from '@material-ui/core';

import theme from '../components/ui/Theme';

const App = (props) => {
	const [user, setUser] = useState(null);
	const [displayName, setDisplayName] = useState(null);
	const [userID, setUserID] = useState(null);
	const [appointments, setAppointments] = useState([]);
	const [admin, setAdmin] = useState(false);
	let history = useHistory();

	useEffect(() => {
		onAuthStateChanged(async (FBUser) => {
			console.log('onAuthStateChanged', FBUser);
			if (FBUser) {
					setUser(FBUser);
					setDisplayName(FBUser.displayName);
					setUserID(FBUser.uid);

				const ap = await readAppointments();
				
				const reviews = await getReviews();
				 //setReviews
			} else {
				setUser(null);
			}
		});
	}, []);

	const loadAll = () => {
		setAdmin(true) 
			readAppointments();
	};

	const readAppointments = async () => {
		if (!auth.currentUser) {
			return;
		}
		const appointments = await getAppointments({ all: admin });
		setAppointments(appointments)
	};

	const handleLogOut = async (e) => {
		e.preventDefault();
		await logOutUser();
			setDisplayName(null);
			setUserID(null);
			setUser(null);
			
		history.push('/');
	};

	const handleDelete = async (appId) => {
		const confirmed = window.confirm('Are you sure you want to delete?');
		if (!confirmed) {
			return;
		}

		try {
			await deleteAppointment(appId);
			setAppointments(appointments.filter((app) => app.id !== appId));
		} catch (error) {
			console.error('Error removing document: ', error);
		}
	};


		return (
			<div className="layout-container">
				<ThemeProvider theme={theme}>
					<Header user={user} handleLogOut={handleLogOut} />
					<div className="layout-content">
						<Switch>
							<Route exact path="/" component={() => <Home user={user} />} />
							<Route path="/about" component={About} />
							<Route path="/interpreting" component={TelephoneInterpreting} />
							<Route path="/faq" component={Faq} />
							<Route path="/reviews" component={Reviews} />
							<Route
								path="/appointments/:listAll?"
								children={({ match }) => {
									return (
										<Appointments
											appointments={appointments}
											readAppointments={readAppointments}
											userID={userID}
											handleDelete={handleDelete}
											match={match}
											loadAll={loadAll}
											admin={admin}
										/>
									);
								}}
							></Route>
							<Route path="/signin" component={SignIn} />
							<Route path="/password-reset" component={PasswordReset} />
							<Route path="/signup">
								<SignUp user={user} />
							</Route>
						</Switch>
					</div>
					<Footer />
					<MobileFooter user={user} handleLogOut={handleLogOut} />
				</ThemeProvider>
			</div>
		);
	}

export default App;
