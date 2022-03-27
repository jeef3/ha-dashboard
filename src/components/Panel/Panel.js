import React from "react";
import styled from "@emotion/styled";
import {
  AlarmCard,
  DateView,
  RecallCard,
  TimeView,
  WeatherCard,
} from "../../packages/widgets-homekit-react-components/src";
import { PanelSection } from "../../packages/widgets-homekit-react-components/src";

const PanelContainer = styled.div`
  height: 100%;
  width: 360px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #20202050;
`;

const cities = ["Christchurch,NZ"];

export function Panel(props) {
  return (
    <PanelContainer>
      <TimeView />
      <DateView />
      <PanelSection>
        <WeatherCard hass={props.hass} cities={cities} />
      </PanelSection>
      <PanelSection>
        <RecallCard hass={props.hass} />
      </PanelSection>
    </PanelContainer>
  );
}
