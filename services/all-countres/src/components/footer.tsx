'use client'
import React from "react";
import {Stack} from "@mui/material";
export default function Footer() {
    return (
        <Stack spacing={2} display="flex" justifyContent="center" alignItems="center" sx={{marginY:4}}>
            <div>
                Designed by <a href="mailto:alex@mrk.digtal"> Kornev Alexey</a>
            </div>
        </Stack>
    )
}
