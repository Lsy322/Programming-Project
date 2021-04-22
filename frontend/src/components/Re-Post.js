import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Card, CardContent, CardHeader, CardMedia } from "@material-ui/core";
import React from "react";
import VerticalMoreButton from './verticalMoreButton';

const Repost = () => {
    const {isAuthenticated, user} = useAuth0();
    console.log(user, isAuthenticated);
  return (
    <Card>
      <CardHeader 
      avatar={<Avatar />} 
      />
      
      <Card>
        <CardHeader avatar={<Avatar />} />
        <CardMedia image= 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.wired.com%2Fstory%2Fstay-in-the-moment-take-a-picture%2F&psig=AOvVaw3l68SpS38lXD_E3KfYvbIS&ust=1619105887480000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLi9zMvVj_ACFQAAAAAdAAAAABAD'/>
        <CardContent>hello world</CardContent>
      </Card>

    </Card>
  );
};

export default Repost;
