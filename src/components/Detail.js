import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { DetailMovieApi } from "../api/movieApi";
import { replaceText } from "../utils/replaceText";
import { dateFormat } from "../utils/utils";

import DetailImages from "./DetailImages";
import Layout from "../Layout";
import styles from "../css/Detail.module.css";

function Detail() {
  const location = useLocation();

  const { title, releaseDts } = location.state;

  const [movieDetail, setMovieDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [actorsMore, setActorsMore] = useState(false);

  const moreClick = () => {
    setActorsMore((prev) => !prev);
  };

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
                <h3>{movieDetail.title.trim().replace(/(\s!HE\s)|(\s!HS\s)|(!HS)|(!HE)/g, "")}</h3>
                <span>{movieDetail.titleEng}</span>
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
                        {actorsMore ? " 접기" : " 더보기"}
                      </span>
                    </span>
                  </div>
                  <div>
                    <span className={styles.red}>줄거리</span>
                    {replaceText(movieDetail.plots.plot[0].plotText)
                      .split("\n")
                      .map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                  </div>

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
                <img src={movieDetail.posters.split("|")[0]} alt="" />
              </div>
            </div>
          </div>
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
