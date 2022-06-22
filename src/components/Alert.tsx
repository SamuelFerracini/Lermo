import { useAppStore } from "../stores/app";

import styles from "./Alert.module.css";

export function Alert() {
  const isAlertVisible = useAppStore((state) => state.isAlertVisible);

  return (
    <div className={`${styles.wrapper} ${isAlertVisible ? "" : styles.hide}`}>
      Palavra desconhecida
    </div>
  );
}
