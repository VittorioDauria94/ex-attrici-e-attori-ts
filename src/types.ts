export const validNationalities = [
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
] as const;

export type Nationality = (typeof validNationalities)[number];

export const validActorNationalities = [
  ...validNationalities,
  "Scottish",
  "New Zealand",
  "Hong Kong",
  "German",
  "Canadian",
  "Irish",
] as const;

export type ActorNationality = (typeof validActorNationalities)[number];

export type Person = {
  readonly id: number;
  readonly name: string;
  birth_year: number;
  death_year?: number;
  biography: string;
  image: string;
};

export type Actress = Person & {
  most_famous_movies: [string, string, string];
  awards: string;
  nationality: Nationality;
};

export type Actor = Person & {
  known_for: [string, string, string];
  awards: [string] | [string, string];
  nationality: ActorNationality;
};
