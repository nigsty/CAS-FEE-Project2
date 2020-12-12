import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCNEXUf-qEVxPMZRNG-MHWjXCp2dRugvvk',
	authDomain: 'habescha-fee.firebaseapp.com',
	databaseURL: 'https://habescha-fee.firebaseio.com',
	projectId: 'habescha-fee',
	storageBucket: 'habescha-fee.appspot.com',
	messagingSenderId: '604553906720',
	appId: '1:604553906720:web:3f91cd7a2f8863b434ca45',
	measurementId: 'G-SQ4E1TBWNT',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export const onAuthStateChanged = (cb) => {
	firebase.auth().onAuthStateChanged(cb);
};

export const getAppointments = async ({ all }) => {
	if (all) {
		console.log('[getAppointments] ALL', auth.currentUser.uid);
	} else {
		console.log('[getAppointments] for uid', auth.currentUser.uid);
	}
	let query = db.collection('appointments');
	if (!all) {
		query = query.where('uid', '==', auth.currentUser.uid);
	}
	const querySnapshot = await query.get();
	//console.log('[getAppointments] results', querySnapshot.size);
	let appointments = [];
	querySnapshot.forEach((doc) => {
		appointments.push({ ...doc.data(), id: doc.id });
	});
	return appointments;
};

export const addAppointment = async (tempApt) => {
	return await db.collection('appointments').add(tempApt);
};

export const editAppointment = async (tempApt) => {
	return await db.collection('appointments').doc(tempApt.id).set(tempApt);
};

export const deleteAppointment = async (appId) => {
	return await db.collection('appointments').doc(appId).delete();
};
export const addReview = async (doc) => {
	return await db.collection('reviews').add(doc);
};

export const getReviews = async () => {
	const querySnapshot = await db.collection('reviews').get();
	let reviews = [];
	querySnapshot.forEach((doc) => {
		reviews.push({ ...doc.data(), id: doc.id });
	});
	return reviews;
};

export const signInUser = async (registrationInfo) => {
	await firebase.auth().signInWithEmailAndPassword(registrationInfo.email, registrationInfo.password);
};

export const signUpUser = async (registrationInfo) => {
	await firebase.auth().createUserWithEmailAndPassword(registrationInfo.email, registrationInfo.password);
};

export const logOutUser = async () => {
	await firebase.auth().signOut();
};

export const passwordReset = async (registrationInfo) => {
	firebase.auth().languageCode = 'de';
	await firebase.auth().sendPasswordResetEmail(registrationInfo.email);
};

export default firebase;
