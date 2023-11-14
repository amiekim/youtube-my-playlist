import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';

const YoutubeIframe = (props) => {
  const { musicKey, goNext } = props;
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };
  // w-320 mobile:w-360 tablet:w-640 laptop:w-900
  // 0.5625
  // 16:9
  const onReady = (event) => {
    event.target.pauseVideo();
  };
  const onPlayerStateChange = (event) => {
    if (event?.data === 0) {
      goNext();
    }
  };

  return (
    <YouTube
      className="absolute top-0 left-0x h-full w-full"
      videoId={musicKey}
      opts={opts}
      onReady={onReady}
      onStateChange={onPlayerStateChange}
    />
  );
};

export default YoutubeIframe;
