const teamServices = require("./teamServices");

describe("validateTeamData", () => {
  // Base valid data
  const baseValidData = {
    name: "Alpha Squad",
    classCode: "A1B2C3",
    assignment: "Final Project",
    pokemonName: "Pikachu",
    hp: 100,
    attack: 50,
    defense: 40,
    specialAttack: 60,
    specialDefense: 55,
    speed: 80,
  };

  test("valid team data does not throw", () => {
    expect(() => {
      teamServices.validateTeamData(baseValidData);
    }).not.toThrow();
  });

  // Numeric fields to test
  const numericFields = [
    "hp",
    "attack",
    "defense",
    "specialAttack",
    "specialDefense",
    "speed",
  ];

  for (const field of numericFields) {
    test(`throws if ${field} is 'string'})`, () => {
      const data = { ...baseValidData };
      data[field] = "string";
      expect(() => {
        teamServices.validateTeamData(data);
      }).toThrow(`'${field}' must be a number`);
    });
  }

  // String fields to test
  const stringFieldReqs = [
    { key: "name", max: 255 },
    { key: "classCode", max: 8 },
    { key: "assignment", max: 255 },
    { key: "pokemonName", max: 100 },
  ];

  for (const reqs of stringFieldReqs) {
    const key = reqs.key;
    const max = reqs.max;

    test(`throws an error if ${key} is an empty string`, () => {
      const data = { ...baseValidData };
      data[key] = "";
      expect(() => {
        teamServices.validateTeamData(data)})
            .toThrow(`'${key}' must be a string of 1 - ${max} characters`);
    });

    test(`Throws if ${key} exceeds max length (${max})`, () => {
        const data = { ...baseValidData };
        data[key] = 'x'.repeat(max + 1);
        expect(() => teamServices.validateTeamData(data))
            .toThrow(`'${key}' must be a string of 1 - ${max} characters`)
    })
  }
});
