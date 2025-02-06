'use client'
import {Box, Checkbox, FormControlLabel, FormGroup, Stack, Typography} from "@mui/material";
import EnhancedTable from "@/components/table";
import handleSendToApiBackend from "@/api/handle-send-to-api";


export default function Home() {
    const handleSendToApi=async (selected) => {
        console.log(selected)
        await handleSendToApiBackend(selected)
    }
  return (
      <Stack spacing={3}>
          <Box sx={{ marginTop: 3, marginX: "auto" }}>
              <Typography variant="h3" sx={{textAlign: "center", textTransform: "uppercase"}}>
                  Список стран и используемых в них валют
              </Typography>
          </Box>
          <Box>
              <Box>
                  <EnhancedTable handleSendToApi={handleSendToApi} />
              </Box>
          </Box>
      </Stack>
  );
}
