import React from 'react';
import Alert from '@material-ui/lab/Alert';

export function FormSnackbarMessage({ type, text }) {
	return <Alert severity={type}>{text}</Alert>;
}
