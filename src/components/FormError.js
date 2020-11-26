import React from 'react';
import Alert from '@material-ui/lab/Alert';

export default function FormError({ theMessage }) {
	return <Alert severity="error">{theMessage}</Alert>;
}
