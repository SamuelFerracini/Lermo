import styles from "./Navbar.module.css";

import { FaGithub, FaLinkedin, FaQuestion } from "react-icons/fa";

export function Navbar() {
  const linkedinUrl = "https://www.linkedin.com/in/samuel-ferracini/";
  const githubUrl = "https://github.com/SamuelFerracini";
  const questionUrl = "https://github.com/SamuelFerracini/Lormo#como-jogar";

  const handleLinkedinRedirect = () => {
    window.open(linkedinUrl, "_blank");
  };

  const handleGithubRedirect = () => {
    window.open(githubUrl, "_blank");
  };

  const handleQuestionRedirect = () => {
    window.open(questionUrl, "_blank");
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.wrapIcons} ${styles.wrapLeft}`}>
        <FaLinkedin onClick={handleLinkedinRedirect} className={styles.icon} />
        <FaGithub onClick={handleGithubRedirect} className={styles.icon} />
      </div>

      <h1>Lermo</h1>

      <div className={`${styles.wrapIcons} ${styles.wrapRight}`}>
        <FaQuestion onClick={handleQuestionRedirect} className={styles.icon} />
      </div>
    </div>
  );
}
