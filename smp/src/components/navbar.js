import React, { useState } from 'react';
import { AppBar, Button, Toolbar, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [facultyAnchorEl, setFacultyAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const facultyOpen = Boolean(facultyAnchorEl);

  const handleCourseClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFacultyClick = (event) => {
    setFacultyAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setFacultyAnchorEl(null);
  };

  return (
    <div style={{ backgroundColor: 'lightseagreen' }}>
      <AppBar position="static">
        <Toolbar>
          <Button sx={{ color: 'inherit' }} component={Link} to="/">
            Home
          </Button>
          <Button
            sx={{ color: 'inherit', ml: 2 }}
            aria-controls={open ? 'course-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleCourseClick}
          >
            Courses
          </Button>
          <Menu
            id="course-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem component={Link} to="/add" onClick={handleClose}>Add Course</MenuItem>
            <MenuItem component={Link} to="/view" onClick={handleClose}>View Course</MenuItem>
          </Menu>
          <Button
            sx={{ color: 'inherit', ml: 2 }}
            aria-controls={facultyOpen ? 'faculty-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={facultyOpen ? 'true' : undefined}
            onClick={handleFacultyClick}
          >
            Faculty
          </Button>
          <Menu
            id="faculty-menu"
            anchorEl={facultyAnchorEl}
            open={facultyOpen}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem component={Link} to="/faculty/addfaculty" onClick={handleClose}>Add Faculty</MenuItem>
            <MenuItem component={Link} to="/faculty/viewfaculty" onClick={handleClose}>View Faculty</MenuItem>
            <MenuItem component={Link} to="/faculty/editfaculty" onClick={handleClose}>Edit Faculty</MenuItem>
            <MenuItem component={Link} to="/faculty/deletefaculty" onClick={handleClose}>Delete Faculty</MenuItem>
          </Menu>
          <Button sx={{ color: 'inherit', ml: 2 }} component={Link} to="/students">
            Students
          </Button>
          <Button sx={{ color: 'inherit', ml: 2 }} component={Link} to="/register">
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
