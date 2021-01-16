import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import Flex from "../components/atoms/Flex";
import Button from "../components/atoms/Button";
import Img from "../components/atoms/Img";
import styled from "styled-components";
import { requestData } from "../helpers/global_helper";
import Card from "../components/molecules/Card/Card";
import Loading from "../components/molecules/Loading/Loading";
import Typo from "../components/atoms/Typography";
import { font, breakPoint } from "../styles/_variables";
import Footer from "../components/molecules/Footer/Footer";
import DetailPokemon from "../components/organism/DetailPokemon/DetailPokemon";

const { bold } = font;
const { mobileXL } = breakPoint;

const Logo = styled(Img)`
  max-width: 214px;
  width: 100%;

  @media only screen and (max-width: ${mobileXL + 1}px) {
    max-width: 140px;
  }
`;

const pokemonList = () => {
  const [loading, setLoading] = useState(true);

  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState("https://pokeapi.co/api/v2/pokemon/");

  const [selected, setSelected] = useState({});
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let response = await requestData(currentUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemonDetail(response.results);
      setLoading(false);
    }
    fetchData();
  }, [currentUrl]);

  const loadPokemonDetail = async (data) => {
    let _data = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await requestData(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_data);
  };

  const handleNext = () => {
    setCurrentUrl(nextUrl);
  };

  const handleBack = () => {
    setCurrentUrl(prevUrl);
  };

  const handleSelected = (data) => {
    setExpand(true);
    setSelected(data);
  };

  return (
    <MainLayout title="Pokedex - List Pokemon">
      <Flex width="100%" padding="24px 16px" justifyContent="space-between" alignItems="center">
        <Logo src="/static/img/logo_pokemon.png" onClick={() => (window.location.href = "/")} />
        <Flex alignItems="center" wrap="wrap" justifyContent="flex-end">
          {prevUrl && (
            <Button
              onClick={handleBack}
              width="fit-content"
              padding="10px 32px"
              margin="0 10px 10px 0"
            >
              <Typo variant="body2" font={bold} color="white">
                Back
              </Typo>
            </Button>
          )}
          <Button
            onClick={handleNext}
            variant="green"
            width="fit-content"
            padding="10px 32px"
            margin="0 10px 10px 0"
          >
            <Typo variant="body2" font={bold} color="white">
              Next
            </Typo>
          </Button>
        </Flex>
      </Flex>
      {loading ? (
        <Loading />
      ) : (
        <Flex
          width="100%"
          justifyContent="space-around"
          padding="0 16px"
          style={{ marginTop: "50px", flexWrap: "wrap" }}
        >
          {pokemonData.map((item) => (
            <Card key={item.id} data={item} onClick={() => handleSelected(item)} />
          ))}
        </Flex>
      )}
      <DetailPokemon expand={expand} setExpand={setExpand} title="Detail Pokemon" data={selected} />
      <Footer position={loading ? "absolute" : "static"} />
    </MainLayout>
  );
};

pokemonList.propTypes = {};

export default pokemonList;