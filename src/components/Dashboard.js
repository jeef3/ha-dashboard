import React, { Component, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { AnimatePresence, motion } from "framer-motion";
import { Controls } from "./Controls";
import { Panel } from "./Panel";
import { theme } from "../styles/theme";

const Dashboard = (props) => {
  /* eslint-disable no-unused-vars */
  const {
    // Object containing all the state and methods to control Home Assistant
    hass,
    // Boolean if the sidebar is currently shown.
    showMenu,
    // Boolean if the UI should render in narrow mode.
    narrow,
    // Panel information that Home Assistant has (including config at panel.config)
    panel,
  } = props;

  const [menuVisible, setMenuVisible] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ overflow: "hidden" }}>
        <motion.div
          animate={{
            opacity: menuVisible ? 0.5 : 1,
            left: menuVisible ? "translateX(-25%)" : "translateX(0)",
          }}
        >
          <Panel hass={hass} />
        </motion.div>
        <motion.div
          animate={{
            opacity: menuVisible ? 0.5 : 1,
            transform: menuVisible
              ? "scale3d(0.9, 0.9, 1)"
              : "scale3d(1, 1, 1)",
          }}
        >
          <Controls hass={hass} onShowMenu={() => setMenuVisible(true)} />
        </motion.div>
        <AnimatePresence>
          {menuVisible && (
            <motion.div
              layoutId="light-card"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                webkitBackdropFilter: "blur(60px)",
                background: "rgba(0, 0, 0, 0.4)",
                display: "grid",
              }}
            >
              <div
                style={{ position: "absolute", top: 32, right: 32 }}
                onClick={() => setMenuVisible(false)}
              >
                X
              </div>
              <div>TV Backlight</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* <div className="App-bg" /> */}
    </ThemeProvider>
  );
};

export default Dashboard;
