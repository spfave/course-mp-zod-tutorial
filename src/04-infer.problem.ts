// CODE

import { z } from "zod";

const StarWarsPerson = z.object({
  name: z.string(),
});

const StarWarsPeopleResults = z.object({
  results: z.array(StarWarsPerson),
});
type StarWarsPeople = z.infer<typeof StarWarsPeopleResults>;

// const logStarWarsPeopleResults = (data: unknown) => {
//                                    ^ 🕵️‍♂️
const logStarWarsPeopleResults = (data: StarWarsPeople) => {
  data.results.map((person) => {
    console.log(person.name);
  });
};
