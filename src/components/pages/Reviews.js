import React from 'react';
import { makeStyles, useTheme, Grid, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 20,
	},
	toolbarMargin: {
		...theme.mixins.toolbar,
		marginBottom: '1em',
		[theme.breakpoints.down('md')]: {
			marginBottom: '2em',
		},
		[theme.breakpoints.down('xs')]: {
			marginBottom: '1.25em',
		},
	},
	mainContainer: {
		marginTop: '2em',
		[theme.breakpoints.down('md')]: {
			marginTop: '2em',
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: '1em',
		},
	}
}));

const reviewHeading = 'Kundenbewertungen';
const reviewBodyText =
	'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then ';

function Reviews() {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<div className={classes.root}>
			<Grid container className={classes.mainContainer} >
				<Grid item md={2} sm={0}></Grid>
				<Grid item item xs={12} md={8}>
					<Grid container>
						<Grid item xs={12}>
							<Typography variant="h1" color="primary" gutterBottom>
									{reviewHeading}
							</Typography></Grid>
						<Grid item xs={12}>
							<Grid container>
								<Grid item item xs={12} md={12}>
								<Typography variant="body1" gutterBottom>
									{reviewBodyText}
								</Typography>
								</Grid>								
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item md={2} sm={0}></Grid>
			</Grid>
			<div className={classes.toolbarMargin} />
		</div>
	);
}

export default Reviews;
