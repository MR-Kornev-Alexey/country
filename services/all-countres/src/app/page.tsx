import styles from "./page.module.css";
import {Box} from "@mui/material";
import React from "react";

export default function Home() {
  return (
    <Box className={styles.page}>
      <main className={styles.main}>
        hhhh
      </main>
      <footer className={styles.footer}>
           <div>
             Designed by <a href="mailto:alex@mrk.digtal"> Kornev Alexey</a>
           </div>
      </footer>
    </Box>
  );
}
