import {
  AppBar,
  Typography,
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Drawer,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import ElevationScroll from './ElevationScroll';
import MenuIcon from '@mui/icons-material/Menu';
import useStyles from '../utils/muiStyles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { showToast } from '../utils/functions';
import { useNavigate } from 'react-router-dom';

const Nav = (props) => {
  const classes = useStyles();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setMobileMenu(open);
  };

  useEffect(() => {
    user.id ? setLoggedIn(true) : setLoggedIn(false);
  }, [user.id]);

  const signOut = () => {
    window.location.reload(false);
    showToast('success', 'Goodbye!👋');
  };

  const navigate_to_profile = () => {
    navigate('/profile', {state : {source : 'from_dashboard'}});
  }

  const navigate_to_dashboard = () => {
    navigate('/dashboard');
  }

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {loggedIn ? (
          <ListItem button onClick={() => signOut()}>
            <ListItemText primary="Sign Out" />
          </ListItem>
        ) : (
          <Link to="/login">
            <ListItem button>
              <ListItemText primary="Log in" />
            </ListItem>
          </Link>
        )}
      </List>
    </Box>
  );

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ marginBottom: '70px' }}>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar className={classes.toolBar}>
            {loggedIn ? (
                <Link to="/dashboard">
                  <Typography variant="h6" className={classes.logo}>
                    Invoicer
                  </Typography>
                </Link>):(
                <Link to="/">
                  <Typography variant="h6" className={classes.logo}>
                    Invoicer
                  </Typography>
                </Link>
            )}

            {matches ? (
              <Box>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon className={classes.menuIcon} fontSize="large" />
                </IconButton>

                <Drawer
                  anchor="right"
                  open={mobileMenu}
                  onClose={toggleDrawer(false)}
                >
                  {list('right')}
                </Drawer>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexGrow: '0.05',
                }}
              >
                {loggedIn ? (
                  <>
                    <Typography
                      className={classes.link}
                      onClick={() => navigate_to_dashboard()}
                    >
                      Home
                    </Typography>
                    <Typography
                      className={classes.link}
                      onClick={() => navigate_to_profile()}
                    >
                      Profile
                    </Typography>
                    <Typography
                      className={classes.link}
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </Typography>
                  </>
                ) : (
                  <Link to="/login">
                    <Typography className={classes.link}>Log in</Typography>
                  </Link>
                )}
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
};

export default Nav;