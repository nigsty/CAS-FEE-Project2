import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import firebase, { logOutUser, getAppointments, deleteAppointment, getReviews, onAuthStateChanged } from '../services/Firebase';

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

const db = firebase.firestore();

class App extends Component {
	state = {
		user: null,
		displayName: null,
		userID: null,
		appointments: [],
	};

	componentDidMount() {
		onAuthStateChanged(async (FBUser) => {
			if (FBUser) {
				this.setState({
					user: FBUser,
					displayName: FBUser.displayName,
					userID: FBUser.uid,
				});

				await this.readAppointments();

				const reviews = await getReviews();
				this.setState({ reviews });
			} else {
				this.setState({ user: null });
			}
		});
	};
	readAppointments = async() => {
		const appointments = await getAppointments();
		this.setState({ appointments });
	}

handleLogOut = async(e) =>{
	e.preventDefault();
	await logOutUser();
	this.setState({
		displayName: null,
		userID: null,
		user: null,
	});
	this.props.history.push('/');
}

handleDelete = async (appId) => {
	try {
		await deleteAppointment(appId);
		this.setState((state) => ({
		appointments: state.appointments.filter((app) => app.id !== appId),
		}))
	} catch(error) {
		console.error('Error removing document: ', error);
	};
}
	
	addReveiw = (tempApt) => {
		db.collection('appointments')
			.add(tempApt)
			.then(function (docRef) {
				console.log('Document written with ID: ', docRef.id);
			})
			.catch(function (error) {
				console.error('Error adding document: ', error);
			});
	};

	render() {
		return (
			<div className="layout-container">
				<ThemeProvider theme={theme}>
					<Header user={this.state.user} handleLogOut={this.handleLogOut} />
					<div className="layout-content">
						<Switch>
							<Route exact path="/" component={() => <Home user={this.state.user} />} />
							<Route path="/about" component={About} />
							<Route path="/interpreting" component={TelephoneInterpreting} />
							<Route path="/faq" component={Faq} />
							<Route path="/reviews" component={Reviews} />
							<Route path="/appointments">
								<Appointments
									appointments={this.state.appointments}
									readAppointments={this.readAppointments}
									userID={this.state.userID}
									handleDelete={this.handleDelete}
								/>
							</Route>
							<Route path="/signin" component={SignIn} />
							<Route path="/password-reset" component={PasswordReset} />
							<Route path="/signup">
								<SignUp user={this.state.user} />
							</Route>
						</Switch>
					</div>
					<Footer />
					<MobileFooter user={this.state.user} logOutUser={this.logOutUser} />
				</ThemeProvider>
			</div>
		);
	}
}

export default withRouter(App);
