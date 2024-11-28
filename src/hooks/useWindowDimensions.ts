import { useState, useEffect } from 'react';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function isMobileCondition() {
    const { width } = getWindowDimensions()
    return !(width >= 431)
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [isMobile, setIsMobile] = useState(isMobileCondition())

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
            setIsMobile(isMobileCondition())
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { ...windowDimensions, isMobile };
}