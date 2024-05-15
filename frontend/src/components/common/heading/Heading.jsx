// Heading.js
import React from "react";
import styles from "./Heading.css";

const Heading = ({ subtitle, title }) => {
  return (
    <div id='heading' className={styles.heading}>        
      <h1 className={styles.title}>{title}</h1>
      <h3 className={styles.subtitle}>{subtitle}</h3>
    </div>
  );
}

export default Heading;