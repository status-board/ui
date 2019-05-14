import { connect } from 'react-redux';
import Notifications from '../components/notifications/Notifications';
import { RootState } from '../types';

const mapStateToProps = (state: RootState) => {
    const {
        notifications: { items },
        themes: { current: themeId },
    } = state;

    return {
        notifications: items,
        // not used but needed to force refresh of context
        themeId,
    };
};

export default connect(
    mapStateToProps,
)(Notifications);
