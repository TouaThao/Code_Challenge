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
import { Name, NameList } from "./NameInterFace";
import "@fontsource/barlow";
import { saveToLocal, retrieveData } from "./util";


const App = () => {
  const classes = useStyles();
  const [form, setForm] = useState<Name>({
    name: "",
    surname: "",
    id: 0,
  });
  const [filterData, setFilterData] = useState("");
  const [listOfName, setListOfName] = useState<NameList>([]);
  const [filterListOfName, setFilterListOfName] = useState<NameList>([]);
  const [itemClicked, setItemClicked] = useState<boolean>(true);

  useEffect(() => {
    const returnData = retrieveData();
    setListOfName(returnData);
  }, []);

  useEffect(() => {
    if (filterData) {
      return setFilterListOfName(listOfName.filter((list => list.surname.toLowerCase().indexOf(filterData.toLowerCase()) > -1)))
    }
    setFilterListOfName(listOfName);

  }, [filterData, listOfName]);

  const handleTextField = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = target;
    setForm((state: Name) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    const uniqueId = Math.floor(Math.random() * 1000 + 10);
    const checkName = form.name.replace(/\s+/g, "");
    const checkSurname = form.surname.replace(/\s+/g, "");

    if (checkName === '' && checkSurname === '') return;

    setListOfName((state) => [
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
    resetForm();
  };

  const resetForm = () => {
    setForm({ name: "", surname: "", id: 0 });
  };

  const handleDelete = () => {
    const updateData = retrieveData().filter(data => data.id !== form.id);

    setListOfName(updateData);
    saveToLocal(updateData);
    resetForm();
  };

  const handleUpdate = () => {
    // TODO: find by id and update instead of looping for performance
    const found = listOfName.map((name) => {
      if (name.id === form.id) return form;

      return name;
    });
    setListOfName(found);
    saveToLocal(found);
    resetForm();
  };

  const handleFilterData = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFilterData(target.value);
  };

  const handleNameClick = (items: Name) => {
    setItemClicked(false);
    setForm(items);
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
                className={classes.listItemDisplay}
              >
                <ListComponents
                  items={filterListOfName}
                  onClick={handleNameClick}
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
                    value={form.name || ""}
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
                    value={form.surname || ""}
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
  listItemDisplay:{
    margin: '1rem 0',
    minHeight: 200,
    maxHeight: 200,
    overflow: 'auto'
  }
});
export default hot(App);
