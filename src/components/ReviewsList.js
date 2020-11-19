import React from 'react';


import { makeStyles, Typography, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import Moment from 'react-moment';
import 'moment/locale/de';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
		fontSize: 14,
  },
	body2: {
		marginBottom: 40
	}
});

const ReviewsList = (props) => {
	const { reviews } = props;
	const classes = useStyles();

	return reviews.map((item) => {
		const date = new Date(item.reviewedDate.seconds * 1000);
		return (
			<>
			
				<Grid item xs={12} sm={6} md={4}>
					<Card className={classes.root}>
					<CardContent>             
						<Typography variant="body1" component="p">
						{item.review}
						</Typography>
						<Typography className={classes.title} variant="body1" color="textSecondary" gutterBottom>
						{item.nameAndInstitution} , <Moment fromNow>
								{date}
							</Moment>
						</Typography>  
					</CardContent>
				</Card>
			</Grid>
		</>
		);
	});
};

export default ReviewsList;
