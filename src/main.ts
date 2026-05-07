import type { Actress } from "./types";
import type { Actor } from "./types";
import type { Nationality } from "./types";
import type { ActorNationality } from "./types";

import { validNationalities } from "./types";
import { validActorNationalities } from "./types";

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
    validNationalities.includes(data.nationality as Nationality)
  ) {
    return true;
  }

  return false;
}

function isActor(data: unknown): data is Actor {
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
    "known_for" in data &&
    Array.isArray(data.known_for) &&
    data.known_for.length === 3 &&
    data.known_for.every((movie) => typeof movie === "string") &&
    "awards" in data &&
    Array.isArray(data.awards) &&
    (data.awards.length === 1 || data.awards.length === 2) &&
    data.awards.every((award) => typeof award === "string") &&
    "nationality" in data &&
    typeof data.nationality === "string" &&
    validActorNationalities.includes(data.nationality as ActorNationality)
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
  try {
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
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getActresses(ids: number[]): Promise<(Actress | null)[]> {
  return Promise.all(ids.map((id) => getActress(id)));
}

type CreateActressData = Omit<Actress, "id">;

type UpdateActressData = Partial<Omit<Actress, "id" | "name">>;

function createActress(data: CreateActressData): Actress {
  const randomId = Math.floor(Math.random() * 1000000);

  return {
    id: randomId,
    ...data,
  };
}

function updateActress(actress: Actress, updates: UpdateActressData): Actress {
  return {
    ...actress,
    ...updates,
  };
}

async function getActor(id: number): Promise<Actor | null> {
  try {
    const resp = await fetch(`http://localhost:3333/actors/${id}`);

    if (!resp.ok) {
      throw new Error("Errore nella risposta del server");
    }

    const data: unknown = await resp.json();

    if (!isActor(data)) {
      throw new Error("Formato dati non valido");
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getAllActors(): Promise<Actor[]> {
  try {
    const resp = await fetch("http://localhost:3333/actors");

    if (!resp.ok) {
      throw new Error("Errore nella risposta del server");
    }

    const data: unknown = await resp.json();

    if (!Array.isArray(data)) {
      throw new Error("Formato dati non valido");
    }

    const actors: Actor[] = [];

    data.forEach((actor: unknown) => {
      if (!isActor(actor)) {
        throw new Error("Formato dati non valido");
      }
      actors.push(actor);
    });

    return actors;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getActors(ids: number[]): Promise<(Actor | null)[]> {
  return Promise.all(ids.map((id) => getActor(id)));
}

type CreateActorData = Omit<Actor, "id">;

type UpdateActorData = Partial<Omit<Actor, "id" | "name">>;

function createActor(data: CreateActorData): Actor {
  const randomId = Math.floor(Math.random() * 1000000);

  return {
    id: randomId,
    ...data,
  };
}

function updateActor(actor: Actor, updates: UpdateActorData): Actor {
  return {
    ...actor,
    ...updates,
  };
}

async function createRandomCouple(): Promise<[Actress, Actor]> {
  const actresses = await getAllActresses();
  const actors = await getAllActors();

  if (actresses.length === 0 || actors.length === 0) {
    throw new Error("Impossibile creare una coppia casuale");
  }

  const randomActressIndex = Math.floor(Math.random() * actresses.length);
  const randomActorIndex = Math.floor(Math.random() * actors.length);

  const randomActress = actresses[randomActressIndex];
  const randomActor = actors[randomActorIndex];

  return [randomActress, randomActor];
}
