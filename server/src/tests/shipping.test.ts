import { calculateShipping } from "../utils/shipping";
import { describe, it, expect, test } from "@jest/globals";

describe("calculateShipping - Catalog Based", () => {
  test.each([
    [-1, 5, "standard", "Invalid distance"],     // distance négative
    [10, 0, "standard", "Invalid weight"],       // poids nul
    [10, 60, "standard", "Invalid weight"],      // poids trop lourd, courte distance
    [10, 5, "standard", 10],                     // base 10€
    [1000, 10, "standard", 75],                  // base 50€ + 50% = 75€
    [1000, 60, "standard", "Invalid weight"],    // poids trop lourd, longue distance
    [10, 5, "express", 20],                      // base 10€ * 2 = 20€
    [10, 20, "express", 30],                     // base 10€ + 50% = 15€ * 2 = 30€
    [100, 10, "express", 75],                    // base 25€ + 50% = 37.5€ * 2 = 75€
    [1000, 5, "express", 100],                   // base 50€ * 2 = 100€
    [1000, 20, "express", 150],                  // base 50€ + 50% = 75€ * 2 = 150€
    [-5, 60, "express", "Invalid distance"]    // distance négative et poids trop lourd 
    
])("distance=%i poids=%i type=%s", 
    (distance : number, weight : number, type : string, expected : any) => {
    if (typeof expected === "string") { 
        expect(() => calculateShipping(distance, weight, type as "standard" | "express")).toThrow(expected);
    } else {
        expect(calculateShipping(distance, weight, type as "standard" | "express")).toBe(expected);
    }
  });
});
