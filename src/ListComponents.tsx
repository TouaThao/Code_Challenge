import {
  Button,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";
import App from "./App";
import { Name } from "./NameInterFace";

const ListComponents: FC<any> = ({
  listOfNames,
  nameState,
  retrieveData,
  filterData,
  childToParent,
}) => {
  const classes = useStyles();
  const [listA, setListA] = useState<Name[]>([]);
  const [selectedName, setSelectedName] = useState(false);

  useEffect(() => {
    const returnData = retrieveData();
    setListA(returnData);
  }, [listOfNames]);

  const listVIew = listA
    .filter((list) => {
      return list.surname.toLowerCase().indexOf(filterData.toLowerCase()) > -1;
    })
    .map((items, index) => {
      return (
        <List key={index} >
          <ListItem
          className={classes.listStyle}
            onClick={() => childToParent(items)}
            button
          >
            <ListItemText primary={items.name} />
            <ListItemText primary={items.surname} />
          </ListItem>
        </List>
      );
    });

  return <>{listVIew}</>;
};

const useStyles = makeStyles({
  listStyle: {
    "&:hover": {
      color: "92C6FD"
    },
    "&:focus": {
      background: "#92C6FD",
    }
  },
});

export default hot(ListComponents);
