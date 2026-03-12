import { describe, it, expect } from "@jest/globals";
import { validatePassword } from "../utils/password";

describe("Password Validator - White Box Testing", () => {
  // Branch 1 : pwd vide
  it("devrait rejeter un mot de passe vide", () => {
    const result = validatePassword("", 25);
    expect(result).toBe(false);
  });

  // Branch 2 : longueur < 8
  it("devrait rejeter un mot de passe trop court", () => {
    const result = validatePassword("mdp", 25);
    expect(result).toBe(false);
  });

  // Branch 3 : longueur > 20
  it("devrait rejeter un mot de passe trop long", () => {
    const result = validatePassword("mot-de-passe-extremement-giga-mega-long", 25);
    expect(result).toBe(false);
  });

  // Branch 4 : enfant (<12) sans minuscule
  it("moins de 12 ans, tout en majuscules, retourne une erreur", () => {
    const result = validatePassword("CACATOUTDUR", 10);
    expect(result).toBe(false);
  });

  // Enfant valide : <12 avec minuscule(s)
  it("moins de 12 ans avec minuscule retourne true", () => {
    const result = validatePassword("abcdefg1", 10); // >= 8, contient minuscule
    expect(result).toBe(true);
  });

  // Branch 5 - cas d'erreur : adulte sans majuscule
  it("adulte sans majuscule, retourne une erreur", () => {
    const result = validatePassword("abcdefg1!", 30);
    expect(result).toBe(false);
  });

  // Branch 5 - cas d'erreur : adulte sans minuscule
  it("adulte sans minuscule, retourne une erreur", () => {
    const result = validatePassword("ABCDEFG1!", 30);
    expect(result).toBe(false);
  });

  // Branch 5 - cas d'erreur : adulte sans chiffre
  it("adulte sans chiffre, retourne une erreur", () => {
    const result = validatePassword("Abcdefgh!", 30);
    expect(result).toBe(false);
  });

  // Branch 5 - cas d'erreur global (aucune maj/min/chiffre, que des spéciaux)
  it("adulte sans majuscule, minuscule ni chiffre (seulement spéciaux) retourne une erreur", () => {
    const result = validatePassword("!!!!!????", 30);
    expect(result).toBe(false);
  });

  // Branch 6 : adulte sans caractère spécial
  it("adulte sans caractère spécial, retourne une erreur", () => {
    const result = validatePassword("ABCdef12", 30);
    expect(result).toBe(false);
  });

  // Adulte valide : toutes les catégories présentes
  it("adulte avec tous les critères, retourne true", () => {
    const result = validatePassword("Abcdef1!", 30);
    expect(result).toBe(true);
  });

  // Branch 7 : senior sans chiffre NI majuscule
  it("senior sans majuscule ni chiffre, retourne une erreur", () => {
    const result = validatePassword("abcdefg!", 70);
    expect(result).toBe(false);
  });

  // Senior valide : chiffre mais pas de majuscule
  it("senior avec chiffre et sans majuscule, retourne true", () => {
    const result = validatePassword("abcdef1!", 70);
    expect(result).toBe(true);
  });

  // Senior valide : majuscule mais pas de chiffre
  it("senior avec majuscule et sans chiffre retourne true", () => {
    const result = validatePassword("Abcdefgh!", 70);
    expect(result).toBe(true);
  });

  // Senior valide : majuscule + chiffre
  it("senior avec majuscule et chiffre, retourne true", () => {
    const result = validatePassword("Abcdefg11", 70);
    expect(result).toBe(true);
  });
});
