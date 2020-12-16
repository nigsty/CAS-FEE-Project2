import { createMuiTheme } from '@material-ui/core';

const habeschaGreen = '#009245';
const habeschaRed = '#F15A24';
const habeschaBraun = '#F7931E';

const theme = createMuiTheme({
	palette: {
		common: {
			green: `${habeschaGreen}`,
			red: `${habeschaRed}`,
			braun: `${habeschaBraun}`,
		},
		primary: {
			main: `${habeschaGreen}`,
		},
		secondary: {
			main: `${habeschaRed}`,
		},
	},
	typography: {
		fontFamily: 'Titillium Web',
		tab: {
			textTransform: 'none',
			fontFamily: 'Titillium Web',
			fontSize: '1.1rem',
			fontWeight: 600,
			opacity: 1,
		},
		h1: {
			fontSize: '2.5rem',
			fontWeight: 500,
		},
		h2: {
			fontSize: '2rem',
		},
		h3: {
			fontSize: '1.5rem',
		},
		body1: {
			fontSize: '1.2rem',
			color: '#4a4a4a',
			textAlign: 'justify',
		},
		body2: {
			color: '#272727',
		},
	},
});

theme.props = {
	MuiButton: {
		disableElevation: true,
		//textTransform: 'none',
	},
	MuiInputLabel: {
		//shrink: true
	},
	MuiInput: {
		//disableUnderline: true,
	},
};

theme.overrides = {
	MuiButton: {
		root: {
			color: 'green',
			'&:focus': {
				outline: 'none',
			},
			textTransform: 'none',
			'&:hover': {
				color: 'white',
			},
		},
	},
	MuiLink: {
		underlineHover: {
			'&:hover': {
				textDecoration: 'none',
				color: theme.palette.common.red,
			},
		},
	},
	MuiInput: {
		root: {
			top: theme.spacing(2),
			border: `1px solid $(grey[500])`,
			padding: theme.spacing(1),
		},
	},
	MuiInputLabel: {
		root: {
			//textTransform: 'none',
			fontSize: '1.5rem',
		},
	},
};

export default theme;
