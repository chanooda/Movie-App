import { useEffect, useState } from "react";
import styles from "../css/Detail.module.css";

function DetailImages({ images, title }) {
  const [count, setCount] = useState(1);
  const [slide, setSlide] = useState(false);
  const [sliding, setSliding] = useState(false);
  const [mQuery, setMQuery] = useState(window.innerWidth < 700 ? true : false);
  const fullCount = mQuery ? Math.ceil(images.length / 3) : Math.ceil(images.length / 5);

  const screenChange = (event) => {
    const matches = event.matches;
    setMQuery(matches);
  };
  // 첫 레더링시 width 정보를 state에 전달
  useEffect(() => {
    let mql = window.matchMedia("screen and (max-width:700px)");
    mql.addEventListener("change", screenChange);
    return () => mql.removeEventListener("change", screenChange);
  }, []);

  const buttonOnClick = (method) => {
    if (sliding) return;
    setSliding(true);
    if (method === "next") {
      setCount((prev) => prev + 1);
      setSlide(true);
    } else {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <div className={styles.imageSliders}>
      <h4>{title}</h4>
      <div className={styles.imageContainer}>
        <div
          className={styles.images}
          style={{
            transform: slide ? `translateX(${(count - 1) * 100 * -1}%)` : "",
          }}
          onTransitionEnd={() => {
            setSliding(false);
          }}
        >
          {images[0] !== ""
            ? images.map((el, i) => (
                <img className={styles.posterImage} key={i} src={el} alt={title + " 이미지"}></img>
              ))
            : "이미지가 존재하지 않습니다."}
        </div>
        {count !== fullCount ? (
          <button
            onClick={() => {
              buttonOnClick("next");
            }}
            className={styles.next}
          >
            {">"}
          </button>
        ) : null}
        {count !== 1 ? (
          <button onClick={() => buttonOnClick("prev")} className={styles.prev}>
            {"<"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
export default DetailImages;
