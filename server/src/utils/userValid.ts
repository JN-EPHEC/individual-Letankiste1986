export function validateUserRegistration(
  age: number,
  role: "admin" | "user" | "stagiaire",
  email: string
): boolean {  

  // 1. Âge doit être un nombre valide
  if (isNaN(age) || age < 0) {
    throw new Error("Âge invalide");
  }

  // 2. Rôle valide
  if (!["admin", "user", "stagiaire"].includes(role)) {
    throw new Error("Rôle invalide");
  }

  // 3. Âge limite max
  if (age > 120) {
    throw new Error("Âge invalide");
  }

  // 4. Email valide (@ + .)
  if (!email.includes("@") || !email.includes(".")) {
    return false;
  }

  // 5. Âge inférieur à 18 ans, renvoie false sauf stagiaire
  if (age < 18 && role !== "stagiaire") {
    return false;
  }


  return true;
}
