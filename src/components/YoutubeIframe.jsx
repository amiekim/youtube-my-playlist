import React from 'react';

const YoutubeIframe = (props) => {
  const { musicItem } = props;

  return (
    <>
      <iframe
        id="ytplayer"
        type="text/html"
        width="640"
        height="360"
        src={`https://www.youtube.com/embed/${musicItem}?autoplay=1`}
        frameBorder="0"
      ></iframe>
    </>
  );
};

export default YoutubeIframe;
