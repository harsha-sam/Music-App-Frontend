import React, { useRef, useEffect } from 'react';

const Selfie = () => {
    const videoRef = useRef(null);
    const getVideo = async() => {
        navigator.mediaDevices
        .getUserMedia({ video: { width: 300 } })
        .then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
            console.error("error:", err);
        });
    }
    useEffect(() => {
        getVideo();
    },[videoRef]);

    return <>
        <button>Snap it !!!</button>
        <video ref={videoRef}></video>
    </>
}
export default Selfie