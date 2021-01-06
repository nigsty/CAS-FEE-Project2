import React from 'react';
import Alert from '@material-ui/lab/Alert';

export function FormError({ theMessage }) {
	return <Alert severity="error">{theMessage}</Alert>;
}

export function FormSuccess({theMessage}) {
	return <Alert severity="success">{theMessage}</Alert>;
}