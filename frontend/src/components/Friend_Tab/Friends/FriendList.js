import { List, makeStyles } from "@material-ui/core";
import React from "react";
import Friend from "./Friend";
import { useSelector } from "react-redux";

const FriendList = () => {
  const friendSystem = useSelector((state) => state.friendSystem);
  console.log(friendSystem);
  return (
    <div>
      <List>
        {Array.isArray(friendSystem.friends)
          ? friendSystem.friends.map((friend) => (
              <Friend key={friend} friend={friend} />
            ))
          : null}
      </List>
    </div>
  );
};

export default FriendList;
