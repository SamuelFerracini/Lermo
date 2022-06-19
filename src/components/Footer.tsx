import styles from "./Footer.module.css";

import { FaHeart } from "react-icons/fa";

export function Footer() {
  const linkedinUrl = "https://www.linkedin.com/in/samuel-ferracini/";

  return (
    <div className={styles.wrapper}>
      <span>
        Feito com
        <FaHeart color="#ff1f32" />
        por <a href={linkedinUrl}>Samuel Ferracini</a>
      </span>
    </div>
  );
}
