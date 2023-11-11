import React, { useState } from 'react';
import Header from '../components/Header';
import { Form } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import PlaylistComponent from '../components/PlaylistComponent';
import PlaylistForm from '../components/PlaylistForm';

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

  return (
    <>
      {/* 최신 yarn을 사용하면 모든 패키지들이 노드모듈로 들어오지 않아서 자동
      임포트가 안되기도 한다. */}
      <Header />
      <section>
        <PlaylistForm
          title={title}
          setTitle={setTitle}
          keywords={keywords}
          setKeywords={setKeywords}
          list={list}
          setList={setList}
        />
      </section>

      <section>
        <PlaylistComponent
          list={list}
          setList={setList}
          musicId={musicId}
          setMusicId={setMusicId}
        />
      </section>
      <footer></footer>
    </>
  );
};

export default Home;
