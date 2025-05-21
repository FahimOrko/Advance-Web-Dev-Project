import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/store";
import { toast } from "react-toastify";

const Header = () => {
  const isLogin = useSelector((state) => state.isLogin);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [tabValue, setTabValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDialogToggle = () => setDialogOpen(!dialogOpen);

  const handleAuthClick = (path) => {
    setDialogOpen(false);
    navigate(path);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "#1e1e2f", boxShadow: 3 }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {isMobile ? (
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              TECHBLOG
            </Typography>
          ) : (
            <>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, letterSpacing: 1, marginRight: 2 }}
              >
                TECHBLOG
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                <Tabs
                  value={tabValue}
                  onChange={(e, val) => setTabValue(val)}
                  textColor="inherit"
                  TabIndicatorProps={{ style: { backgroundColor: "#ffffff" } }}
                  sx={{
                    "& .MuiTab-root": {
                      fontWeight: 500,
                      textTransform: "none",
                      color: "#ffffff",
                      mx: 1,
                    },
                    "& .MuiTab-root:hover": {
                      backgroundColor: "#33334d",
                      borderRadius: "4px",
                    },
                  }}
                >
                  <Tab label="Blogs" component={Link} to="/blogs" />
                  {isLogin && (
                    <Tab label="My Blogs" component={Link} to="/my-blogs" />
                  )}
                  {isLogin && (
                    <Tab
                      label="Create Blog"
                      component={Link}
                      to="/create-blog"
                    />
                  )}
                </Tabs>
              </Box>
            </>
          )}

          {isMobile ? (
            <IconButton
              sx={{ color: "#ffffff" }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box>
              <Button
                sx={{
                  marginX: 1,
                  color: "white",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": { backgroundColor: "#33334d" },
                }}
                onClick={handleDialogToggle}
              >
                {!isLogin ? <p>Sign In / Sign Up</p> : <p>Logout</p>}
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          width={250}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
        >
          <List>
            <ListItem button component={Link} to="/blogs">
              <ListItemText primary="Blogs" />
            </ListItem>
            {isLogin && (
              <ListItem button component={Link} to="/my-blogs">
                <ListItemText primary="My Blogs" />
              </ListItem>
            )}
            {isLogin && (
              <ListItem button component={Link} to="/create-blog">
                <ListItemText primary="Create Blog" />
              </ListItem>
            )}
            <ListItem button onClick={handleDialogToggle}>
              <ListItemText primary={isLogin ? "Logout" : "Login / Register"} />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Auth Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogToggle}>
        <DialogTitle sx={{ fontWeight: 600, textAlign: "center" }}>
          Welcome to TECHBLOG
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            {!isLogin ? (
              <>
                <Button
                  fullWidth
                  sx={{
                    backgroundColor: "#1e1e2f",
                    color: "white",
                    "&:hover": { backgroundColor: "#33334d" },
                  }}
                  onClick={() => handleAuthClick("/login")}
                >
                  Login
                </Button>
                <Button
                  fullWidth
                  sx={{
                    backgroundColor: "#1e1e2f",
                    color: "white",
                    "&:hover": { backgroundColor: "#33334d" },
                  }}
                  onClick={() => handleAuthClick("/register")}
                >
                  Register
                </Button>
              </>
            ) : (
              <Button
                fullWidth
                sx={{
                  backgroundColor: "#1e1e2f",
                  color: "white",
                  "&:hover": { backgroundColor: "#33334d" },
                }}
                onClick={() => {
                  setDialogOpen(false);
                  dispatch(authActions.logout());
                  toast.success("User successfully logged out!");
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
