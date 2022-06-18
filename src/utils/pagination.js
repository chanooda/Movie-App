export const pagination = (currentPage = 1, data, setStateFn) => {
  // 영화 총 개수
  const totalCount = data.length;
  // 한 페이지 그룹의 개수
  const pageCount = 5;
  // 한 페이지당 영화 개수
  const limit = 5;
  // 총 페이지 개수
  let totalPage = Math.ceil(totalCount / limit);
  // 페이지 그룹의 개수
  let pageGroup = Math.ceil(currentPage / pageCount);
  // 현재 페이지 그룹의 마지막 페이지 번호
  let lastNumber = pageGroup * pageCount;

  // 마지막 번호를 토대로 첫 번호 지정
  let firstNumber;
  // 만약 마지막 그룹 페이지 인데 페이지가 모자란다면 마지막 번호는 모든 페이지의 끝 페이지
  if (lastNumber > totalPage) {
    lastNumber = totalPage;
    // 마지막 페이지가 다르기 때문에 다른 계산법을 통해 첫버호를 구한다.
    firstNumber = lastNumber - (5 - (pageGroup * pageCount - lastNumber)) + 1;
  } else {
    firstNumber = lastNumber - (pageCount - 1);
  }
  // 이전과 다음 의 페이지 번호 지정
  const next = lastNumber + 1;
  const prev = firstNumber - 1;
  // 목록 밑에 출력 페이지 번호들 배열에 담기
  let pageNums = [];
  for (let i = firstNumber; i <= lastNumber; i++) {
    pageNums.push(i);
  }
  // 현재 페이지 번호에 따라 데이터를 잘라 준다.
  const movies = data.slice(
    (currentPage - 1) * pageCount,
    (currentPage - 1) * pageCount + pageCount
  );

  // 페이지네이션에 필요한 정보들을 객체에 저장
  const info = {
    currentPage,
    movies,
    pageNums,
    next,
    prev,
    totalPage,
  };
  // State에 저장한다.
  setStateFn(info);
};
