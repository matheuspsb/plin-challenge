"use client";

import React, { useState } from "react";
import { states } from "../../utils/states";
import InputWithLabel from "@/components/InputWithIcon";

interface CepData {
  cep: string;
  logradouro: string;
  bairro: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

const SearchPage: React.FC = () => {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [results, setResults] = useState<CepData[]>([]);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    setError("");
    if (!state || !city) {
      setError("Por favor, selecione um estado e digite o nome da cidade.");
      return;
    }

    if (!street) {
      setError("Por favor, digite o nome da rua.");
      return;
    }

    setSearching(true);

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${state}/${city}/${street}/json/`
      );
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        console.error("API request failed with status:", response.status);
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
    } finally {
      setSearching(false);
      setSearched(true);
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center h-screen">
      <div className="border-2 border-white-300 rounded-lg p-6 w-full sm:w-96">
        <h1 className="text-2xl font-semibold mb-4 leading-6 text-gray-900">
          Buscar CEP
        </h1>
        <div className="flex flex-col space-y-4">
          <InputWithLabel
            label="Estado"
            type="select"
            value={state}
            options={states}
            onChange={(e) => setState(e.target.value)}
            placeholder="Selecione um Estado"
          />
          <InputWithLabel
            label="Nome da Cidade"
            type="text"
            placeholder="Ex: São Paulo"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <InputWithLabel
            label="Nome da Rua"
            type="text"
            placeholder="Ex: Av. Paulista"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={() => {
              handleSearch();
              setSearched(true);
            }}
          >
            Buscar CEP
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
      <div className="mt-4 text-center">
        {searching ? (
          <p>Realizando a busca...</p>
        ) : results.length > 0 ? (
          <div>
            {results.map((result, index) => (
              <div className="text-left" key={index}>
                <strong>CEP:</strong> {result.cep}
                <br />
                <strong>Logradouro:</strong> {result.logradouro}
                <br />
                <strong>Bairro:</strong> {result.bairro}
                <hr />
              </div>
            ))}
          </div>
        ) : searched && !error ? (
          <p>Nenhum resultado encontrado.</p>
        ) : null}
      </div>
    </div>
  );
};

export default SearchPage;
