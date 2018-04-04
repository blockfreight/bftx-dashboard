import React from 'react';
import {Tracker} from 'meteor/tracker';
import {Image} from 'react-bootstrap';

export default function getTrackerLoader(reactiveMapper) {
    return (props, onData, env) => {
        let trackerCleanup = null;
        const handler = Tracker.nonreactive(() => {
            return Tracker.autorun(() => {
              trackerCleanup = reactiveMapper(props, onData, env);
            });
        });

        return () => {
            if (typeof trackerCleanup === 'function') trackerCleanup();
            return handler.stop();
        };
    };
}

export const options = {
    loadingHandler: () => (
        <div className="wrap-loader">
            <div className="loader">
                <span>
                    <Image height="100px" src="/img/ajax-loader.gif"/>
                </span>
            </div>
        </div>
    )
};
