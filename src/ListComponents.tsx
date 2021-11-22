import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import React, { FC } from "react";
import { hot } from "react-hot-loader/root";
import { Name, NameList } from "./NameInterFace";

interface ListProps {
  items: NameList;
  onClick: (item: Name) => void;
}

const ListComponents: FC<ListProps> = ({ items, onClick }) => {
  const classes = useStyles();

  return (
    <>
      {items.map((item, index) => {
        return (
          <List key={index}>
            <ListItem
              className={classes.listStyle}
              onClick={() => onClick(item)}
              button
            >
              <ListItemText primary={item.name} />
              <ListItemText primary={item.surname} />
            </ListItem>
          </List>
        );
      })}
    </>
  );
};

const useStyles = makeStyles({
  listStyle: {
    "&:hover": {
      color: "92C6FD",
    },
    "&:focus": {
      background: "#92C6FD",
    },
  },
});

export default hot(ListComponents);
