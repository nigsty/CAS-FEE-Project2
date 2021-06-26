import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppStateContext } from '../../AppStateProvider';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TranslateIcon from '@material-ui/icons/Translate';
import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
	'@global': {
		'label + .MuiInput-formControl': {
			marginTop: 0,
		},
		'.MuiInput-root': {
			top: 0,
		},
		'.MuiSelect-selectMenu': {
			textTransform: 'capitalize',
		},
		'.MuiListItem-root.Mui-selected': {
			backgroundColor: theme.palette.secondary.light,
			'&:hover': {
				backgroundColor: theme.palette.secondary.light,
			},
		},
		'.MuiListItem-button': {
			'&:hover': {
				backgroundColor: theme.palette.secondary.light,
				color: theme.palette.primary.main,
			},
		},
	},
	selectButton: {
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	formControl: {
		// marginLeft: '1.5em',
		[theme.breakpoints.down('md')]: {
			marginLeft: 0,
			marginRight: '3em',
			'& .MuiButton-text': {
				padding: 0,
			},
			'& .MuiInput-root': {
				padding: 0,
			},
		},
		'& .MuiMenu-list': {
			marginTop: '50px',
		},
		'& .MuiSelect-select': {
			paddingRight: 18,
		},
		'& .MuiSvgIcon-root': {
			fontSize: '1.1rem',
		},
		'& .MuiSelect-root': {
			color: theme.palette.primary.main,
			fontWeight: 'bold',
			fontSize: '1.1rem',
		},
		'& .MuiSelect-icon': {
			color: theme.palette.primary.main,
			top: 'calc(50% - 8px)',
		},
		'& .MuiInput-underline': {
			'&:before': {
				borderBottom: `1px solid ${theme.palette.common.green}`,
			},
			'&:hover:before': {
				borderBottom: `2px solid ${theme.palette.common.green}`,
			},
		},
	},
	selectMenu: {
		zIndex: theme.zIndex.modal - 1000,
		'&:focus': {
			background: 'none',
		},
	},
	menuItem: {
		color: theme.palette.primary.main,
		fontWeight: 'bold',
		fontSize: '1.1rem',
		margin: 5,
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
	},
}));

const languages = [
	{
		code: 'de',
		name: 'Deutsch',
	},
	{
		code: 'ti',
		name: 'Tigrinya',
	},
	{
		code: 'am',
		name: 'Amharisch',
	},
];

const LanguageSwitcher = () => {
	const [{ language }, setState] = useContext(AppStateContext);
	const classes = useStyles();

	const setLanguage = (langCode) => {
		setState({ language: langCode });
		window.localStorage.setItem('preferred_language', langCode);
	};
	return (
		<div className={classes.languageBar}>
			<FormControl className={classes.formControl}>
				<Button classes={{ root: classes.selectButton }} disableRipple>
					<TranslateIcon color="primary" />
					<Select
						labelId="select-autowidth-label"
						id="select-autowidth"
						value={language}
						renderValue={(language) => `${language}`}
						onChange={(e) => setLanguage(e.target.value)}
						autoWidth
						classes={{
							selectMenu: classes.selectMenu,
							select: classes.select,
						}}
					>
						{languages.map((lang) => {
							return (
								<MenuItem key={lang.code} value={lang.code} className={classes.menuItem}>
									{lang.name}
								</MenuItem>
							);
						})}
					</Select>
				</Button>
			</FormControl>
		</div>
	);
};

export default LanguageSwitcher;
