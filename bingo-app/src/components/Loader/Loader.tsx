import styles from "./loader.module.css";

// Componente para mostrar un loader de carga
export default function Loader() {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
}
