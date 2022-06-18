import { memo, useState } from "react";
import { naverMovieSearch } from "../api/movieApi";
import SearchedMovie from "./SearchedMovie";
import styles from "../css/SearchMovies.module.css";
import { pagination } from "../utils/pagination";

function SearchMovies() {
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({});
  const onChange = (e) => {
    setKeyword(e.target.value.trim());
  };

  // Input 입력 후 전송하면 실행
  const onSubmit = async (e) => {
    // 새로고침 막기
    e.preventDefault();
    // 빈 값이면 취소
    if (keyword === "") return;
    // Input 창 초기화
    setKeyword("");
    // api 데이터 가져오기
    const data = await naverMovieSearch(keyword);

    setResults(data);
    // 첫 검색 시 페이지네이션 함수
    pagination(1, data, setPaginationInfo);
    setLoading(false);
  };

  return (
    <div className={styles.searchedMoviesContainer}>
      <form onSubmit={onSubmit} className={styles.searchForm}>
        <input onChange={onChange} value={keyword} type="text" />
        <input type="submit" value="검색" />
      </form>
      {loading ? null : (
        <div>
          <ul className={styles.searchedMoviesList}>
            {paginationInfo.movies.map((el, i) => (
              <li key={i}>
                <SearchedMovie movie={el} />
              </li>
            ))}
          </ul>
          <ul className={styles.pageNumbers}>
            {/* prev 버튼과 next 버튼과 현재 페이지 번호들을 출력 onClick 리스너로 페이지네이션 함수를 실행 */}
            {/* 각각의 페이지 번호를 인자로 보내 자신의 페이지 번호를 중심으로 새로운 페이지네이션을 실행한다. */}
            {/* 자신의 번호가 현재 페이지 번호일 때에는 클릭 시 함수를 실행하지 않는다. */}
            {paginationInfo.prev < 1 ? null : (
              <li onClick={() => pagination(paginationInfo.prev, results, setPaginationInfo)}>
                이전
              </li>
            )}
            {paginationInfo.pageNums.map((el, i) => (
              <li
                className={paginationInfo.currentPage === el ? styles.infoKey : ""}
                key={i}
                onClick={
                  paginationInfo.currentPage !== el
                    ? () => pagination(el, results, setPaginationInfo)
                    : null
                }
              >
                {el}
              </li>
            ))}
            {paginationInfo.next >= paginationInfo.totalPage ? null : (
              <li onClick={() => pagination(paginationInfo.next, results, setPaginationInfo)}>
                다음
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

// 박스오피스 Component 변화로 인한 리렌더링 방지
export default memo(SearchMovies);
