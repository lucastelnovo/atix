import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Box from "@material-ui/core/Box";
import React, { useEffect, useState, useContext } from "react";
import { Store } from "../Store";

const FixedTopBar = () => {
  const AppState = useContext(Store);
  const { state } = AppState;

  const activeAlerts = state.alarms.filter((a) => !a.paused).length;

  return (
    <AppBar position="static">
      <Box display="flex" flexDirection="row-reverse">
        <Toolbar>
          <IconButton color="inherit">{activeAlerts}</IconButton>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default FixedTopBar;
