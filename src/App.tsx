import React from 'react';
import { ThemeManager } from '@status-board/theme-manager';
import { Provider } from 'react-redux';
import StatusBoard from './containers/StatusBoardContainer';
import { configureStore } from './store';
import ThemeProvider from './components/ThemeProvider';
import reducer from './store/root-reducer';

const options = {
    reducer,
};

const store = configureStore(options);

const StatusBoardWrapper = () => (
    <Provider store={store}>
        <ThemeProvider current={ThemeManager.defaultTheme} themes={ThemeManager.listThemes()}>
            <StatusBoard />
        </ThemeProvider>
    </Provider>
);

export default StatusBoardWrapper;
