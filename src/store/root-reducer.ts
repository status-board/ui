import { combineReducers } from 'redux';
import api from './api/reducer';
import configuration from './configuration/reducer';
import dashboards from './dashboards/reducer';
import notifications from './notifications/reducer';
import ws from './socket-io/reducer';
import themes from './themes/reducer';

export default combineReducers({
    api,
    configuration,
    dashboards,
    notifications,
    ws,
    themes,
});
