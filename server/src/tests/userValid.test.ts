import { validateUserRegistration } from "../utils/userValid";
import { describe, it, expect, test } from "@jest/globals";

describe("validateUserRegistration", () => {
  test("retourne true pour une inscription d'utilisateur valide", () => {
    const result = validateUserRegistration(25, "user", "test@example.com");
    expect(result).toBe(true);
  });

  test("retourne une erreur pour un âge invalide", () => {
    expect(() => validateUserRegistration(-5, "user", "test@example.com")).toThrow("Âge invalide");
  });

  test("retourne une erreur pour un rôle invalide", () => {
    expect(() => validateUserRegistration(25, "invalid" as any, "test@example.com")).toThrow("Rôle invalide");
  });

  test("retourne une erreur pour un âge dépassant la limite", () => {
    expect(() => validateUserRegistration(150, "user", "test@example.com")).toThrow("Âge invalide");
  });

  test("retourne false pour un email invalide", () => {
    const result = validateUserRegistration(25, "user", "invalid-email");
    expect(result).toBe(false);
  });

  test("retourne false pour un âge inférieur à 18 ans et non stagiaire", () => {
    const result = validateUserRegistration(16, "user", "test@example.com");
    expect(result).toBe(false);
  });

  test("retourne true pour un âge inférieur à 18 ans et stagiaire", () => {
    const result = validateUserRegistration(16, "stagiaire", "test@example.com");
    expect(result).toBe(true);
  });
});