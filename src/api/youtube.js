import axios from 'axios';

export class YoutubeApis {
  constructor() {}

  //   #키를 붙이면 프라이빗
  async youtubeItemDetail(id) {
    // return axios
    //   .get('/test.json')
    console.log(
      'process.env.REACT_APP_YOUTUBE_API_KEY:',
      process.env.REACT_APP_YOUTUBE_API_KEY
    );
    return axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
      )
      .then(async (response) => {
        if (response.data?.items[0]?.id === id) return response.data.items[0];
        else return false;
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
      });
    //   .finally(function () {
    //     // 항상 실행되는 영역
    //   });
  }

  async searchItemDetail(id) {
    this.youtubeItemDetail(id);
  }
}
