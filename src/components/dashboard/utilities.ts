import {
    PlainStyle,
    spring,
    Style,
    TransitionStyle,
} from 'react-motion';

export const widgetWillEnter = ({ data }: TransitionStyle): PlainStyle => ({
    opacity: 0,
    x: 200 * (data.x + 1),
});

export const widgetWillLeave = (): Style => ({
    opacity: spring(0, { stiffness: 120, damping: 15, precision: 0.1 }),
    x: spring(-60, { stiffness: 120, damping: 15, precision: 1 }),
});
