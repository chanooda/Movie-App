// 영화진흥위원회 API Key
const API_KEY = process.env.REACT_APP_API_KEY;

// 하루 박스오피스 순위
// async/await 를 이용해 비동기 함수를 동기화 처리한다.
export const oneDayMovieChart = async () => {
  //하루 전 날짜 계산
  const date = new Date();
  date.setDate(date.getDate() - 1);
  // 정규식을 통해 yyyymmdd 형식 만들기
  const targetDate = date.toISOString().substring(0, 10).replace(/-/g, "").replace();
  const url = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${API_KEY}&targetDt=${targetDate}`;
  try {
    const response = await fetch(url);
    const json = await response.json();
    const data = json.boxOfficeResult?.dailyBoxOfficeList;
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
// 주중, 주말 박스오피스 순위
// async/await 를 이용해 비동기 함수를 동기화 처리한다.
export const weekMovieChart = async (weekGb = "1") => {
  // 오늘 날에 7일을 빼 저번주의 정보를 가져올 수 있게 날짜 파라미터 설정
  const date = new Date();
  date.setDate(date.getDate() - 7);
  // 정규식을 통해 yyyymmdd 형식 만들기
  const targetDate = date.toISOString().substring(0, 10).replace(/-/g, "").replace();
  const url = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${API_KEY}&targetDt=${targetDate}&weekGb=${weekGb}`;
  try {
    const response = await fetch(url);
    const json = await response.json();
    const data = json.boxOfficeResult?.weeklyBoxOfficeList;
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
// 네이버 검색 api 백엔드로 부터 받아옴
export const naverMovieSearch = async (keyword) => {
  const response = await fetch(`http://localhost:5000/api/movie/search?keyword=${keyword}`);
  const json = await response.json();

  if (json.errorMessage) {
    return json;
  }
  return json;
};
//영화 이미지를 받아옴
export const getMovieImage = async (keyword, releaseDts) => {
  const url = `http://localhost:5000/api/movie/getImage?title=${keyword}&releaseDts=${releaseDts}`;
  const response = await fetch(url);
  const json = await response.json();
  if (json.errorMessage) {
    return json;
  }
  return json.Data[0].Result[0].posters.split("|")[0];
};
// 영화 상세 정보 API
export const DetailMovieApi = async (title, releaseDts) => {
  const apiUrl = `http://localhost:5000/api/movie/getMovieInfo?title=${title}&releaseDts=${releaseDts}`;
  const response = await fetch(apiUrl);
  const json = await response.json();
  return json.Data[0].Result[0];
};
