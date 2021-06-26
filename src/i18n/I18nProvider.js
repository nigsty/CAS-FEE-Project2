import React, { useContext } from 'react';
import { IntlProvider } from 'react-intl';
import { AppStateContext } from '../AppStateProvider';

import localeData from './data.json';

const defaultLocale = 'de';

const I18nProvider = ({ children }) => {
	const [{ language }] = useContext(AppStateContext);
	const messages = localeData[language] || localeData[defaultLocale];
	return (
		<IntlProvider locale={language} messages={messages} defaultLocale={defaultLocale}>
			{children}
		</IntlProvider>
	);
};

export default I18nProvider;
