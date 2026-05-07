import type { Actress } from "./types";

const validNationalities = [
  "American",
  "British",
  "Australian",
  "Israeli-American",
  "South African",
  "French",
  "Indian",
  "Israeli",
  "Spanish",
  "South Korean",
  "Chinese",
];

function isActress(data: unknown): data is Actress {
  if (
    data &&
    typeof data === "object" &&
    "id" in data &&
    typeof data.id === "number" &&
    "name" in data &&
    typeof data.name === "string" &&
    "birth_year" in data &&
    typeof data.birth_year === "number" &&
    (!("death_year" in data) || typeof data.death_year === "number") &&
    "biography" in data &&
    typeof data.biography === "string" &&
    "image" in data &&
    typeof data.image === "string" &&
    "most_famous_movies" in data &&
    Array.isArray(data.most_famous_movies) &&
    data.most_famous_movies.length === 3 &&
    data.most_famous_movies.every((movie) => typeof movie === "string") &&
    "awards" in data &&
    typeof data.awards === "string" &&
    "nationality" in data &&
    typeof data.nationality === "string" &&
    validNationalities.includes(data.nationality)
  ) {
    return true;
  }

  return false;
}

async function getActress(id: number): Promise<Actress | null> {
  try {
    const resp = await fetch(`http://localhost:3333/actresses/${id}`);

    if (!resp.ok) {
      throw new Error("Errore nella risposta del server");
    }

    const data: unknown = await resp.json();

    if (!isActress(data)) {
      throw new Error("Formato dati non valido");
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getAllActresses(): Promise<Actress[]> {
  const resp = await fetch("http://localhost:3333/actresses");

  if (!resp.ok) {
    throw new Error("Errore nella risposta del server");
  }

  const data: unknown = await resp.json();

  if (!Array.isArray(data)) {
    throw new Error("Formato dati non valido");
  }

  const actresses: Actress[] = [];

  data.forEach((actress: unknown) => {
    if (!isActress(actress)) {
      throw new Error("Formato dati non valido");
    }
    actresses.push(actress);
  });

  return actresses;
}
