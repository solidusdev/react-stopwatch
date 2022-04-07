import React, { Fragment, useEffect, useState } from "react";

const StopWatch = () => {

    const [seconds, setSeconds] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [reset, setReset] = useState(false);

    const start_timer = () => {
        setIsTimerActive(true);
    }

    const stop_timer = () => {
        setIsTimerActive(false);
    }

    const reset_timer = () => {
        setSeconds(0);
        setIsTimerActive(false);
        setReset(false);
    }
    
    useEffect(() => {
        let timer = null;
        
        // check to see if the start button was pressed
        if (isTimerActive === true) {

            // if so, start incrementing by +1 every second and save it to "timer"
            timer = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);

            // enable the option to reset once the timer starts
            setReset(true);
        }
        
        // clearing the interval when the stop button is pressed
        else if (isTimerActive === false && seconds !== 0) {
            clearInterval(timer);
            setReset(true);
        }
        
        // needed to increment in order, otherwise it'll be: 1 -> 3 -> 7 -> 15
        return () => clearInterval(timer);
    }, [isTimerActive, seconds]);


    return(
        <Fragment>
            <div className="outer">
                <div className="inner">
                    <h1>React StopWatch</h1>
                    <h1 id="timer">{Math.floor(seconds / 3600)}:{Math.floor(seconds / 60)}:{Math.floor(seconds % 60)}</h1>
                    <div id="buttons-container">
                        <button onClick={start_timer} disabled={isTimerActive}>Start</button>
                        <button onClick={stop_timer} disabled={!isTimerActive}>Stop</button>
                        <button onClick={reset_timer} disabled={!reset}>Reset</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default StopWatch;