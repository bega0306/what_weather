import React from 'react';
import './Loader.css';

function Loader({active}) {
    return(
        <div id="fixed_loading_panel" className={active}>
            <h2 className="loading_msg">Loading...</h2>
            <div className="loftloader-wrapper loader-square">
                <div className="loader">
                    <span><span></span></span>
                </div>
            </div>
            <p>이 사이트는 사용자의 위치 정보를 사용합니다!</p>
        </div>
    );
}

export default Loader;