'use client'
import React from "react";
import dynamic from 'next/dynamic'
import {Container} from "@mui/material";

const Footer = dynamic(() => import('../components/footer'), { ssr: false })
const MainScreen = dynamic(() => import('../components/main'), { ssr: false })

export default function Home() {

    return (
    <Container maxWidth="md">
      <MainScreen />
      <Footer/>
    </Container>
  );
}
