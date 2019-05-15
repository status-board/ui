import React from 'react';
import {
    spring,
    TransitionMotion,
    TransitionPlainStyle,
} from 'react-motion';

import Wrapper from './Wrapper';
import { widgetWillEnter, widgetWillLeave } from './utilities';
import Widget from '../../containers/WidgetContainer';
import {
    Dashboard as DashboardType,
    Widget as WidgetType,
} from '../../types';
import { WidgetsRegistryType } from '../../WidgetsRegistry';


interface Props {
    dashboard: DashboardType;
    dashboardIndex: number;
    registry: WidgetsRegistryType;
}

interface Widget extends WidgetType {
    key: string;
    width: string;
    height: string;
    left: string;
    top: string;
}

export default function Dashboard(props: Props) {
    const {
        dashboard: { columns, rows, widgets: _widgets },
        dashboardIndex,
        registry,
    } = props;

    const widgets: Widget[] = _widgets.map((widget: WidgetType) => ({
        ...widget,
        key: `dashboard${dashboardIndex}.x${widget.x}.y${widget.y}`,
        width: `${(widget.columns / columns) * 100}%`,
        height: `${(widget.rows / rows) * 100}%`,
        left: `${(widget.x / columns) * 100}%`,
        top: `${(widget.y / rows) * 100}%`,
    }));

    return (
        <TransitionMotion
            willEnter={widgetWillEnter}
            willLeave={widgetWillLeave}
            styles={widgets.map((widget: Widget) => ({
                key: widget.key,
                data: widget,
                style: {
                    opacity: spring(1, {
                        stiffness: 60,
                        damping: 10,
                        precision: 0.1,
                    }),
                    x: spring(0, {
                        stiffness: 60,
                        damping: 10,
                        precision: 1,
                    }),
                },
            }))}
        >
            {styles => (
                <Wrapper>
                    {styles.map(({ key, data, style }: TransitionPlainStyle) => (
                        <div
                            key={key}
                            style={{
                                transformOrigin: '0 50%',
                                position: 'absolute',
                                width: data.width,
                                height: data.height,
                                top: data.top,
                                left: data.left,
                                opacity: style.opacity,
                                transform: `translate3d(${style.x}px,0,0)`,
                            }}
                        >
                            <Widget
                                extension={data.extension}
                                registry={registry}
                                widget={data.widget}
                                subscriptionId={data.subscriptionId}
                            />
                        </div>
                    ))}
                </Wrapper>
            )}
        </TransitionMotion>
    );
}
