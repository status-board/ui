import React from 'react';
import {
    InfoIcon,
    Widget,
    WidgetBody,
    WidgetHeader,
    WidgetLabel,
} from '@status-board/components';
import Registry from '../WidgetsRegistry';
import formatUptime from '../utilities/format-uptime';
import { Subscription } from '../store/api/types';

interface Props {
    apiData?: {
        apis: any[];
        clientCount: number;
        uptime: number;
    };
}

const Inspector = ({ apiData }: Props) => {
    const items = [];

    items.push(
        <WidgetLabel
            key="widgets"
            label="widgets"
            prefix={Registry.widgetsCount()}
            style={{}}
            suffix={<span>Suffix Icon</span>}
        />,
    );

    if (apiData) {
        items.push(
            <WidgetLabel
                key="apis"
                label="APIs"
                prefix={apiData.apis.length}
                style={{}}
                suffix={<span>Suffix Icon</span>}
            />,
        );
        items.push(
            <WidgetLabel
                key="clients"
                label="connected clients"
                prefix={apiData.clientCount}
                style={{}}
                suffix={<span>Suffix Icon</span>}
            />,
        );
        items.push(
            <WidgetLabel
                key="uptime"
                label={`uptime: ${formatUptime(apiData.uptime)}`}
                style={{}}
                suffix={<span>Suffix Icon</span>}
            />,
        );
    }

    return (
        <Widget style={{}}>
            <WidgetHeader
                title={<span>Status Board</span>}
                subject="inspector"
                subjectPlacement="append"
                icon={InfoIcon}
            />
            <WidgetBody
                style={{
                    padding: '1.6vmin 2vmin',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    alignContent: 'stretch',
                    justifyContent: 'space-around',
                }}
            >
                {items}
            </WidgetBody>
        </Widget>
    );
};

Inspector.getApiRequest = (): Subscription => ({ id: 'statusBoard.inspector' });

export default Inspector;
