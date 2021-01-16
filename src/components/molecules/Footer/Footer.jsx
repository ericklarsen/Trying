import React from "react";
import Proptypes from "prop-types";
import { font, blackShades, breakPoint } from "../../../styles/_variables";
import Typo from "../../atoms/Typography";
import Flex from "../../atoms/Flex";
import styled from "styled-components";

const { semiBold } = font;
const { black400 } = blackShades;
const { mobileXL } = breakPoint;

const Container = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: ${(props) => props.position || "absolute"};
  bottom: 0;
  margin: 0 auto;
  right: 0;
  left: 0;
  padding: 40px;
  z-index: 10;

  @media only screen and (max-width: ${mobileXL + 1}px) {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 24px;
  }
`;

const Footer = ({ position }) => {
  return (
    <Container position={position}>
      <Typo font={semiBold} color={black400} style={{ textAlign: "center" }}>
        All rights reserved by Erick Larsen © {new Date().getFullYear()}
      </Typo>
      <Typo variant="body2" style={{ marginTop: "4px", textAlign: "center" }} color={black400}>
        ericklarsenn@gmail.com | github.com/ericklarsen
      </Typo>
    </Container>
  );
};

Footer.propTypes = {
  position: Proptypes.any,
};

export default Footer;