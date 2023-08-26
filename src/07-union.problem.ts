// CODE

import { expect, it } from "vitest";
import { TypeOf, z } from "zod";

const Form = z.object({
  repoName: z.string(),
  // privacyLevel: z.string(),
  //              ^ 🕵️‍♂️
  privacyLevel: z.enum(["private", "public"]),
});
type FormType = z.infer<typeof Form>;

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};

// TESTS

it("Should fail if an invalid privacyLevel passed", async () => {
  expect(() =>
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "something-not-allowed",
    }),
  ).toThrowError();
});

it("Should permit valid privacy levels", async () => {
  expect(
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "private",
    }).privacyLevel,
  ).toEqual("private");

  expect(
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "public",
    }).privacyLevel,
  ).toEqual("public");
});
