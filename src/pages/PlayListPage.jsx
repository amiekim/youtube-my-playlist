import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import YoutubeIframe from '../components/YoutubeIframe';

const PlayListPage = () => {
  const navigate = useNavigate();
  const { playlist, musicId } = useParams();
  const [playItemList, setPlayItemList] = useState([]);
  const [musicKey, setMusicKey] = useState('');

  const youtubeRef = useRef();

  const goNext = () => {
    const currentIndex = playItemList?.musicList.findIndex(
      (f) => f.id == musicKey
    );
    if (
      currentIndex > -1 &&
      playItemList?.musicList.length - 1 > currentIndex
    ) {
      navigate(
        `/playlist/${playlist}/${
          playItemList?.musicList[currentIndex + 1].itemKey
        }`
      );
      // reload
      navigate(0);
    }
  };

  useEffect(() => {
    const getList = localStorage.getItem('youtubePlaylist');
    const isThisPlaylist =
      JSON.parse(getList || '').filter(
        (f) => f.regDate + '-' + f.playlistKey == playlist
      ) || [];
    if (isThisPlaylist?.length > 0) {
      setPlayItemList(isThisPlaylist[0]);
    }
    if (musicId?.includes('--')) {
      setMusicKey(musicId.split('--')[1]);
    }
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col items-center s-mobile:w-320 mobile:w-360 tablet:w-640 laptop:w-900">
          <YoutubeIframe
            goNext={goNext}
            musicKey={musicKey}
            youtubeRef={youtubeRef}
            // list={playItemList?.musicList}
          />
          <ul className="cursor-pointer rounded-md p-4 my-4 shadow-lg bg-[#4649FF] bg-opacity-10 h-full w-full">
            {playItemList?.musicList?.map((music, musicIdx) => (
              <li
                key={`music-${musicIdx}`}
                className={`whitespace-nowrap text-ellipsis overflow-hidden text-[${
                  music.itemKey === musicId ? '#4649FF' : '#000'
                }]`}
                onClick={() => {
                  if (youtubeRef?.current) {
                    youtubeRef.current.internalPlayer?.pauseVideo();
                    navigate(`/playlist/${playlist}/${music.itemKey}`);
                    navigate(0);
                  }
                }}
              >
                {music.itemKey === musicId && <i className="ri-play-fill"></i>}
                {music.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PlayListPage;
