import React, { useState, useCallback, useRef, useEffect } from "react";
import { LightCard } from "homekit-react-components";
import styled, { keyframes, css } from "styled-components";
import Lamp from "./Lamp";
import LedStrip from "./LedStrip";

const IconContainer = styled.div``;

const pressedAnimation = keyframes`
  from {
    transform: scale(1);
  }

  20% {
    transform: scale(0.90);
  }

  to {
    transform: scale(1.08);
  }
`;

const Card = styled.button`
  width: 138px;
  height: 138px;
  padding: 16px;
  margin: 0;

  touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  cursor: pointer;
  color: ${({ active }) => (active ? "#000000" : "rgba(255, 255, 255, 0.4)")};
  text-align: start;
  font-family: "SF UI Display";
  font-size: 16px;
  font-weight: 500;

  border: 0;
  background: ${({ active }) => (active ? "#ffffff" : "rgba(0, 0, 0, 0.4)")};
  backdrop-filter: blur(20px);

  mask-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARQAAAEUCAYAAADqcMl5AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAcbSURBVHgB7d3/lZNVHsfxb2hgYQtwc2gA3ALWLAXs2QoWsIFVGhAsQNECdLACbUBGG2CsgGgDjBXEe8nzaCZkZvLjAweY1+ucy5PMhMxfeZ97b548mdQbslgspu1wu43rbfTb/xh+NV07rpoWsG6+dv90GKu3f23jRRu/9PuTyeSk3oBJvQYtHj0a/23jozZmJQzwNjgZxnEbP7XIzCssFpQhIndrGZJZAW+74zaOKhiXg4MyhOT/bXxSy+UM8G6Z1zIsTw4Ny0FBaTHpIXlYQgLvg3kbD1tUntSe9grKsMH6bVnawPto3sa/95mtXKsdDbOSZyUm8L6atvGsvdY/qR3tNENpf+DLWu6VAFdDXwI92vbBWwelxaQvce4VcNUctajc3+aBWwWlxaQvcW4XcFWdtKh8eNmDLt1DGWYmYgJX2+3Wgm8ue9CFQWlP8FlZ5gBL91sTvrjoAecueYZ3cx4XwF8WbTxoy5+NbdgYlOE8k75v4oQ1YF3/0OE/N52nct6S52mJCbDZjTY27qe8EpQ2O7lXPh0MXGy26cS3M0ueYanTZyfTArhYX/rcbEuf8Vosr8xQ+uUHpgVwub70OTNL+XOGYnYC7OHMLGV1hjIrMQF209+8uTfeWQ3K3QLYTV/l/Gf1zrjceV4Au+snu/29L3vGGcqsAPbXryVdggIcqq90/tVvjEG5VQD7m/V/xj2URQHsb9H2UK5day1xrRPgYP3Nnb7k8SFAIOFWD4oZCpBwwwwFSOj7sS+XPNMCONwHPSh/K4AASx4gZbrzV5ECnMcMBUhxHgqQY8kDxAgKECMoQMzEJ42BkIUZChAjKECMoAAxggLECAoQIyhAjKAAMYICxAgKECMoQIygADGCAsQIChAjKECMoAAxggLECAoQIyhAjKAAMYICxAgKECMoQIygADGCAsQIChAjKECMoAAxggLECAoQIyhAjKAAMYICxAgKECMoQIygADGCAsQIChAjKECMoAAxggLECAoQIyhAjKAAMYICxAgKECMoQIygADGCAsQIChAjKECMoAAxggLECAoQIyhAjKAAMYICxAgKECMoQIygADGCAsQIChAjKECMoAAxggLECAoQIyhAjKAAMYICxAgKECMoQIygADGCAsQIChAjKECMoAAxggLECAoQIyhAjKAAMYICxAgKECMoQIygADGCAsQIChAjKECMoAAxggLECAoQIyhAjKAAMYICxAgKECMoQIygADGCAsQIChAjKECMoAAxggLECAoQIyhAjKAAMYICxAgKECMoQIygADGCAsQIChAjKECMoAAxggLECAoQIyhAjKAAMYICxAgKECMoQIygADGCAsQIChAjKECMoAAxggLECAoQIyhAjKAAMYICxAgKECMoQIygADGCAsQIChAjKECMoAAxggLECAoQIyhAjKAAMYICxAgKECMoQIygADGCAsQIChAjKECMoAAxggLECAoQIyhAjKAAMYICxAgKECMoQIygADGCAsQIChAjKECMoAAxggLECAoQIyhAjKAAMYICxAgKECMoQIygADGCAsQIChAjKECMoAAxggLECAoQIyhAjKAAMYICxAgKECMoQIygADGCAsQIChAjKECMoAAxggLECAoQIyhAjKAAMYICxAgKECMoQIygADGCAsQIChAjKECMoAAxggLECAoQ04MyL4DDzc1QgBhBAWIEBYgRFCDl1KYskHJqhgLE9KD8WgCH+90MBUh5YQ8FSPlNUICERQ2bsqcFcLiTHpSTAjjc6aT/u2gKYH+LyWRybXyXZ14A+3u50hmD8lMB7O9MUI4LYD99y+TlpGTcQ7neDi8KYHc9KDfbHsryAkvtRn/r+LgAdnfcY9JvrJ56/0MB7KbPTp6MdyZ//nS57HnexvUC2E5vxp1XZijDsuerAtjed2NMusnqb8xSgB2cmZ10Zy5fMMxSHhXAxfreyaPVmHSTjY9cLJ62w6wANnveYnJz/YfnXWDpfvkUMrBZP2ftzqZfbAzKMI2x9AHW9aXO5+tLndG5l4Bs/+FxedcHOOvzoQ0bTeoSbT/lqB3uFnDVHbWY3L/oAZcGpWtRedYOtwu4qp62mNy57EFbXfW+PdGH7XBUwFV0tE1Muq2/RmOY6vSNWld3g6uhv9YfX7bMWbXT9/K0J37YDg/KpQ7gfddf4w/aa/7TXf7TVnso69qeyrQdfmxjuu9zAG+lPis5buPj894avshe3xzY/9BwltzHtTyfH3j3jbOSO/vEpDt4djHMVu618b8yY4F3zcsv6Grj61rulxx0hnzsxT+EZVbLsMzSzw/EjG+sHNfywmpPDg3J6LW84Ffi8lEbt+rVc1iEBl6/9XdkT4bxcxvfpyKy6o29sFtkelT6dVZ6YG608cFwf7z2yurt0bSAdfMLfjYefxtu92ic7Lsnsqs/AKfYHeFOcaArAAAAAElFTkSuQmCC");
  mask-size: contain;

  display: grid;
  align-content: space-between;
  justify-items: start;
  justify-content: start;

  transition: all ease-out 100ms;

  :active {
    transition-timing-function: cubic-bezier(0.3, -2.8, 0.3, 1);
    transition-duration: 600ms;
    transition-delay: 200ms;

    transform: scale(1.08);
  }

  ${IconContainer} {
    & > svg {
      display: block;

      ${({ active }) =>
        !active &&
        `
          opacity: 0.5;
          filter: grayscale(100%);
        `}
    }
  }
`;

const HassLightCard = ({ hass, entityId, icon }) => {
  const entity = hass.states[entityId];
  const { friendly_name, brightness } = entity.attributes;
  const on =
    entity.state && entity.state !== "off" && entity.state !== "unavailable";
  const unavailable = entity.state === "unavailable";
  const brightnessPercentage = Math.floor((brightness * 100) / 255);

  const pressTimer = useRef();
  const pressTime = useRef();

  const handlePress = useCallback(() => {
    hass.callService("light", "toggle", { entity_id: entityId });
  }, [hass, entityId]);

  const handleLongPress = useCallback(() => {}, [hass]);

  const handlePressStart = useCallback(() => {
    pressTime.current = Date.now();
    pressTimer.current = setTimeout(() => handleLongPress(), 600);
  }, [pressTime, pressTimer]);

  const handlePressEnd = useCallback(() => {
    clearTimeout(pressTimer.current);
    if (Date.now() - pressTime.current < 600) handlePress();
  }, [pressTime, pressTimer]);

  function handlePercentageChange(value) {
    const brightness = Math.floor((value * 255) / 100);
    hass.callService("light", "turn_on", {
      entity_id: entityId,
      brightness: brightness,
    });
  }

  return (
    <Card
      active={entity.state === "on"}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
    >
      <IconContainer>
        {icon === "lamp" ? <Lamp size={32} /> : <LedStrip size={32} />}
      </IconContainer>
      <div>
        <div>{friendly_name}</div>
        <div
          style={{
            color: on
              ? "#8E8E92"
              : unavailable
              ? "#EB5545"
              : "rgba(255, 255, 255, 0.4)",
          }}
        >
          {on
            ? `${brightnessPercentage}%`
            : unavailable
            ? "No response"
            : "Off"}
        </div>
      </div>
    </Card>
  );

  // return (
  //   <LightCard
  //     name={friendly_name}
  //     on={on}
  //     brightness={brightnessPercentage}
  //     onBrightnessChange={handlePercentageChange}
  //     onToggle={handleToggle}
  //     capabilities={{
  //       SUPPORT_BRIGHTNESS: true,
  //     }}
  //   />
  // );
};
export { HassLightCard };
