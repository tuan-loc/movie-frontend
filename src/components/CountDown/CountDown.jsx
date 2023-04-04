import React, {memo} from 'react';
import Countdown from 'react-countdown';
import {Redirect} from "react-router-dom";

function CountDown(props) {
    const renderer = ({hours, minutes, seconds, completed}) => {
        if (completed) {
            // Render a completed state
            return <Redirect to='/'/>
        } else {
            // Render a countdown
            return <p className='text-right font-bold text-red-600 text-2xl mr-4'>{minutes}:{seconds}</p>
        }
    };
    return <Countdown
        date={Date.now() + 300000}
        renderer={renderer}
    />
}

export default memo(CountDown)