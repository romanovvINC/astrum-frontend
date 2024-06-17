import React, { useEffect, useState } from "react";

const Loader = () => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(false);
        }, 3000);

        return () => {
            clearTimeout(timeout);
        };
    }, [show]);
    return (
        <div className={`loader-wrapper ${show ? "" : "loaderhide"}`}>
            <div className="loader">
                <div className="loader-bar"></div>
                <div className="loader-bar"></div>
                <div className="loader-bar"></div>
                <div className="loader-bar"></div>
                <div className="loader-bar"></div>
                <div className="loader-ball"></div>
            </div>
        </div>
    );
};
export default Loader;
