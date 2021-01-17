import React from "react";
import PropTypes from "prop-types";
import Flex from "../../atoms/Flex";
import Box from "../../molecules/Box/Box";
import Typo from "../../atoms/Typography";
import Img from "../../atoms/Img";
import BaseStats from "../DetailPokemon/BaseStats";
import { blackShades, font, breakPoint } from "../../../styles/_variables";
import styled from "styled-components";

const { black400 } = blackShades;
const { bold } = font;
const { mobileXL } = breakPoint;

const Container = styled(Box)`
  width: 100%;
  margin-top: 24px;
  animation: pop-up 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97);

  @media only screen and (max-width: ${mobileXL + 1}px) {
    margin-bottom: 24px;
  }
`;

const Wrapper = styled(Flex)`
  @media only screen and (max-width: ${mobileXL + 1}px) {
    flex-direction: column;

    .right-side {
      width: 100%;
    }

    .left-side {
      width: 100%;
      margin-bottom: 16px;
    }
  }
`;

const ResultBox = ({ myPokemon, otherPokemon }) => {
  return (
    <Container width="100%" maxWidth="100%" padding="22px">
      <Wrapper width="100%" alignItems="center" justifyContent="space-between">
        <Flex className="left-side" direction="column" width="40%">
          <Typo variant="body2" margin="0 0 2px 0">
            The
          </Typo>
          <Typo variant="h5" font={bold}>
            Result
          </Typo>
          <Flex width="100%" justifyContent="space-between" alignItems="center" margin="16px 0 0 0">
            <Flex direction="column" alignItems="center">
              <Img src={myPokemon.sprites.front_default} maxWidth="66px" width="100%" />
              <Typo variant="caption" color={black400} margin="6px 0 0 0">
                Your Pokemon
              </Typo>
            </Flex>
            <Img src="/static/svg/ic_switch.svg" width="20px" />
            <Flex direction="column" alignItems="center">
              <Img src={otherPokemon.sprites.front_default} maxWidth="66px" width="100%" />
              <Typo variant="caption" color={black400} margin="6px 0 0 0">
                Other Pokemon
              </Typo>
            </Flex>
          </Flex>
        </Flex>
        <Flex className="right-side" width="55%" direction="column">
          <Flex
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            margin=" 0 0 12px 0"
          >
            <Typo variant="body2" font={bold}>
              Your Pokemon Base Stats
            </Typo>
            <Img src="/static/svg/ic_switch.svg" width="18px" />
          </Flex>
          {myPokemon.stats.map((item, key) => (
            <BaseStats
              key={key}
              label={item.stat.name}
              value={item.base_stat}
              different={item.base_stat - otherPokemon?.stats[key]?.base_stat}
            />
          ))}
        </Flex>
      </Wrapper>
    </Container>
  );
};

ResultBox.propTypes = {
  myPokemon: PropTypes.object,
  otherPokemon: PropTypes.object,
};

export default ResultBox;