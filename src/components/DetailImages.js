import { useEffect, useState } from "react";
import styles from "../css/Detail.module.css";

function DetailImages({ images, title }) {
  //처음 부분과 마지막 부분을 체크하고 애니메이션 관리
  const [count, setCount] = useState(1);
  //처음 다음 버튼 클릭시 class를 지정해주는 State
  const [slide, setSlide] = useState(false);
  // 이벤트 실행 중에 추가 이벤트를 막는 State
  const [sliding, setSliding] = useState(false);
  // 렌더링시 현재 width 700보다 밑이면
  const [mQuery, setMQuery] = useState(window.innerWidth < 700 ? true : false);
  const fullCount = mQuery ? Math.ceil(images.length / 3) : Math.ceil(images.length / 5);

  //미디어 쿼리 실행되면 true
  const screenChange = (event) => {
    const matches = event.matches;
    setMQuery(matches);
  };
  // 첫 레더링시 width 정보를 state에 전달
  useEffect(() => {
    // 미디어 쿼리가 실행된 상태면 true 전달
    let mql = window.matchMedia("screen and (max-width:700px)");
    mql.addEventListener("change", screenChange);
    return () => mql.removeEventListener("change", screenChange);
  }, []);

  // 버튼 클릭 시 class 지정하고 count 변화 sliding 중에는 return
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
            // count에 따라 애니메이션 실행
            transform: slide ? `translateX(${(count - 1) * 100 * -1}%)` : "",
          }}
          onTransitionEnd={() => {
            setSliding(false);
          }}
        >
          {/* 이미지 없으면 메시지 출력 */}
          {images[0] !== ""
            ? images.map((el, i) => (
                <img className={styles.posterImage} key={i} src={el} alt={title + " 이미지"}></img>
              ))
            : "이미지가 존재하지 않습니다."}
        </div>
        {/* count에 따라 버튼 지정 */}
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
