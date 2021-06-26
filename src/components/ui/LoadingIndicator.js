import React from 'react';
import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
	circularProgress: {
		margin: '0 auto',
		display: 'block',
	},
}));
export default function LoadingIndicator() {
	const classes = useStyles();
	return <CircularProgress className={classes.circularProgress} />;
}
