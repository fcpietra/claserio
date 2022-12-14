import * as React from 'react';
import {styled, alpha, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import '../App.css';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import {useCookies} from "react-cookie";
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ClassIcon from '@mui/icons-material/Class';
import HomeIcon from '@mui/icons-material/Home';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import KeyIcon from '@mui/icons-material/Key';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
}));

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function SearchAppBar() {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function logOut() {
        removeCookie('token');
        window.location.href = '/login';
    }

    return (
    <div >
        <Box sx={{ flexGrow: 1 }}>
        <AppBar  position="static">
            <Toolbar className="header--container">
                <div class="header--menu">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        sx={{ mr: 2 }}>
                        <MenuIcon className='menu--icon'/>
                    </IconButton>
                </div>

                <Drawer
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            paddingTop: '20px',
                            boxSizing: 'border-box',
                        },
                    }}
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader >
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List >
                        <a className="drawer--item" href="/home">
                            <ListItem key={"home"} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Home"} />
                                </ListItemButton>
                            </ListItem>
                        </a>

                        {
                            sessionStorage.getItem("role") === "teacher"
                            ?
                                <div>

                                    <a className="drawer--item" href="/class/approved">
                                        <ListItem key={"approved"} disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <RemoveRedEyeIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={"Current Classes"} />
                                            </ListItemButton>
                                        </ListItem>
                                    </a>

                                    <a className="drawer--item" href="/class/pending">
                                        <ListItem key={"pending"} disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <VisibilityOffIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={"Hidden Classes"} />
                                            </ListItemButton>
                                        </ListItem>
                                    </a>

                                    <a className="drawer--item" href="/accepted">
                                        <ListItem key={"accepted"} disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <CheckBoxIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary={"Classes Accepted"} />
                                            </ListItemButton>
                                        </ListItem>
                                    </a>

                                    <a className="drawer--item" href="/requests">
                                        <ListItem key={"requests"} disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <ClassIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary={"Classes Requested"} />
                                            </ListItemButton>
                                        </ListItem>
                                    </a>

                                    <a className="drawer--item" href="/comments">
                                        <ListItem key={"comments"} disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <AnnouncementIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary={"Pending Comments"} />
                                            </ListItemButton>
                                        </ListItem>
                                    </a>

                                </div>
                                :
                                <div>
                                    <a className="drawer--item" href="/class/approved">
                                        <ListItem key={"approved"} disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <SchoolIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={"Current Classes"} />
                                            </ListItemButton>
                                        </ListItem>
                                    </a>

                                    <a className="drawer--item" href="/class/pending">
                                        <ListItem key={"pending"} disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <SchoolIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={"Pending Classes"} />
                                            </ListItemButton>
                                        </ListItem>
                                    </a>
                                </div>
                        }

                        <a className="drawer--item" href="/informacion">
                            <ListItem key={"informacion"} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <InfoIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Informaci??n"} />
                                </ListItemButton>
                            </ListItem>
                        </a>

                        <a className="drawer--item" href="/resetpassword">
                            <ListItem key={"logOut"} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <KeyIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Reset Password"} />
                                </ListItemButton>
                            </ListItem>
                        </a>

                        <a className="drawer--item" onClick={logOut}>
                            <ListItem key={"logOut"} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Log Out"} />
                                </ListItemButton>
                            </ListItem>
                        </a>

                    </List>
                    <Divider />
                </Drawer>
            
            <img className='logoMin' src="../img/claserio-logo.png" alt="Uade Logo" />

            </Toolbar>
        </AppBar>
        </Box>
    </div>
  );
}