import { List, makeStyles } from "@material-ui/core";
import React from "react";
import Request from "./Request";
import { useSelector } from "react-redux";

const RequestList = () => {
  const friendSystem = useSelector((state) => state.friendSystem);
  console.log(friendSystem);
  return (
    <div>
      <List>
        {Array.isArray(friendSystem.friendRequests)
          ? friendSystem.friendRequests.map((request) => (
              <Request key={request} request={request} />
            ))
          : null}
      </List>
    </div>
  );
};

export default RequestList;
