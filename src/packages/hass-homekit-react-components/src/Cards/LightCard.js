import React, { useState, useCallback, useRef, useEffect } from "react";
import { LightCard } from "homekit-react-components";
import styled, { keyframes, css } from "styled-components";
import Lamp from "./Lamp";
import LedStrip from "./LedStrip";
import Card from "./Card";

const HassLightCard = ({ hass, entityId, icon, onLongPress }) => {
  const entity = hass.states[entityId];
  const { friendly_name, brightness } = entity.attributes;
  const on =
    entity.state && entity.state !== "off" && entity.state !== "unavailable";
  const unavailable = entity.state === "unavailable";
  const brightnessPercentage = Math.floor((brightness * 100) / 255);

  const handlePress = useCallback(() => {
    hass.callService("light", "toggle", { entity_id: entityId });
  }, [hass, entityId]);

  const handleLongPress = useCallback(() => {
    onLongPress();
  }, [hass]);

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
      icon={icon === "lamp" ? <Lamp size={32} /> : <LedStrip size={32} />}
      room=""
      name={friendly_name}
      status={
        on ? `${brightnessPercentage}%` : unavailable ? "No response" : "Off"
      }
      error={unavailable}
      onPress={handlePress}
      onLongPress={handleLongPress}
    />
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
