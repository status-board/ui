import React from 'react';
import { spring, TransitionMotion } from 'react-motion';
import Title from './Title';

const willEnter = () => ({ x: 30, opacity: 0 });
const willLeave = () => ({
    x: spring(0, { stiffness: 150, damping: 15 }),
    opacity: spring(0, { stiffness: 150, damping: 15 }),
});

interface DashboardTitleProps {
    currentDashboardIndex: number;
    title: string;
}

export default function DashboardTitle(props: DashboardTitleProps) {
    const { currentDashboardIndex, title } = props;

    const items = [{ key: currentDashboardIndex, title }];

    return (
        <TransitionMotion
            willEnter={willEnter}
            willLeave={willLeave}
            styles={items.map(item => ({
                key: `${item.key}`,
                data: item.title,
                style: {
                    x: spring(0, { stiffness: 60, damping: 15 }),
                    opacity: spring(1, { stiffness: 60, damping: 15 }),
                },
            }))}
        >
            {styles => (
                <div style={{ position: 'relative' }}>
                    {styles.map(({ key, data, style }) => (
                        <Title
                            key={key}
                            style={{
                                transform: `translate(${style.x}px,0)`,
                                opacity: style.opacity,
                            }}
                        >
                            {data}
                        </Title>
                    ))}
                </div>
            )}
        </TransitionMotion>
    );
}
