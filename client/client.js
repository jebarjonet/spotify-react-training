import React from "react";
import {render} from "react-dom";
import {Feed} from "../components/Feed";

require("./main.less");

const params = {
    q: "hight",
    type: "track",
    limit: 10
};

render(
    <Feed
        url="https://api.spotify.com/v1/search"
        params={params}/>,
    document.getElementById("container")
);