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
      <div className="flex justify-center">
        <div className="flex flex-col items-center s-mobile:w-320 mobile:w-360 tablet:w-640 laptop:w-900">
          <div className="relative flex justify-center pt-[56.25%] h-full w-full">
            <YoutubeIframe
              playlist={playlist}
              musicItem={musicId}
              list={playItemList?.musicList}
            />
          </div>
          <ul className="rounded-md p-4 my-4 shadow-lg bg-[#4649FF] bg-opacity-10 h-full w-full">
            {playItemList?.musicList?.map((music, musicIdx) => (
              <li
                key={`music-${musicIdx}`}
                className="whitespace-nowrap text-ellipsis overflow-hidden"
              >
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
