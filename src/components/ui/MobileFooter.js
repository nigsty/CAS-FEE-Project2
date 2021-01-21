import React, { useContext } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../../services/Firebase';

const useStyles = makeStyles((theme) => ({
	root: {
		fontWeight: 500,
		fontSize: '1rem',
	},
	mobileFooter: {
		[theme.breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	mainContainer: {
		position: 'absolute',
	},
	buttonCenter: {
		justifyContent: 'center',
	},
}));

export default function MobileFooter(props) {
	const classes = useStyles();
	const user = useContext(AuthContext);

	const { handleLogOut } = props;
	return (
		<footer className={classes.mobileFooter}>
			<Grid container direction="column" justify="center" alignItems="center">
				<Grid item>
					{user ? (
						<Button
							variant="contained"
							color="secondary"
							onClick={handleLogOut}
							className={classes.root}
							startIcon={<AccountCircleIcon />}
						>
							Logout
						</Button>
					) : (
						<Button
							component={Link}
							to={'/signin'}
							variant="contained"
							color="secondary"
							className={classes.root}
							startIcon={<AccountCircleIcon />}
						>
							Login
						</Button>
					)}
				</Grid>
			</Grid>
		</footer>
	);
}
