import React, { useState } from 'react';
import Header from '../components/Header';
import { Form } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import PlaylistComponent from '../components/PlaylistComponent';

const Home = () => {
  // Create a client
  const queryClient = new QueryClient();
  const [title, setTitle] = useState('');
  const [musicId, setMusicId] = useState({
    display: false,
    listSeq: -1,
    id: '',
  });
  const [keywords, setKeywords] = useState('');
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    keywords.split();
    setList([...list, { title, musicList: [], keywords }]);
  };

  return (
    <>
      {/* 최신 yarn을 사용하면 모든 패키지들이 노드모듈로 들어오지 않아서 자동
      임포트가 안되기도 한다. */}
      <Header />
      <main className="flex justify-center">
        <div className="s-mobile:w-320 mobile:w-360 tablet:w-640 laptop:w-900 flex flex-col">
          <p className="text-center font-['Lobster'] text-5xl tablet:text-7xl py-5 bg-gradient-to-r from-[#1D1CE5] via-[#7978FF] to-[#C47AFF] text-transparent inline-block text-transparent bg-clip-text">
            Simple Playlist
          </p>
          <section>
            <Form className="flex flex-col" onSubmit={handleSubmit}>
              <input
                className="rounded-md p-3 mb-3 border border-solid border-[#4649FF] placeholder-gray-500"
                id="title"
                type="text"
                value={title}
                placeholder="플레이리스트 제목"
                onChange={(e) => setTitle(e.target.value)}
              />

              {/* <input
                id="keywords"
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="#봄#비내릴때"
              /> */}
              <button className="rounded-md py-2 mb-5 bg-gradient-to-tr from-[#1D1CE5] via-[#7978FF] to-[#C47AFF] text-white">
                저장
              </button>
            </Form>
          </section>

          <section>
            <PlaylistComponent
              list={list}
              setList={setList}
              musicId={musicId}
              setMusicId={setMusicId}
            />
          </section>
        </div>
      </main>

      <footer></footer>
    </>
  );
};

export default Home;
