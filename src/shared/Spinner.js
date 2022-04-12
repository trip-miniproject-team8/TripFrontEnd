import React from "react";
import styled from "styled-components";

const Spinner = (props) => {
    return (
      <Outter>
        <img src={"https://user-images.githubusercontent.com/91959791/163001319-d6e449d7-8443-4106-8128-902e93a889f4.png"}/>
      </Outter>
    );
}

const Outter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  // background-image: url("https://user-images.githubusercontent.com/91959791/163001319-d6e449d7-8443-4106-8128-902e93a889f4.png");
  // background-size: cover;
  // background-position: center;
  img {
    width: 50%;
    padding: 0 0 80px 0;
  }
`;

export default Spinner;