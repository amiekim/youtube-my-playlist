import React from 'react';
import { Form } from 'react-router-dom';

const PlaylistForm = (props) => {
  const { title, setTitle, keywords, setKeywords, list, setList } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    keywords.split();
    setList([...list, { title, musicList: [], keywords }]);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          id="keywords"
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="#봄#비내릴때"
        />
        <button>저장</button>
      </Form>
    </>
  );
};

export default PlaylistForm;
