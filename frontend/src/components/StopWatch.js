import React from 'react'
import { useStopwatch } from 'react-timer-hook';
import moment from 'moment'
import { Typography } from '@mui/material';
const StopWatch = ({ diff }) => {
    let stopwatchOffset = new Date();

    stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + diff);
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: true, offsetTimestamp: stopwatchOffset });

    const format = () => {

        if (days) {
            return `${days} days and ${hours} hours since`
        }
        else if (hours) {
            return `${hours} hours and ${minutes} minutes since`
        }
        else {
            return `${minutes} minutes since`
        }
    }
    return (
        <div>
            <Typography fontSize={20}  >
                {format()}
            </Typography>
        </div>
    )
}

export default StopWatch