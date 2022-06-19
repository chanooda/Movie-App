import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { DetailMovieApi } from "../api/movieApi";
import { replaceText } from "../utils/replaceText";
import { dateFormat } from "../utils/utils";

import DetailImages from "./DetailImages";
import styles from "../css/Detail.module.css";
import Layout from "../Layout";

function Detail() {
  // Link 태그의 props들을 가져올 수 있다.
  const location = useLocation();
  // Link 태그의 props들을 가져올 수 있다.
  const { title, releaseDts } = location.state;

  const [movieDetail, setMovieDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [actorsMore, setActorsMore] = useState(false);

  // 배우 더보기 이벤트
  const moreClick = () => {
    setActorsMore((prev) => !prev);
  };

  // 제목과 생성일자를 인자로 넘겨 API 접근
  useEffect(() => {
    (async () => {
      const data = await DetailMovieApi(title, releaseDts);
      setMovieDetail(data);
      setLoading(false);
    })();
  }, [releaseDts, title]);

  return (
    <Layout>
      {loading ? (
        "loading..."
      ) : (
        <div className={styles.detailContainer}>
          <div className={styles.info}>
            <div>
              <div className={styles.title}>
                {/* 제공되는 제목에 불필요한 문자를 제거하고 공백을 수정한다. */}
                <h3>{movieDetail.title.trim().replace(/(\s!HE\s)|(\s!HS\s)|(!HS)|(!HE)/g, "")}</h3>
                <span>{movieDetail.titleEng}</span>
                {/* 기본 정보 한줄로 출력 장르는 콤마를 기준으로 배열로 나누어 출력 */}
                <p>
                  {movieDetail.nation} | {movieDetail.rating} | {movieDetail.runtime}분 |{" "}
                  {movieDetail.genre.replace(",", ", ")} |{" "}
                  {`${dateFormat(movieDetail.repRlsDate)}(개봉)`}
                </p>
                <hr />
              </div>
              <div className={styles.infoText}>
                <div>
                  <div>
                    <span className={styles.red}>감독</span>
                    <span>
                      {/* 감독명 모두 출력 마지막 이름에는 콤마 제거 */}
                      {movieDetail.directors.director.map((el, i) => (
                        <span key={i}>
                          {i === movieDetail.directors.director.length - 1
                            ? `${el.directorNm}`
                            : `${el.directorNm}, `}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div>
                    <span className={styles.red}>배우</span>
                    <span>
                      {/* 배우 목록 기본 5명 더보기 버튼 클릭시 30명 */}
                      {actorsMore
                        ? movieDetail.actors.actor
                            .slice(0, 30)
                            .map((el, i) => (
                              <span key={i}>
                                {i === movieDetail.actors.actor.slice(0, 30).length - 1
                                  ? `${el.actorNm}`
                                  : `${el.actorNm}, `}
                              </span>
                            ))
                        : movieDetail.actors.actor
                            .slice(0, 5)
                            .map((el, i) => (
                              <span key={i}>
                                {i === movieDetail.actors.actor.slice(0, 5).length - 1
                                  ? `${el.actorNm}`
                                  : `${el.actorNm}, `}
                              </span>
                            ))}
                      <span className={styles.more} onClick={moreClick}>
                        {/* 더보기 버튼 */}
                        {actorsMore ? " 접기" : " 더보기"}
                      </span>
                    </span>
                  </div>
                  <div>
                    <span className={styles.red}>줄거리</span>
                    {/* 줄거리 데이터 가공 함수 특정 문자에 따라 줄바꿈을 한다. */}
                    {replaceText(movieDetail.plots.plot[0].plotText)
                      .split("\n")
                      .map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                  </div>
                  {/* 키워드 데이터 출력 */}
                  {movieDetail.keywords ? (
                    <div>
                      <span className={styles.red}>키워드</span>
                      <ul className={styles.keywords}>
                        {movieDetail.keywords.split(",").map((el, i) => (
                          <li className={styles.keyword} key={i}>
                            #{el}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
                {/* 해당 영화의 대표 이미지 */}
                <img src={movieDetail.posters.split("|")[0]} alt="" />
              </div>
            </div>
          </div>
          {/* 해당 영화에 포스터와 스틸샷 이미지 슬리이드 컴포넌트 */}
          <div>
            <DetailImages title="포스터" images={movieDetail.posters.split("|")} />
            <DetailImages title="스틸샷" images={movieDetail.stlls.split("|")} />
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Detail;
