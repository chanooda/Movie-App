import { useEffect, useState } from "react";
import { getMovieImage } from "../api/movieApi";
import styles from "../css/ChartMovie.module.css";
import { Link } from "react-router-dom";
import { dateFormat } from "../utils/utils";

function ChartMovie({ movieInfo, audCategory }) {
  const [movieImage, setMovieImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState(false);
  // 영화의 사진을 가져오기 위한 접근
  useEffect(() => {
    (async () => {
      console.log(movieInfo);
      const data = await getMovieImage(movieInfo.movieNm, dateFormat(movieInfo.openDt));

      setMovieImage(data);
      setLoading(false);
      console.log(data);
    })();
  }, [movieInfo.movieNm, movieInfo.openDt]);

  return (
    <Link
      className={styles.chartMovieContainer}
      to={"detail"}
      state={{
        title: movieInfo.movieNm,
        // dateFormat : YYYY-MM-DD 형식의 날짜를 YYYYMMDD형식을 바꾸는 사용자 함수
        releaseDts: dateFormat(movieInfo.openDt),
      }}
    >
      {loading ? null : (
        <>
          <div
            className={styles.imageContainer}
            // 마우스 올리면 State true 내리면 false
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {/* hover State true 일 시 class  추가해 제목이 보이게 함 */}
            <div className={styles.movieTitle + " " + (hover ? styles.show : "")}>
              <span>{movieInfo.movieNm}</span>
            </div>
            <div className={styles.rank}>
              <span>{movieInfo.rank}</span>
            </div>
            {movieImage.errorMessage ? (
              <p className={styles.errorMessage}>이미지 로딩에 실패했습니다.</p>
            ) : (
              <img className={styles.chartMovie} alt="" src={movieImage} />
            )}
          </div>
          <div>
            <p className={styles.onedayAd}>
              {audCategory}
              <span className={styles.onedayAdCount}>
                {Number(movieInfo.audiCnt).toLocaleString()}명
              </span>
            </p>
          </div>
        </>
      )}
    </Link>
  );
}

export default ChartMovie;
