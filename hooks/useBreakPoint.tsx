import { useState, useEffect } from "react";
import throttle from "lodash.throttle";

const getDeviceConfig = (width) => {
    if (width < 320) {
        return "xxs";
    } else if (width >= 320 && width < 450) {
        return "xs";
    } else if (width >= 450 && width < 720) {
        return "sm";
    } else if (width >= 720 && width < 850) {
        return "smd";
    } else if (width >= 850 && width < 1024) {
        return "md";
    } else if (width >= 1024) {
        return "lg";
    }
};

const useBreakpoint = () => {
    const [breakPoint, setBreakPoint] = useState(() =>
        getDeviceConfig(window.innerWidth)
    );

    useEffect(() => {
        const calcInnerWidth = throttle(function () {
            setBreakPoint(getDeviceConfig(window.innerWidth));
        }, 200);
        window.addEventListener("resize", calcInnerWidth);
        return () => window.removeEventListener("resize", calcInnerWidth);
    }, []);

    return breakPoint;
};
export default useBreakpoint;
