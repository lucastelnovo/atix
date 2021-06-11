import React, { useState, useContext } from "react";
import { Store } from "../Store";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DataTable from "../components/DataTable";
import Fab from "@material-ui/core/Fab";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const AlarmsView = ({ data }) => {
  const AppState = useContext(Store);
  const { dispatch, state } = AppState;

  const [status, setStatus] = useState(true);

  const [name, setName] = useState();

  const search = () => {
    dispatch({
      type: "SET_FILTERED_ALARMS",
      payload: { name: name, status: status },
    });
  };

  return (
    <Container>
      <Typography variant="h4" component="h2">
        Alarms
      </Typography>
      <Break />
      <Filters>
        <TextField
          id="name-filter"
          label="Name filter"
          className="filterItem"
          onChange={(e) => setName(e.target.value)}
        />
        <FormControlLabel
          style={{ marginTop: "1rem" }}
          control={
            <Switch
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
              name="status"
            />
          }
          label="Alarms status"
        />
        <Button
          variant="contained"
          className="filterItem"
          onClick={() => search()}
        >
          Search
        </Button>
      </Filters>
      <DataTable data={data} />
      <FabButton>
        <Fab color="primary" variant="extended">
          New
        </Fab>
      </FabButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 2rem 0 0 6rem;
`;

const Break = styled.div`
  flex-basis: 100%;
  height: 0;
`;

const Filters = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const FabButton = styled.div`
  margin: 0px;
  top: auto;
  right: 20px;
  bottom: 20px;
  left: auto;
  position: fixed;
`;

export default AlarmsView;
