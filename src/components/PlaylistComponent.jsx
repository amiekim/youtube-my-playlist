import React, { useEffect } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { YoutubeApis } from '../api/youtube';

const PlaylistComponent = (props) => {
  const navigate = useNavigate();

  const { list, setList, musicId, setMusicId } = props;
  // const { isLoading, isError, data, error } = useQuery('musicInfo', () => {
  //   const fakeData = new YoutubeApis();
  //   return fakeData.youtubeItemDetail();
  // });
  const handleAddItem = (e) => {
    let arrSeq = e.target.id.split('-');
    let btnSeq = arrSeq[arrSeq.length - 1];
    if (!musicId.display && Number(btnSeq) > -1)
      setMusicId({
        display: !musicId.display,
        listSeq: Number(btnSeq),
        id: '',
      });
    else
      setMusicId({
        display: false,
        listSeq: 0,
        id: '',
      });
  };
  const handleEditItem = (music, musicIdx) => {
    setMusicId({ display: true, listSeq: musicIdx, id: music.id });
  };
  const handleSaveItem = async () => {
    const fakeData = new YoutubeApis();
    const getIdInfo = await fakeData.youtubeItemDetail(musicId.id);
    if (getIdInfo && musicId.listSeq != -1 && musicId.id) {
      let temp = list;
      temp[musicId.listSeq].musicList.push({
        id: musicId.id,
        title: getIdInfo.snippet.title,
      });
      setList([...temp]);
      setMusicId({ display: false, listSeq: -1, id: '' });
      const listTojson = JSON.stringify(list);
      window.localStorage.setItem('youtubePlaylist', listTojson);
    }
  };
  const handleDelItem = (e) => {
    let tempList = list;
    let tempListSeq =
      Number(e.target.dataset.listseq) > -1 && Number(e.target.dataset.listseq);
    if (tempListSeq > -1) {
      tempList[tempListSeq].musicList = tempList[tempListSeq].musicList.filter(
        (f) => f.id != e.target.dataset.itemid
      );
      setList([...tempList]);
      localStorage.setItem('youtubePlaylist', JSON.stringify([...tempList]));
    }
  };

  useEffect(() => {
    const isPlaylist = localStorage.getItem('youtubePlaylist')
      ? JSON.parse(localStorage.getItem('youtubePlaylist'))
      : [];
    setList(isPlaylist);
  }, []);

  return (
    <>
      {list?.map((item, idx) => (
        <div key={`${item.title}-${idx}`}>
          <p
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (item?.musicList?.length > 0 && item?.musicList[0].id) {
                navigate(
                  `/playlist/${item.title}?musicId=${item.musicList[0].id}`
                );
              }
            }}
          >
            {item.title}
          </p>
          <ul>
            {item?.musicList?.map((music, musicIdx) => (
              <li key={`music-${musicIdx}`}>
                <div>{music.title}</div>
                <button
                  id={`item-edit-${musicIdx}`}
                  onClick={() => handleEditItem(music, musicIdx)}
                >
                  edit
                </button>
                <button
                  id={`item-del-${musicIdx}`}
                  data-listseq={idx}
                  data-itemid={music.id}
                  onClick={handleDelItem}
                >
                  del
                </button>
              </li>
            ))}
            {musicId.display && musicId.listSeq == idx && (
              <div>
                <input
                  type="text"
                  value={musicId.id}
                  onChange={(e) =>
                    setMusicId({
                      ...musicId,
                      id: e.target.value,
                    })
                  }
                />
                <button onClick={handleSaveItem}>save</button>
              </div>
            )}
            <button id={`item-add-${idx}`} onClick={handleAddItem}>
              {musicId.display ? '닫기' : '추가'}
            </button>
          </ul>
        </div>
      ))}
    </>
  );
};

export default PlaylistComponent;
