import get from 'lodash/get';
import has from 'lodash/has';
import { connect } from 'react-redux';

import WidgetWrapper from '../components/WidgetWrapper';
import { RootState } from '../types';

const mapStateToProps = (
    state: RootState,
    { subscriptionId: id }: { subscriptionId: string },
) => {
    let apiData;
    let apiError;

    if (id) {
        if (has(get(state, 'data'), id)) {
            apiData = get(state, `data[${id}]`);
        }
        if (has(get(state, 'errors'), id)) {
            apiError = get(state, `errors[${id}]`);
        }
    }

    return {
        themeId: state.themes.current,
        apiData,
        apiError,
    };
};

export default connect(mapStateToProps)(WidgetWrapper);
