import { describe, it, expect } from "@jest/globals";
import { validatePassword } from "../utils/password";
describe("Password Validator - White Box Testing", () => {
    // Test initial pour initialiser le rapport de couverture
    // Ce test ne couvre que la première ligne de la fonction (Branch 1)
    it("devrait rejeter un mot de passe vide", () => {
        const result = validatePassword("", 25);
        expect(result).toBe(false);
    });
    // TODO: Ajoutez vos tests ici pour atteindre 100% de couverture...
    it("devrait rejeter un mot de passe trop court", () => {
        const result = validatePassword("mdp", 25);
        expect(result).toBe(false);
    })

    it("devrait rejeter un mot de passe trop long", () => {
        const result = validatePassword("mot-de-passe-extremement-giga-mega-long", 25);
        expect(result).toBe(false);
    })

    it("moins de 12 ans, tout en majuscules, retourne une erreur", () => {
        const result = validatePassword("CACATOUTDUR", 10);
        expect(result).toBe(false);
    })

    it("moins de 12 ans avec minuscule retourne true", () => {
    const result = validatePassword("abcdef1!", 10);
    expect(result).toBe(true);
    });

    it("adulte sans majuscule, retourne une erreur", () => {
        const result = validatePassword("abcdefg1!", 30);
        expect(result).toBe(false);
    });

    it("adulte sans minuscule, retourne une erreur", () => {
        const result = validatePassword("ABCDEF1!", 30);
        expect(result).toBe(false);
    });    

    it("adulte sans chiffre, retourne une erreur", () => {
        const result = validatePassword("ABCdef!", 30);
        expect(result).toBe(false);
    });   
    
    it("adulte sans caractère spécial, retourne une erreur", () => {
        const result = validatePassword("ABCdef1", 25);
        expect(result).toBe(false);
    }); 


    it("adulte avec tous les critères, retourne true", () => {
        const result = validatePassword("Abcdef1!", 30);
        expect(result).toBe(true);
    });

    it("senior sans majuscule ni chiffre, retourne une erreur", () => {
        const result = validatePassword("abcdefg", 70);
        expect(result).toBe(false);
    });

    it("senior avec chiffre et sans majuscule, retourne true", () => {
        const result = validatePassword("abcdef1!", 70);
        expect(result).toBe(true);
    });

    it("senior avec majuscule et sans chiffre retourne true", () => {   
        const result = validatePassword("Abcdefgh!", 70);
        expect(result).toBe(true);
    });

    it("senior avec majuscule et chiffre, retourne true", () => {
        const result = validatePassword("Abcdefg11", 70);
        expect(result).toBe(true);
    });


});
