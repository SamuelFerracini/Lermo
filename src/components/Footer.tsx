import global from "../global.css";

import styles from "./Footer.module.css";

import { FaHeart } from "react-icons/fa";

export function Footer() {
  return (
    <div className={styles.wrapper}>
      <span>
        Feito com
        <FaHeart color="#ff1f32" />
        por <a href="">Samuel Ferracini</a>
      </span>
    </div>
  );
}
