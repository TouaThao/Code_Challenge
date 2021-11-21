import React, {  useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { hot } from "react-hot-loader/root";
import ListComponents from "./ListComponents";
import { Name } from "./NameInterFace";
import "@fontsource/barlow";

const App = () => {
  const classes = useStyles();
  const [nameState, setNameState] = useState<Name>({
    name: "",
    surname: "",
    id: 0,
  });
  const [filterData, setFilterData] = useState("");
  const [listOfNames, setListOfNames] = useState<Name[]>([]);
  useEffect(() => {
    const returnData = retrieveData();
    setListOfNames(returnData);
  }, []);

  const handleTextField = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = target;
    setNameState((state: Name) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    const uniqueId = Math.floor(Math.random() * 1000 + 10);
    const checkName = nameState.name.replace(/\s+/g, "");
    const checkSurname = nameState.surname.replace(/\s+/g, "");
    setListOfNames((state) => [
      ...state,
      {
        name: checkName,
        surname: checkSurname,
        id: uniqueId,
      },
    ]);
    const updateData = [
      ...retrieveData(),
      {
        name: checkName,
        surname: checkSurname,
        id: uniqueId,
      },
    ];
    saveToLocal(updateData);
    resetName();
  };

  const listClicked = (item: Name) => {
    setNameState({
      ...item,
    });
  };

  const resetName = () => {
    setNameState({ name: "", surname: "", id: 0 });
  };

  const handleDelete = () => {
    const updateData = retrieveData().filter(
      (data: Name) => data.id !== nameState.id
    );
    setListOfNames(updateData);
    saveToLocal(updateData);
    resetName();
  };

  const handleUpdate = () => {
    const found = listOfNames.map((name) => {
      if (name.id === nameState.id) {
        return (name = nameState);
      }
      return name;
    });
    setListOfNames(found);
    saveToLocal(found);
    resetName();
  };

  const handleFilterData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchWords = event.target.value;
    setFilterData(searchWords);
  };

  const saveToLocal = (data: Name[]) => {
    const stringData = JSON.stringify(data);
    localStorage.setItem("localStorageData", stringData);
  };

  const retrieveData = () => {
    const localData = localStorage.getItem("localStorageData") || "[]";
    const localStorageData = JSON.parse(localData);
    return localStorageData;
  };
  const [itemClicked, setItemClicked] = useState<boolean>(true);

  const childToParent = (items: Name) => {
    setItemClicked(false);
    setNameState(items);
  };

  return (
    <div className="App">
      <Container className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item>
              <Typography className={classes.font}>Filter prefix:</Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                id="outlined"
                variant="outlined"
                onChange={handleFilterData}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={6}>
              <Paper
                style={{
                  margin: 10,
                  minHeight: 200,
                  maxHeight: 200,
                }}
              >
                <ListComponents
                  nameState={nameState}
                  listClicked={listClicked}
                  listOfNames={listOfNames}
                  retrieveData={retrieveData}
                  filterData={filterData}
                  childToParent={childToParent}
                />
              </Paper>
            </Grid>
            <Grid container item xs={6} alignItems="center">
              <Grid>
                <Grid>
                  <Typography className={classes.font}>Name:</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.font}>Surname:</Typography>
                </Grid>
              </Grid>
              <Grid item xs={8}>
                <Grid item>
                  <TextField
                    name="name"
                    onChange={handleTextField}
                    className={classes.textfield}
                    id="outlined"
                    variant="outlined"
                    value={nameState.name || ""}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    name="surname"
                    onChange={handleTextField}
                    className={classes.textfield}
                    id="outlined"
                    variant="outlined"
                    value={nameState.surname || ""}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                className={classes.createBtn}
                onClick={handleCreate}
                variant="contained"
                color="primary"
              >
                Create
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.updateBtn}
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                disabled={itemClicked}
              >
                Update
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.deleteBtn}
                variant="contained"
                color="primary"
                onClick={handleDelete}
                disabled={itemClicked}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

const useStyles = makeStyles({
  font: {
    padding: "15px",
    fontFamily: "Barlow",
    fontWeight: "bold",
  },
  root: {
    backgroundColor: "rgb(249,250,251)",
    padding: "1rem",
  },
  paper: {
    padding: "1rem",
  },
  textfield: {
    paddingLeft: "1.5vw",
    paddingTop: "1vw",
    paddingBottom: "1vw",
  },
  createBtn: {
    backgroundColor: "#6FE6B7",
    color: "black",
    fontFamily: "Barlow",
    fontWeight: "bold",
  },
  updateBtn: {
    backgroundColor: "#FDE689",
    color: "black",
    fontFamily: "Barlow",
    fontWeight: "bold",
  },
  deleteBtn: {
    backgroundColor: "#FCA5A5",
    color: "black",
    fontFamily: "Barlow",
    fontWeight: "bold",
  },
});
export default hot(App);
