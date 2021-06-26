import React, { createContext, useReducer } from 'react';

// Define user's language. Different browsers have the user locale defined
// on different fields on the `navigator` object, so we make sure to account
// for these different by checking all of them
const language =
	window.localStorage.getItem('preferred_language') ||
	(navigator.languages && navigator.languages[0]) ||
	navigator.language ||
	navigator.userLanguage;
// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

const initialState = {
	language: languageWithoutRegionCode,
};

export const AppStateContext = createContext(initialState);

const reducer = (state, payload) => ({ ...state, ...payload });

export const AppStateProvider = (props) => {
	const theReducer = useReducer(reducer, initialState);
	return <AppStateContext.Provider value={theReducer} {...props} />;
};
