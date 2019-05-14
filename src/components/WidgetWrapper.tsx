import React, { Component, createElement } from 'react';
import omit from 'lodash/omit';
import { is } from 'immutable';
import { withTheme } from 'emotion-theming';
import { Theme } from '@status-board/theme-manager/lib/types';

import UnknowWidgetTypeError from './UnknowWidgetTypeError';
import shallowEqual from '../utilities/shallowEqual';
import { WidgetsRegistryType } from '../WidgetsRegistry';

const ignoreProps = ['extension', 'widget', 'registry', 'apiData', 'apiError'];

interface Props {
    apiData?: {};
    apiError?: {};
    extension: string;
    widget: string;
    subscriptionId?: string;
    theme: Theme;
    themeId: string;
    registry: WidgetsRegistryType;
}


class WidgetWrapper extends Component<Props> {
    public shouldComponentUpdate(nextProps: Props) {
        const { apiData, apiError } = this.props;
        return (
            !shallowEqual(omit(this.props, ignoreProps), omit(nextProps, ignoreProps))
            || !is(apiData, nextProps.apiData)
            || !is(apiError, nextProps.apiError)
        );
    }

    public render() {
        const {
            registry,
            extension,
            widget: type,
            apiData,
            apiError,
        } = this.props;
        let content;
        if (!registry.has(extension, type)) {
            content = <UnknowWidgetTypeError extension={extension} widget={type} />;
        } else {
            const component = registry.getComponent(extension, type);
            let childProps = Object.assign({}, omit(this.props, ignoreProps));
            if (apiData) {
                childProps = Object.assign(childProps, { apiData });
            }
            if (apiError) {
                childProps = Object.assign(childProps, { apiError });
            }
            content = createElement(component, childProps);
        }
        return content;
    }
}

export default withTheme(WidgetWrapper);
