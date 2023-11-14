import React, { useEffect } from 'react';
import YouTube from 'react-youtube';

const YoutubeIframe = (props) => {
  const { list, youtubeRef, musicKey, goNext } = props;

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };
  const onReady = (event) => {
    // event.target.cuePlaylist(
    //   list.map((i) => i.id),
    //   0,
    //   0,
    //   null
    // );
    // event.target.pauseVideo();
    event.target.playVideo();
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
        key={musicKey}
        videoId={musicKey}
        opts={opts}
        onReady={onReady}
        onStateChange={onPlayerStateChange}
      />
      {/* <button
        className="absolute top-[500px]"
        onClick={async () => {
          console.log('e:', youtubeRef.current.internalPlayer);
          let testResult =
            await youtubeRef.current.internalPlayer.getPlaylist();
          console.log('testResult:', testResult);
        }}
      >
        테스트 버튼
      </button> */}
    </div>
  );
};

export default YoutubeIframe;
