import React, { useState, useContext } from "react";
import API from "../Api";
import { Store } from "../Store";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const DataTable = ({ data }) => {
  const AppState = useContext(Store);
  const { dispatch, state } = AppState;

  const history = useHistory();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const activateAlarm = async (name) => {
    let response;
    try {
      response = await API.activateAlarm(name);
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: "SET_ALARMS", payload: response });
    }
  };

  const deleteAlarm = async (name) => {
    let response;
    try {
      response = await API.deleteAlarm(name);
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: "SET_ALARMS", payload: response });
    }
  };

  const columns = [
    { id: "name", label: "Name", minWidth: 70 },
    { id: "source", label: "Source", minWidth: 70 },
    { id: "metric", label: "Metric", minWidth: 70 },
    { id: "trigger", label: "Trigger", minWidth: 70 },
    {
      id: "paused",
      label: "Paused",
      minWidth: 70,
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  return (
    <>
      <TableContainer style={{ width: "95%", marginTop: "1rem" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id}>
                          {column.format && typeof value === "boolean"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <ActionButtons>
                        <Button
                          variant="contained"
                          className="actionItem"
                          onClick={() => history.push("/edit/" + row.name)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          className="actionItem"
                          onClick={() => deleteAlarm(row.name)}
                        >
                          Del
                        </Button>
                        {row.paused && (
                          <Button
                            variant="contained"
                            className="actionItem"
                            onClick={() => activateAlarm(row.name)}
                          >
                            Resume
                          </Button>
                        )}
                        {!row.paused && (
                          <Button
                            variant="contained"
                            className="actionItem"
                            onClick={() => activateAlarm(row.name)}
                          >
                            Pause
                          </Button>
                        )}
                      </ActionButtons>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-center;
`;

export default DataTable;
