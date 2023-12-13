import React from 'react'
import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  
} from "@mui/material";

import {
    Menu,
    AccountCircle,
    Brightness4,
    Brightness7,
  } from "@mui/icons-material";

import { Link } from "react-router-dom";

import useStyles from "./styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Navbar = () => {
  return (
    <>
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            style={{ outline: "none" }}
            onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
        )}
        <IconButton
          onClick={colorMode.toggleColorMode}
          color="inherit"
          sx={{ ml: 1 }}
        >
          {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        {!isMobile && <Search />}
        <div>
          {!isAuthenticated ? (
            <Button color="inherit" onClick={fetchToken}>
              Login &nbsp; <AccountCircle />
            </Button>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to={`/profile/${user.id}`}
              className={classes.linkButton}
            >
              {!isMobile && <>My Movies &nbsp;</>}
              <Avatar
                style={{ width: 30, height: 30 }}
                alt="Profile"
                src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
              ></Avatar>
            </Button>
          )}
        </div>
        {isMobile && <Search />}
      </Toolbar>
    </AppBar>
    <div>
      <nav className={classes.drawer}>
        {isMobile ? (
          <Drawer
            variant="temporary"
            anchor="right"
            open={mobileOpen}
            onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{ keepMounted: true }}
          >
            <Sidebar setMobileOpen={setMobileOpen} />
          </Drawer>
        ) : (
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            variant="permanent"
            open
          >
            <Sidebar setMobileOpen={setMobileOpen} />
          </Drawer>
        )}
      </nav>
    </div>
  </>
  )
}

export default Navbar