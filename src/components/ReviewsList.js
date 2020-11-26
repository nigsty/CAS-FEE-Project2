import React, { Fragment } from 'react';
import { makeStyles, Typography, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Moment from 'react-moment';
import 'moment/locale/de';

const useStyles = makeStyles((theme) => ({
	root: {
		// border: '1px solid green',
		transition: 'transform .8s,box-shadow .8s',
		'&:hover': {
			transform: 'perspective(1px) scale(1.05)',
			boxShadow: '0 12px 20px 0 rgba(0,0,50,0.12)',
		},
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
		marginBottom: 40,
	},
}));

const ReviewsList = ({ reviews }) => {
	const classes = useStyles();

	return reviews.map((item) => {
		const date = new Date(item.reviewedDate.seconds * 1000);
		return (
			<Fragment key={item.id}>
				<Grid item xs={12} sm={6} md={4}>
					<Card className={classes.root}>
						<CardContent>
							<Typography
								className={classes.title}
								variant="body1"
								color="textSecondary"
								gutterBottom
								display="inline"
							>
								<AccountCircleIcon /> {item.nameAndInstitution}
							</Typography>
							<Typography
								className={classes.title2}
								variant="body1"
								color="textSecondary"
								gutterBottom
								display="inline"
							>
								{' '}
								<Moment fromNow>{date}</Moment>
							</Typography>
							<Typography variant="body1" component="p">
								"{item.review}"
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Fragment>
		);
	});
};

export default ReviewsList;
