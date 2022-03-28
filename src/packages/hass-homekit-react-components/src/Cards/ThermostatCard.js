import React from "react";
import { ThermostatCard } from "homekit-react-components";
import AirConditionerOff from "./AirConditionerOff";

import Card from "./Card";

export function HassThermostatCard(props) {
  const entity = props.hass.states[props.entityId];
  const { friendly_name, current_temperature, temperature } = entity.attributes;
  const isActive =
    entity.state && entity.state !== "off" && entity.state !== "unavailable";

  function handleTemperatureChange(value) {
    props.hass.callService("climate", "set_temperature", {
      entity_id: entity.entity_id,
      temperature: value,
    });
  }

  function handleModeChange(value) {
    props.hass.callService("climate", "set_hvac_mode", {
      entity_id: entity.entity_id,
      hvac_mode: value.toLowerCase(),
    });
  }

  return (
    <Card
      active={isActive}
      icon={<AirConditionerOff />}
      room=""
      name={friendly_name}
      status={"Off"}
      error={entity.status === "unavailable"}
      onPress={() => console.log("press")}
      onLongPress={() => console.log("long press")}
    />
  );
  // return (
  //   <React.Fragment>
  //     <ThermostatCard
  //       name={friendly_name}
  //       currentMode={isActive ? "Heat" : "Off"}
  //       currentTemperature={current_temperature}
  //       targetTemperature={temperature ?? 24}
  //       onModeChange={handleModeChange}
  //       onTemperatureChange={handleTemperatureChange}
  //     />
  //   </React.Fragment>
  // );
}
