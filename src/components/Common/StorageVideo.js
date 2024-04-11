
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { Storage } from 'aws-amplify';

const StorageVideo = ({videoKey}) => {
    const videoRef = useRef();
    const [videoPath, setVideoPath] = useState();

    useEffect(() => {
        getVideoUrl(videoKey);
    }, [videoKey]
    )

    const getVideoUrl = async (key) => {
        const path = await Storage.get(
            key,
            {
                expires: 3600
            }
        );
        setVideoPath(path);
        console.log("Video load")
        videoRef.current?.load();
    }


    return (
        <>
        <video className='amplify-image' preload='none' ref={videoRef} controls>
        <source 
        src={videoPath} type="video/mp4">
        </source>
        Your browser does not support the video tag.
        </video>
        </>

    );
};

StorageVideo.propTypes = {
    videoKey: PropTypes.string
};

export default StorageVideo;
