import React from 'react';
import { Widget, WidgetBody, WidgetHeader } from '@status-board/components';

interface UnknowWidgetTypeErrorProps {
    extension: string;
    widget: string;
}

export default function UnknowWidgetTypeError(props: UnknowWidgetTypeErrorProps) {
    const { extension, widget } = props;
    return (
        <Widget>
            <WidgetHeader title="Error" icon="warning" />
            <WidgetBody style={{ padding: '2vmin' }}>
                <p>
                    Unknown widget &quot;
                    {widget}
                    &quot; for extension &quot;
                    {extension}
                    &quot;.
                </p>
                <p>
                    Please make sure you installed the corresponding package (should be
                    &quot;status-board-ext-
                    {extension}
                    &quot;) and the package provides a &quot;
                    {widget}
                    &quot; widget.
                </p>
            </WidgetBody>
        </Widget>
    );
}
