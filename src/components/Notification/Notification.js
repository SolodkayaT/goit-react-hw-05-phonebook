import React from "react";
import styles from "./Notification.module.css";

export default function Notification() {
  return (
    <p className={styles.NotificationMessage}>
      Contact is allready in contacts!
    </p>
  );
}
