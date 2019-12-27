import React from 'react';
import './Loader.css';

function Loader({active, msg}) {
    return(
        <div id="fixed_loading_panel" className={active}>
            <h2 className="loading_msg">Loading...</h2>
            <div className="loftloader-wrapper loader-square">
                <div className="loader">
                    <span><span></span></span>
                </div>
            </div>
            <p>{msg}</p>
        </div>
    );
}

export default Loader;