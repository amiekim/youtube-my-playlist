import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';

const YoutubeIframe = (props) => {
  const { playlist, musicItem, list } = props;
  const navigate = useNavigate();
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };
  const onReady = (event) => {
    event.target.pauseVideo();
  };
  const onPlayerStateChange = (event) => {
    if (event?.data === 0) {
      const currentIndex = list.findIndex((f) => f.id == musicItem);
      if (currentIndex > -1 && list.length - 1 > currentIndex)
        navigate(`/playlist/${playlist}/${list[currentIndex + 1].id}`);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <YouTube
        videoId={musicItem}
        opts={opts}
        onReady={onReady}
        onStateChange={onPlayerStateChange}
      />
    </>
  );
};

export default YoutubeIframe;
