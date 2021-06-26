import { createMuiTheme } from '@material-ui/core';

const habeschaGreen = '#059348';
const habeschaRed = '#F16824';
const habeschaBraun = '#F69322';

const theme = createMuiTheme({
	palette: {
		common: {
			green: `${habeschaGreen}`,
			red: `${habeschaRed}`,
			braun: `${habeschaBraun}`,
		},
		primary: {
			main: `${habeschaGreen}`,
			light: 'rgba(5, 147, 72, 0.6)',
		},
		secondary: {
			main: `${habeschaRed}`,
			light: 'rgba(241, 104, 36, .06)',
		},
	},
	typography: {
		fontFamily: 'Titillium Web',
		tab: {
			textTransform: 'none',
			fontSize: '1.1rem',
			fontWeight: 'bold',
			opacity: 1,
		},
		h1: {
			fontSize: '2.5rem',
			fontWeight: 'normal',
		},
		h2: {
			fontSize: '2rem',
			fontWeight: 'normal',
		},
		h3: {
			fontSize: '1.5rem',
			fontWeight: 'normal',
		},
		body1: {
			fontSize: '1.2rem',
			color: '#4a4a4a',
			fontWeight: 'normal',
			// textAlign: 'justify',
		},
		body2: {
			color: '#272727',
		},
	},
});

theme.props = {
	MuiButton: {
		disableElevation: true,
	},
	MuiInput: {
		//disableUnderline: true,
	},
};

theme.overrides = {
	MuiButton: {
		root: {
			color: theme.palette.primary.main,
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
			fontSize: '1.1rem',
		},
	},
	MuiFilledInput: {
		root: {
			backgroundColor: 'none',
			'&:hover': {
				backgroundColor: 'rgba(241, 104, 36, .06)',
			},
			'&:focus': {
				outline: 'none',
			},
		},
	},
	MuiFormLabel: {
		root: {
			color: 'green',
		},
	},
};

export default theme;
