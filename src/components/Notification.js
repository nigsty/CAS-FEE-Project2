import React from 'react';
import Alert from '@material-ui/lab/Alert';

export function Notification({ type, text }) {
	return <Alert severity={type}>{text}</Alert>;
}
