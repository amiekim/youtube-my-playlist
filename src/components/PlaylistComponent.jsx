import React, { useEffect, useState } from 'react';
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
    if (list.length > 5)
      return alert('플레이리스트는 5개까지 만들 수 있어요.(ㆁωㆁ*)');
    let arrSeq = e.target.id.split('-');
    let btnSeq = arrSeq[arrSeq.length - 1];
    if (!musicId.display && Number(btnSeq) > -1) {
      if (!list[btnSeq]?.musicList || list[btnSeq].musicList.length > 20) {
        return alert('플레이리스트 당 20곡까지 (ㆁωㆁ*)');
      }
      setMusicId({
        display: !musicId.display,
        listSeq: Number(btnSeq),
        id: '',
      });
    } else
      setMusicId({
        display: false,
        listSeq: 0,
        id: '',
      });
  };
  const handleSaveItem = async () => {
    if (!musicId || !musicId.id)
      return alert(
        '입력란 아래를 참조해서 유튜브 아이디를 넣어주세요.(ㆁωㆁ*)'
      );
    if (musicId?.id?.length > 12)
      return alert(
        '입력란 아래를 참조해서 유튜브 아이디를 입력해주세요.(ㆁωㆁ*)'
      );
    let aleadyIsId = {};
    if (musicId.listSeq > -1 && list[musicId.listSeq]?.musicList) {
      for (let i = 0; i < list[musicId.listSeq]?.musicList.length; i++) {
        if (list[musicId.listSeq].musicList[i].id === musicId.id) {
          aleadyIsId = {
            ...list[musicId.listSeq].musicList[i],
            listSeq: musicId.listSeq,
          };
          break;
        }
      }
    }
    let tempId = {};
    let getIdInfo = false;

    if (aleadyIsId.length > 0) {
      tempId = { ...aleadyIsId };
    } else {
      tempId = { ...musicId };
      const fakeData = new YoutubeApis();
      getIdInfo = await fakeData.youtubeItemDetail(musicId.id);
    }

    if (aleadyIsId || getIdInfo) {
      if (tempId.listSeq != -1 && tempId.id) {
        let temp = [...list];
        temp[tempId.listSeq].musicList.push({
          itemKey: Math.floor(Math.random() * 1000) + '--' + tempId.id,
          id: tempId.id,
          title: aleadyIsId?.title || getIdInfo.snippet.title,
        });
        setList([...temp]);
        setMusicId({ display: false, listSeq: -1, id: '' });
        const listTojson = JSON.stringify(list);
        window.localStorage.setItem('youtubePlaylist', listTojson);
      }
    } else {
      alert('유튜브 아이디를 v=값을 확인해주세요.(ㆁωㆁ*)');
    }
  };
  const handleDelItem = (e) => {
    e.preventDefault();
    const eventBtn =
      e.target.parentNode?.id && e.target.parentNode.id.includes('item-del')
        ? e.target.parentNode
        : e.target.id && e.target.id.includes('item-del')
        ? e.target
        : false;

    if (!eventBtn) return;

    let tempList = list;
    let tempListSeq =
      Number(eventBtn.dataset.listseq) > -1 && Number(eventBtn.dataset.listseq);
    if (tempListSeq > -1) {
      tempList[tempListSeq].musicList = tempList[tempListSeq].musicList.filter(
        (f, fIdx) =>
          !(
            f.id == eventBtn.dataset.itemid && eventBtn.id == `item-del-${fIdx}`
          )
      );
      setList([...tempList]);
      localStorage.setItem('youtubePlaylist', JSON.stringify([...tempList]));
    }
  };
  const handleDown = (e) => {
    e.preventDefault();
    const eventBtn =
      e.target.parentNode?.id && e.target.parentNode.id.includes('item-down')
        ? e.target.parentNode
        : e.target.id && e.target.id.includes('item-down')
        ? e.target
        : false;

    if (!eventBtn) return;

    let tempMusicList = [];
    let tempListSeq =
      Number(eventBtn.dataset.listseq) > -1 && Number(eventBtn.dataset.listseq);
    let tempitemSeq =
      Number(eventBtn.dataset.itemseq) > -1
        ? Number(eventBtn.dataset.itemseq)
        : -1;
    if (typeof tempListSeq == 'number' && tempListSeq > -1) {
      tempMusicList = list[tempListSeq].musicList;
      if (tempitemSeq > -1 && tempitemSeq + 1 < tempMusicList.length) {
        const tempItem = { ...tempMusicList[tempitemSeq + 1] };
        const tempList = list;
        tempList.musicList = tempMusicList.splice(
          tempitemSeq + 1,
          1,
          tempMusicList[tempitemSeq]
        );
        tempList.musicList = tempMusicList.splice(tempitemSeq, 1, tempItem);
        setList([...tempList]);
        localStorage.setItem('youtubePlaylist', JSON.stringify([...tempList]));
      }
    }
  };
  const handleUp = (e) => {
    e.preventDefault();
    const eventBtn =
      e.target.parentNode?.id && e.target.parentNode.id.includes('item-up')
        ? e.target.parentNode
        : e.target.id && e.target.id.includes('item-up')
        ? e.target
        : false;
    if (!eventBtn) return;

    let tempMusicList = [];
    let tempListSeq =
      Number(eventBtn.dataset.listseq) > -1 && Number(eventBtn.dataset.listseq);
    let tempitemSeq =
      Number(eventBtn.dataset.itemseq) > -1
        ? Number(eventBtn.dataset.itemseq)
        : -1;

    if (typeof tempListSeq == 'number' && tempListSeq > -1) {
      tempMusicList = list[tempListSeq].musicList || [];

      if (tempitemSeq > 0) {
        const tempItem = { ...tempMusicList[tempitemSeq - 1] };
        const tempList = list;
        tempList.musicList = tempMusicList.splice(
          tempitemSeq - 1,
          1,
          tempMusicList[tempitemSeq]
        );
        tempList.musicList = tempMusicList.splice(tempitemSeq, 1, tempItem);
        setList([...tempList]);
        localStorage.setItem('youtubePlaylist', JSON.stringify([...tempList]));
      }
    }
  };
  const goPlaylist = (item) => {
    if (item?.musicList?.length > 0 && item?.musicList[0].id) {
      navigate(
        `/playlist/${item.regDate + '-' + item.playlistKey}/${
          item.musicList[0].itemKey
        }`
      );
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
        <div
          key={`${item.title}-${idx}`}
          className="rounded-md p-4 my-4 shadow-lg bg-[#4649FF] bg-opacity-10"
        >
          <p
            className="cursor-pointer font-bold text-2xl text-[#4649FF]"
            onClick={() => goPlaylist(item)}
          >
            {item.title}
          </p>
          <ul>
            {item?.musicList?.map((music, musicIdx) => (
              <li
                className="flex justify-between items-center my-3"
                key={`music-${musicIdx}`}
              >
                <div className="whitespace-nowrap text-ellipsis overflow-hidden">
                  {music.title}
                </div>
                <div className="flex">
                  <button
                    className={`rounded-md shadow-lg p-2 text-[${
                      musicIdx < 1 ? '#4649ff2c' : '#4649FF'
                    }]`}
                    data-listseq={idx}
                    data-itemid={music.id}
                    data-itemseq={musicIdx}
                    id={`item-up-${musicIdx}`}
                    disabled={musicIdx < 1}
                    onClick={handleUp}
                  >
                    <i className="ri-arrow-up-fill"></i>
                  </button>
                  <button
                    className={`rounded-md shadow-lg p-2 ${
                      musicIdx + 1 >= item.musicList.length
                        ? 'text-[#4649ff2c]'
                        : 'text-[#4649FF]'
                    }`}
                    id={`item-down-${musicIdx}`}
                    data-listseq={idx}
                    data-itemid={music.id}
                    data-itemseq={musicIdx}
                    disabled={musicIdx + 1 >= item.musicList.length}
                    onClick={handleDown}
                  >
                    <i className="ri-arrow-down-fill"></i>
                  </button>
                  <button
                    className="rounded-md shadow-lg p-2 text-[#4649FF]"
                    id={`item-del-${musicIdx}`}
                    data-listseq={idx}
                    data-itemid={music.id}
                    onClick={handleDelItem}
                  >
                    <i className="ri-file-reduce-line"></i>
                  </button>
                </div>
              </li>
            ))}
            {musicId.display && musicId.listSeq == idx && (
              <div>
                <div className="flex mt-5 my-2 justify-between">
                  <input
                    id="input-save"
                    className="grow rounded-md p-2 mr-2 shadow-lg placeholder-gray-500"
                    type="text"
                    value={musicId.id}
                    onChange={(e) => {
                      setMusicId({
                        ...musicId,
                        id: e.target.value,
                      });
                    }}
                  />
                  <button
                    id="btn-save-item"
                    className="w-fit rounded-md p-2 shadow-lg text-[#4649FF]"
                    onClick={handleSaveItem}
                  >
                    저장
                  </button>
                </div>
                <span>
                  <i className="text-[#4649FF] ri-information-line"></i>
                  /watch?v=<span className="bold text-[#FF0000]">AABBBCCC</span>
                  &t=1s
                </span>
              </div>
            )}
            <div className="flex justify-end">
              <button
                id={`item-add-${idx}`}
                onClick={handleAddItem}
                className="rounded-md shadow-lg p-2 text-[#4649FF]"
              >
                {musicId.display && musicId.listSeq == idx ? '닫기' : '추가'}
              </button>
            </div>
          </ul>
        </div>
      ))}
    </>
  );
};

export default PlaylistComponent;
