import styles from "../css/page.module.css";
import React from "react";
import MainScreen from "@/components/main";

export default function Home() {

    return (
    <div>
      <MainScreen />
      <footer className={styles.footer}>
           <div>
             Designed by <a href="mailto:alex@mrk.digtal"> Kornev Alexey</a>
           </div>
      </footer>
    </div>
  );
}
