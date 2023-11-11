import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import YoutubeIframe from '../components/YoutubeIframe';

const PlayListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [musicItem, setMusicItem] = useState(searchParams.get('musicId'));
  const { playlist, musicId } = useParams();
  const [playItemList, setPlayItemList] = useState([]);
  useEffect(() => {
    const getList = localStorage.getItem('youtubePlaylist');
    const isThisPlaylist =
      JSON.parse(getList || '').filter((f) => f.title == playlist) || [];
    if (isThisPlaylist?.length > 0) {
      setPlayItemList(isThisPlaylist[0]);
    }
  }, []);

  return (
    <>
      <YoutubeIframe
        playlist={playlist}
        musicItem={musicId}
        list={playItemList?.musicList}
      />
      <div>
        <ul>
          {playItemList?.musicList?.map((music, musicIdx) => (
            <li key={`music-${musicIdx}`}>{music.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PlayListPage;
