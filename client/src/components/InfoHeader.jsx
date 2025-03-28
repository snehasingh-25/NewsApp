import React from 'react';
import { Box, Typography, styled } from '@mui/material';

const Container = styled(Box)`
    background:rgb(62, 117, 93);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
`;

const InfoHeader = ({ location = "INDIA" }) => {  // Default to "Indian Times"
    return (
        <Container>
            <Typography variant="h4" component="h1">
                THE {location?.toUpperCase()} TIMES
            </Typography>
        </Container>
    );
};

export default InfoHeader;
