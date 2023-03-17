import React from "react";
import PropTypes from "prop-types";

const VideoEmbed = (url: string | undefined) => (
    <div className="video-responsive">
        <iframe
            width="853"
            height="480"
            src={url}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
    </div>
);

VideoEmbed.propTypes = {
    url: PropTypes.string.isRequired
};

export default VideoEmbed;