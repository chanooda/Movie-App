import { Link } from "react-router-dom";
import styles from "../css/SearchMovies.module.css";
import { dateFormat } from "../utils/utils";

function SearchedMovie({ movie }) {
  const title = movie.title.replace(/[<b></b>]/g, "");
  const director = movie.director.replace(/[|]$/g, "").replace(/[|]/g, ", ");
  const actors = movie.actor.replace(/[|]$/g, "").replace(/[|]/g, ", ");
  return (
    <Link
      to="detail"
      state={{
        title,
        // dateFormat : YYYY-MM-DD 형식의 날짜를 YYYYMMDD형식을 바꾸는 사용자 함수
        releaseDts: dateFormat(movie.pubDate),
      }}
    >
      <div className={styles.searchedMovieContainer}>
        <div>
          {movie.image === "" ? (
            <span>이미지가 없습니다.</span>
          ) : (
            <img alt={title + " 이미지"} src={movie.image} />
          )}
        </div>
        <div className={styles.movieInfo}>
          <h3>{title}</h3>
          <p>
            <span className={styles.infoKey}>개봉년도</span> {movie.pubDate}
          </p>
          <p>
            <span className={styles.infoKey}>감독</span> {director}
          </p>
          <p>
            <span className={styles.infoKey}>배우</span> {actors}
          </p>
          <p>
            <span className={styles.infoKey}>유저평점</span> {movie.userRating}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default SearchedMovie;
