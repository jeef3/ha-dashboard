import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { Title } from "./Title";
import {
  CameraCard,
  FanCard,
  LightCard,
  SceneCard,
  SensorCard,
  ThermostatCard,
} from "../../packages/hass-homekit-react-components/src";

const ControlsContainer = styled.div`
  height: 100%;
  width: 1300px;
  padding: 30px;
  box-sizing: border-box;
`;

const ControlsSection = styled.div`
  margin-bottom: 20px;
`;

const ControlsLeft = styled.div`
  margin-right: 20px;
  float: left;
`;

const ControlsRight = styled.div`
  float: left;
`;

const CardContainers = styled.div`
  width: 400px;
`;

const Components = styled.div`
  display: grid;
  gap: 8px;
  grid-auto-flow: column;
`;

export function Controls(props) {
  const { hass } = props;
  return (
    <ControlsContainer>
      <ControlsLeft>
        <ControlsSection>
          <Title>Home</Title>
          <Components>
            <motion.div layoutId="light-card">
              <LightCard
                hass={hass}
                entityId="light.lifx_mini_31f37d"
                icon="lamp"
                onLongPress={props.onShowMenu}
              />
            </motion.div>
            <LightCard
              hass={hass}
              entityId="light.tv_backlight"
              icon="led-strip"
            />
            <ThermostatCard hass={hass} entityId="climate.air_conditioner" />
          </Components>
        </ControlsSection>
      </ControlsLeft>
    </ControlsContainer>
  );
}
