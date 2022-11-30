import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function RatingSIze(props) {
    return (
        <Stack spacing={1}>

            <Rating name="size-large"  defaultValue={props.rank} size="large" />

        </Stack>
    );
}