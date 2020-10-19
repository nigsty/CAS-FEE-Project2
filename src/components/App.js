import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from './Firebase';

import Home from './pages/Home';
import About from './pages/About';
import TelephoneInterpreting from './pages/TelephoneInterpreting';
import Faq from './pages/Faq';
import Reviews from './pages/Reviews';
import Login from './Login';
import Navigation from './Navigation';
import Register from './Register';
import Appointments from './Appointments';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SignInOriginal from './SignInOriginal';

import Welcome from './Welcome';
import Appointmentsold from './AppointmentsOld';
import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';
import Header from './ui/Header';
import Footer from './ui/Footer';

import '../css/App.css';
import { without, findIndex } from 'lodash';
import { ThemeProvider } from '@material-ui/core';

import theme from '../components/ui/Theme';
import { navigate } from '@reach/router';

class App extends Component {
	constructor() {
		super();
		this.state = {
			myAppointments: [],
			formDisplay: false,
			lastIndex: 0,
			user: null,
			displayName: null,
			userID: null,
		};

		this.deleteAppointment = this.deleteAppointment.bind(this);
		this.toggleForm = this.toggleForm.bind(this);
		this.addAppointment = this.addAppointment.bind(this);
		this.updateInfo = this.updateInfo.bind(this);
	}

	toggleForm() {
		this.setState({
			formDisplay: !this.state.formDisplay,
		});
	}
	addAppointment(apt) {
		let tempApts = this.state.myAppointments;
		apt.aptId = this.state.lastIndex;
		tempApts.unshift(apt);

		this.setState({
			myAppointments: tempApts,

			lastIndex: this.state.lastIndex + 1,
		});
	}
	updateInfo(name, value, id) {
		let tempApts = this.state.myAppointments;
		let aptIndex = findIndex(this.state.myAppointments, {
			aptId: id,
		});
		tempApts[aptIndex][name] = value;
		this.setState({
			myAppointments: tempApts,
		});
	}
	deleteAppointment(apt) {
		let tempApts = this.state.myAppointments;
		tempApts = without(tempApts, apt);
		this.setState({
			myAppointments: tempApts,
		});
	}
	componentDidMount() {
		fetch('./data.json')
			.then((response) => response.json())
			.then((result) => {
				const apts = result.map((item) => {
					item.aptId = this.state.lastIndex;
					this.setState({ lastIndex: this.state.lastIndex + 1 });
					return item;
				});
				this.setState({
					myAppointments: apts,
				});
			});

		firebase.auth().onAuthStateChanged((FBUser) => {
			if (FBUser) {
				this.setState({
					user: FBUser,
					displayName: FBUser.displayName,
					userID: FBUser.uid,
				});
				
				const appointmentsRef = firebase
					.database()
					.ref('appointments/' + FBUser.uid);
					appointmentsRef.on('value', snapshot => {
						let appointments = snapshot.val();
						let appointmentsList = [];

						for(let item in appointments){
							appointmentsList.push({
								appointmentID: item,
								thema: appointments[item].thema
							});
						}
						
						this.setState({
							appointments:appointmentsList,
							howManyAppointments: appointmentsList.length
						});

					})
			} else {
				this.setState({user: null});
			}
		});
	}
	registerUser = (userName) => {
		firebase.auth().onAuthStateChanged((FBUser) => {
			FBUser.updateProfile({
				displayName: userName,
			}).then(() => {
				this.setState({
					user: FBUser,
					displayName: FBUser.displayName,
					userID: FBUser.uid,
				});
				navigate('/welcome');
			});
		});
	};

	logOutUser = (e) => {
		e.preventDefault();
		this.setState({
			displayName: null,
			userID: null,
			user: null,
		});
		firebase
			.auth()
			.signOut()
			.then(() => {
				navigate('/login');
			});
	};

	addAppointment = thema => {
		const ref = firebase
		.database()
		.ref(`appointments/${this.state.user.uid}`);
		ref.push({ thema: thema });
	};

	render() {
		return (
			<div className="layout-container">
				<ThemeProvider theme={theme}>
					<Router>
						<Header user={this.state.user}/>
						<div className="layout-content">
							<Switch>								
								<Route exact path="/" component={Home} user={this.state.user} />
								<Route path="/about" component={About} />
								<Route path="/interpreting" component={TelephoneInterpreting} />
								<Route path="/faq" component={Faq} />
								<Route path="/reviews" component={Reviews} />
								<Appointments path="/appointments" addAppointment={this.addAppointment} />
								<Route path="/signin" component={SignIn} />
								<Route path="/signInOrig" component={SignInOriginal} />
								<Route path="/signup" component={SignUp} registerUser={this.registerUser} />
								<Route path="/login" render={() => <Login user={this.state.user} />} />
								<Route path="/register" registerUser={this.registerUser} />
							</Switch>
						</div>
					</Router>
					<Footer />
				</ThemeProvider>
			</div>
		);
	}
}

export default App;
