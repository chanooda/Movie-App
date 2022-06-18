// 영화진흥위원회 API Key
const API_KEY = process.env.REACT_APP_API_KEY;
const KMDB_API_KEY = process.env.REACT_APP_KMDB_API_KEY;

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

  // API 정보가 제대로 전달 되지 않으면 에러 메세지를 그래도 보내 처리한다.
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

//영화 이미지를 받아옴
export const getMovieImage = async (keyword, releaseDts) => {
  const url = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&listCount=1`;
  const query = `&ServiceKey=${KMDB_API_KEY}&title=${keyword}&releaseDts=${releaseDts}`;
  const response = await fetch(url + query);
  const json = await response.json();
  if (json.errorMessage) {
    return json;
  }
  return json.Data[0].Result[0].posters.split("|")[0];
};

// 네이버 검색 api 백엔드로 부터 받아옴
export const naverMovieSearch = async (keyword) => {
  const response = await fetch(`https://localhost:5000/api/search?keyword=${keyword}`);
  const json = await response.json();

  if (json.errorMessage) {
    return json;
  }
  return json;
};

// 영화 상세 정보 API
export const DetailMovieApi = async (title, releaseDts) => {
  const url = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&listCount=1`;
  const query = `&ServiceKey=${KMDB_API_KEY}&title=${title}&releaseDts=${releaseDts}`;
  const response = await fetch(url + query);
  const json = await response.json();

  return json.Data[0].Result[0];
};
