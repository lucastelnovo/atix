import React, { useContext } from "react";
import { Store } from "../Store";
import styled from "styled-components";
import DashboardCard from "../components/DashboardCard";

const DashboardView = () => {
  const AppState = useContext(Store);
  const { state } = AppState;

  const activeAlerts = state.alarms.filter((a) => !a.paused).length;
  const totalAlerts = state.alarms.length;
  return (
    <Container>
      <DashboardCard text={`${activeAlerts}/${totalAlerts} alarms turned on`} />
      <DashboardCard text="Future widget" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 4rem;
`;

export default DashboardView;
