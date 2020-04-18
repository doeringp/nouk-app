import { FirstName, Gender } from './models'

export const sampleFirstNames : FirstName[] = [
  new FirstName({
    gender: Gender.Female,
    name: "Rebekka",
    meaning: "hebräisch: die Bestrickende, die Betörende, Mastkalb",
  }),
  new FirstName({
    gender: Gender.Female,
    name: "Leonida",
    meaning: "griechisch: die Löwin, die Starke, die Kämpferin",
  }),
  new FirstName({
    gender: Gender.Female,
    name: "Nadja",
    meaning: "russisch: Nadeschda = Hoffnung",
  }),
  new FirstName({
    gender: Gender.Male,
    name: "Peter",
    meaning: "der Fels",
  }),
  new FirstName({
    gender: Gender.Male,
    name: "Lysander",
    meaning: "griechisch: der Männer lösende/befreiende",
  }),
  new FirstName({
    gender: Gender.Male,
    name: "Alexander",
    meaning: "griechisch: der Männer abwehrende",
  })
];
