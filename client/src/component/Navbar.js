import React from 'react'
import {Box, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';
const Navbar = () => {
    const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  return (
    <div>
        <Box width ={'100%'} p='1rem 6%' textAlign={'center'} sx={{boxShadow:3,mb:2,bgcolor:'purple',color:'white'}}>
            <Typography variant="h1" color={"white"} fontWeight="bold">
                AI GPT3 Clone
                </Typography>
                {loggedIn ? (
        <>
          <NavLink to="/" p={1}>
            Home
          </NavLink>
          <NavLink to="/login" p={1}>
            Logout
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/register" p={1}>
            Sign Up
          </NavLink>
          <NavLink to="/login" p={1}>
            Sign In
          </NavLink>
        </>
      )}
        </Box>
      
    </div>
  )
}

export default Navbar
