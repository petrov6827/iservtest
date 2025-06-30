import React from 'react';
import { Container, Box } from '@mui/material';
import Header from './Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Container component="main">
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
