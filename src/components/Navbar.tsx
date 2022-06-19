import styles from "./Navbar.module.css";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Navbar() {
  const linkedinUrl = "https://www.linkedin.com/in/samuel-ferracini/";
  const githubUrl = "https://github.com/SamuelFerracini";

  const handleLinkedinRedirect = () => {
    window.open(linkedinUrl, "_blank");
  };

  const handleGithubRedirect = () => {
    window.open(githubUrl, "_blank");
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <FaLinkedin
          onClick={handleLinkedinRedirect}
          className={styles.icon}
          size={32}
        />
        <FaGithub
          onClick={handleGithubRedirect}
          className={styles.icon}
          size={32}
        />
      </div>

      <h1>Lormo</h1>
    </div>
  );
}
