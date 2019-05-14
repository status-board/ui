import produce, { Draft } from 'immer';
import get from 'lodash/get';
import has from 'lodash/has';
import map from 'lodash/map';
import omit from 'lodash/omit';
import merge from 'lodash/merge';
import set from 'lodash/set';
import setWith from 'lodash/setWith';
import {
    API_ALL_UNSUBSCRIBED,
    API_DATA, API_FAILURE,
    API_SUBSCRIBE,
    API_SUBSCRIBED,
    API_UNSUBSCRIBE,
    ApiState,
} from './types';

const baseState: ApiState = {
    subscriptions: {},
    data: {},
    errors: {},
};

const configuration = (
    state = baseState,
    action: any,
) => produce(state, (draft: Draft<ApiState>) => {
    switch (action.type) {
        case API_SUBSCRIBE:
            if (has(draft, `subscriptions[${action.subscription.id}]`)) {
                return draft;
            }

            return set(draft, `subscriptions[${action.subscription.id}]`, {
                id: action.subscription.id,
                hasSubscribed: false,
            });

        case API_SUBSCRIBED:
            if (!has(get(draft, 'subscriptions'), action.subscription.id)) {
                return draft;
            }

            return setWith(draft, `subscriptions[${action.subscription.id}].hasSubscribed`, true);

        case API_ALL_UNSUBSCRIBED:
            return map(get(draft, 'subscriptions'), subscription => setWith(subscription, 'hasSubscribed', false));

        case API_UNSUBSCRIBE:
            if (!has(get(draft, 'subscriptions'), action.id)) {
                return draft;
            }

            return omit(draft, `subscriptions[${action.id}]`);

        case API_DATA: {
            return set(omit(draft, `errors[${action.id}]`), `data[${action.id}]`, action.data);
        }

        case API_FAILURE:
            return merge(draft.errors[action.id], action.data);

        default:
            return draft;
    }
});

export default configuration;
