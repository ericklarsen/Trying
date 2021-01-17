import React, { useState } from "react";
import ComparePageLayout from "../components/layout/ComparePageLayout";
import Flex from "../components/atoms/Flex";
import Typo from "../components/atoms/Typography";
import { font, blackShades, breakPoint } from "../styles/_variables";
import Box from "../components/molecules/Box/Box";
import Img from "../components/atoms/Img";
import Button from "../components/atoms/Button";
import ResultBox from "../components/organism/ComparePokemon/ResultBox";
import ListPokemon from "../components/organism/ComparePokemon/ListPokemon";
import Footer from "../components/molecules/Footer/Footer";
import { capitalize } from "../helpers/global_helper";
import styled from "styled-components";

const { bold, semiBold } = font;
const { black400 } = blackShades;
const { mobileXL } = breakPoint;

const Wrapper = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: ${mobileXL + 1}px) {
    flex-direction: column;
  }
`;

const comparePokemon = () => {
  const [expandMine, setExpandMine] = useState(false);
  const [expandOther, setExpandOther] = useState(false);
  const [myPokemon, setMyPokemon] = useState({});
  const [otherPokemon, setOtherPokemon] = useState({});

  return (
    <ComparePageLayout>
      <Flex direction="column" alignItems="center" margin="0 0 34px 0">
        <Typo variant="body2" margin="0 0 2px 0">
          Choose
        </Typo>
        <Typo variant="h5" font={bold}>
          Your Pokemon
        </Typo>
      </Flex>
      <Wrapper>
        {myPokemon?.id ? (
          <Box width="100%" maxWidth="100%">
            <Typo variant="body2" color={black400} font={semiBold}>
              My Pokemon
            </Typo>
            <Img src={myPokemon.sprites.front_default} width="88px" margin="28px 0 12px 0" />
            <Typo variant="caption" color={black400} margin="0 0 2px 0">
              Name
            </Typo>
            <Typo variant="h5" font={bold} margin="0 0 28px 0">
              {capitalize(myPokemon.name)}
            </Typo>
            <Button
              variant="orange"
              padding="6px 0"
              width="108px"
              onClick={() => setExpandMine(true)}
            >
              <Typo variant="body2" color="white" font={bold}>
                Choose again
              </Typo>
            </Button>
          </Box>
        ) : (
          <Box width="100%" maxWidth="100%" minHeight="267px" onClick={() => setExpandMine(true)}>
            <Img maxWidth="56px" src="/static/svg/ic_plus.svg" style={{ cursor: "pointer" }} />
            <Typo
              variant="body2"
              color={black400}
              margin="16px 0 0 0"
              style={{ textAlign: "center" }}
            >
              My Pokemon
            </Typo>
          </Box>
        )}
        <Img src="/static/svg/ic_switch.svg" margin="16px" />
        {otherPokemon?.id ? (
          <Box width="100%" maxWidth="100%">
            <Typo variant="body2" color={black400} font={semiBold}>
              Other Pokemon
            </Typo>
            <Img src={otherPokemon.sprites.front_default} width="88px" margin="28px 0 12px 0" />
            <Typo variant="caption" color={black400} margin="0 0 2px 0">
              Name
            </Typo>
            <Typo variant="h5" font={bold} margin="0 0 28px 0">
              {capitalize(otherPokemon.name)}
            </Typo>
            <Button
              variant="orange"
              padding="6px 0"
              width="108px"
              onClick={() => setExpandOther(true)}
            >
              <Typo variant="body2" color="white" font={bold}>
                Choose again
              </Typo>
            </Button>
          </Box>
        ) : (
          <Box width="100%" maxWidth="100%" minHeight="267px" onClick={() => setExpandOther(true)}>
            <Img src="/static/svg/ic_plus.svg" style={{ cursor: "pointer" }} />
            <Typo
              variant="body2"
              color={black400}
              margin="16px 0 0 0"
              style={{ textAlign: "center" }}
            >
              Others Pokemon
            </Typo>
          </Box>
        )}
      </Wrapper>
      <ListPokemon
        expand={expandMine}
        setExpand={setExpandMine}
        selected={myPokemon}
        anotherSelected={otherPokemon}
        onSelected={setMyPokemon}
      />
      <ListPokemon
        expand={expandOther}
        setExpand={setExpandOther}
        selected={otherPokemon}
        anotherSelected={myPokemon}
        onSelected={setOtherPokemon}
      />
      {myPokemon?.id && otherPokemon?.id && (
        <ResultBox myPokemon={myPokemon} otherPokemon={otherPokemon} />
      )}
      <Footer position="static" style={{ marginTop: "40px" }} />
    </ComparePageLayout>
  );
};

comparePokemon.propTypes = {};

export default comparePokemon;