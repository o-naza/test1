import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";

function randomEmail() {
  return `${randomUUID()}@example.com`;
}

export const user = {
  email: randomEmail(),
  password: "Pa$$w0rd!",
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  birthDate: faker.date.birthdate({ min: 18, max: 65, mode: "age" }).toLocaleDateString("en-GB").replace(/\//g, "."),
  city: faker.location.city(),
  address: faker.location.streetAddress(),
  postalCode: faker.location.zipCode(),
  gender: faker.number.int({ min: 1, max: 2 }).toString(),
};
