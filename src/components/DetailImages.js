import { useState } from "react";
import styles from "../css/Detail.module.css";

function DetailImages({ images, title }) {
  const [count, setCount] = useState(1);
  const [slide, setSlide] = useState(false);
  const [sliding, setSliding] = useState(false);
  const fullCount = Math.ceil(images.length / 6);

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
                <img
                  className={title === "포스터" ? styles.posterImage : styles.stillImage}
                  key={i}
                  src={el}
                  alt={title + " 이미지"}
                ></img>
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
