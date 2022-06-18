import { useEffect, useState } from "react";
import { getMovieImage } from "../api/movieApi";
import styles from "../css/ChartMovie.module.css";
import { Link } from "react-router-dom";
import { dateFormat } from "../utils/utils";

function ChartMovie({ movieInfo, audCategory }) {
  console.log("rendered");
  const [movieImage, setMovieImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState(false);

  // 영화의 사진을 가져오기 위한 접근
  useEffect(() => {
    (async () => {
      const data = await getMovieImage(movieInfo.movieNm, dateFormat(movieInfo.openDt));
      setMovieImage(data);
      setLoading(false);
    })();
  }, [movieInfo.movieNm, movieInfo.openDt]);

  return (
    <Link
      to={"detail"}
      state={{
        title: movieInfo.movieNm,
        releaseDts: dateFormat(movieInfo.openDt),
      }}
    >
      {loading ? null : (
        <div>
          <div
            className={styles.imageContainer}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
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
        </div>
      )}
    </Link>
  );
}

export default ChartMovie;
