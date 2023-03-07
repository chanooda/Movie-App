import { useEffect, useState } from "react";
import { oneDayMovieChart, weekMovieChart } from "../api/movieApi";
import ChartMovie from "./ChartMovie";
import styles from "../css/MovieChart.module.css";

function MovieChart() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [oneDayAud, setOneDayAud] = useState(true);
  const [weekendAud, setWeekendAud] = useState(false);
  const [weekdayAud, setWeekdayAud] = useState(false);

  // 네비게이션 클릭 시 onClick EventHandler
  const getMovieData = async (category = "oneday") => {
    // 정보를 받아오는 중에는 클릭 반환
    if (loading) return;
    // 로딩 실행
    setLoading(true);
    let data;
    // 일일 오피스 박스
    if (category === "oneday") {
      // 현재 나타내는 정보이면 취소
      if (oneDayAud === true) {
        setLoading(false);
        return;
      }
      data = await oneDayMovieChart();

      // 네비게이션 상태 관리
      setOneDayAud(true);
      setWeekendAud(false);
      setWeekdayAud(false);
    } else if (category === "weekend") {
      if (weekendAud === true) {
        setLoading(false);
        return;
      }
      data = await weekMovieChart();
      setOneDayAud(false);
      setWeekendAud(true);
      setWeekdayAud(false);
    } else if (category === "weekday") {
      if (weekdayAud === true) {
        setLoading(false);
        return;
      }
      data = await weekMovieChart("2");
      setOneDayAud(false);
      setWeekendAud(false);
      setWeekdayAud(true);
    }
    // 받아온 정보 State에 지정

    setMovies(data);
    // 로딩 끝
    setLoading(false);
  };

  //첫 렌더링 시에만 실행됨
  useEffect(() => {
    (async () => {
      const data = await oneDayMovieChart();

      setMovies(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <div className={styles.movieChartContainer}>
        {/* 정보 변화를 위한 네비게이션 */}
        <nav>
          <ul className={styles.audCountTab}>
            {/* 클릭 시 해당 정보를 불러옴 */}
            <li onClick={() => getMovieData()} className={oneDayAud ? styles.pickedTab : ""}>
              일별
            </li>
            <li
              onClick={() => getMovieData("weekend")}
              className={weekendAud ? styles.pickedTab : ""}
            >
              주말
            </li>
            <li
              onClick={() => getMovieData("weekday")}
              className={weekdayAud ? styles.pickedTab : ""}
            >
              주중
            </li>
          </ul>
        </nav>
        {/* 로딩 시에는 로딩중임을 나타내고 끝나면 정보들 화면에 보여줌 */}
        {loading ? (
          <strong>Loading...</strong>
        ) : (
          <div className={styles.movieChartMovies}>
            {/* 박스오피스 정보가 없을 시에는 에러 메세지를 띄어주고 있으면 각각의 영화정보를 나타내는 Component로 전달 */}
            {movies ? (
              movies.map((movie) => (
                <ChartMovie
                  key={movie.movieCd}
                  movieInfo={movie}
                  audCategory={oneDayAud ? "하루관객" : weekdayAud ? "주중관객" : "주말관객"}
                ></ChartMovie>
              ))
            ) : (
              <p>정보 불러오기에 실패했습니다.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieChart;
