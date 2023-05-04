import axios from "axios";
import React, { useEffect, useState } from "react";

// Base URL

const Post = () => {
  const [myData, setMyData] = useState([]);
  useEffect(() => {
    axios(`http://localhost:9000/login`).then((res) => {
      setMyData([res.data[0]]);
    });
  }, []);

  return (
    <div className="post">
      <ul>
        {myData.map((item, index) => {
          return <li key={index + 1}>Xoş gəlmisən {item.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Post;
