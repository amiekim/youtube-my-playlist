import React from 'react';
import YouTube from 'react-youtube';

const YoutubeIframe = (props) => {
  const { youtubeRef, musicKey, goNext } = props;

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
    <div className="relative flex justify-center pt-[56.25%] h-full w-full">
      <YouTube
        ref={youtubeRef}
        className="absolute top-0 left-0x h-full w-full"
        videoId={musicKey}
        opts={opts}
        onReady={onReady}
        onStateChange={onPlayerStateChange}
      />
    </div>
  );
};

export default YoutubeIframe;
