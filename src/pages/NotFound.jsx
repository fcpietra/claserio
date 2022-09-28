import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function NotFound() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh'
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid xs={6}>
                        <Typography variant="h1">
                            404
                        </Typography>
                        <Typography variant="h6">
                            The page you’re looking for doesn’t exist.
                        </Typography>
                        <Button href="/" variant="contained">Back Landing</Button>
                    </Grid>
                    <Grid xs={6}>
                        <img
                            src="img/404.png"
                            alt=""
                            width={500} height={400}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}