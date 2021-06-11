import React, { useEffect, useState, useContext } from "react";
import API from "../Api";
import { Store } from "../Store";
import { useParams } from "react-router";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const EditView = () => {
  const AppState = useContext(Store);
  const { dispatch } = AppState;
  const history = useHistory();
  let { name } = useParams();

  const [alarm, setAlarm] = useState({
    name: name,
    source: "",
    metric: "",
    trigger: "",
    paused: "",
  });

  const save = async () => {
    let response;
    try {
      response = await API.saveAlarm(name, alarm);
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: "SET_ALARMS", payload: response });
      history.push("/alarms");
    }
  };

  useEffect(() => {
    async function getAlarm() {
      let response;
      try {
        response = await API.getAlarm(name);
        setAlarm(response);
      } catch (err) {
        console.error(err);
      }
    }
    getAlarm();
  }, [name]);

  return (
    <Container>
      <TextField
        onChange={(e) => setAlarm({ ...alarm, name: e.target.value })}
        value={alarm.name}
        className="formInput"
      />
      <TextField
        onChange={(e) => setAlarm({ ...alarm, source: e.target.value })}
        value={alarm.source}
        className="formInput"
      />
      <TextField
        onChange={(e) => setAlarm({ ...alarm, metric: e.target.value })}
        value={alarm.metric}
        className="formInput"
      />
      <TextField
        onChange={(e) => setAlarm(...alarm, { trigger: e.target.value })}
        value={alarm.trigger}
        className="formInput"
      />
      <ButtonContainer>
        <Button
          variant="contained"
          style={{ marginRight: "2rem" }}
          onClick={() => save()}
        >
          Save
        </Button>
        <Button variant="contained" onClick={() => history.push("/alarms")}>
          Cancel
        </Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 0 0 6rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 3rem 0 0 0;
`;

export default EditView;
