import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { styled } from '@mui/system';

// Styles for the navbar links to align with Material UI components
const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit', // Inherits the color from the parent component, useful for theming
  marginLeft: 10,
  marginRight: 10,
});

const StyledAppBar = styled(AppBar)({
  marginBottom: 20, // Adds some space between the navbar and the content below
});

export default function Faculty() {
  return (
    <>
    <br></br><br></br><br></br>
      <StyledAppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Faculty Management
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button color="inherit" component={StyledLink} to="addfaculty">Add Faculty</Button>
              <Button color="inherit" component={StyledLink} to="viewfaculty">View Faculty</Button>
              <Button color="inherit" component={StyledLink} to="updatefaculty">Update Faculty</Button>
              <Button color="inherit" component={StyledLink} to="deletefaculty">Delete Faculty</Button>
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
}
