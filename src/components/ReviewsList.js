import React from 'react';


import { makeStyles, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Moment from 'react-moment';
import 'moment/locale/de';

const useStyles = makeStyles((theme) => ({
  root: {
		minWidth: 240,
		maxWidth: 400,
		margin: 10,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
		fontSize: 14,
		color: theme.palette.common.red,
	},
	title2: {
		fontSize: 14,
		color: theme.palette.common.braun,
  },
	body2: {
		marginBottom: 40
	},
}));

const ReviewsList = (props) => {
	const { reviews } = props;
	const classes = useStyles();

	return reviews.map((item) => {
		const date = new Date(item.reviewedDate.seconds * 1000);
		return (
			<>
				<Card className={classes.root} variant="outlined">
					<CardContent>
					<Typography className={classes.title} variant="body1" color="textSecondary" gutterBottom display="inline">
						{item.nameAndInstitution}  
						</Typography> 
						<Typography className={classes.title2} variant="body1" color="textSecondary" gutterBottom display="inline">
						{' '}<Moment fromNow>{date}</Moment>
						</Typography>             
						<Typography variant="body1" component="p">
						"{item.review}"
						</Typography>
					</CardContent>
				</Card>
			</>
		);
	});
};

export default ReviewsList;
