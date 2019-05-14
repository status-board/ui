import React, { Component } from 'react';
import {
    WS_RETRY_DELAY,
    WS_STATUS_CONNECTED,
    WS_STATUS_DELAYING,
    WS_STATUS_FAILED,
} from '../store/socket-io/types';

const WS_RETRY_DELAY_SECONDS = WS_RETRY_DELAY / 1000;

interface Props {
    reconnectionAttempts: string | number;
    retryCount: number;
    status: string;
}

interface State {
    countdown: number;
}

class ConnectionStatus extends Component<Props, State> {
    public static defaultProps: { retryCount: 0 };

    private reconnectionAttempts: string | number;

    private timer: number | undefined;

    public constructor(props: Props) {
        super(props);
        this.reconnectionAttempts = props.reconnectionAttempts;
        this.state = { countdown: 0 };
    }

    public componentDidMount() {
        this.startCountDown();
    }

    public componentWillUnmount() {
        this.clearCountDown();
    }

    public clearCountDown() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    public startCountDown() {
        this.clearCountDown();

        this.setState({ countdown: WS_RETRY_DELAY_SECONDS });
        this.timer = window.setInterval(() => {
            const { countdown } = this.state;
            this.setState({ countdown: countdown - 1 });
        }, 1000);
    }


    public UNSAFE_componentWillReceiveProps(nextProps: Props) {
        if (this.timer) {
            clearInterval(this.timer);
        }

        const { retryCount } = this.props;

        if (retryCount < nextProps.retryCount) {
            this.startCountDown();
        }
    }

    public render() {
        const { status, retryCount } = this.props;
        const { countdown } = this.state;

        let message;
        let iconClass;
        const attemptsText = this.reconnectionAttempts !== 'Infinity' ? ` of ${this.reconnectionAttempts}` : '';
        if (status === WS_STATUS_CONNECTED) {
            iconClass = 'check';
            message = 'connection restored.';
        } else if (status === WS_STATUS_DELAYING) {
            iconClass = 'warning';
            message = (
                <span>
                    lost connection to Status Board server, will attempt to reconnect in
                    {' '}
                    {countdown}
                    s (
                    {retryCount}
                    {attemptsText}
                    {' '}
                    attempts so far).
                </span>
            );
        } else if (status === WS_STATUS_FAILED) {
            iconClass = 'frown-o';
            message = (
                <span>
                    unable to restore connection after
                    {' '}
                    {retryCount}
                    {' '}
                    attemps, please make sure Status Board
                    server is running and that you can reach the internet if running on a remote
                    server.
                </span>
            );
        }

        return (
            <div className="connection-status">
                <i className={`fa fa-${iconClass}`} />
                {message}
            </div>
        );
    }
}

export default ConnectionStatus;
