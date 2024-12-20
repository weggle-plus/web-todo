import styles from "../../styles/Sidebar.module.css";

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <button className={styles.sidebarButton}>할 일 목록</button>
    </div>
  );
};

export default Sidebar;
