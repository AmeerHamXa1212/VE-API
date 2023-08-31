export function generateRandomCodes(Codecount: number): string[] {
  const codes: string[] = [];
  const characters_Upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const characters_Lower = "abcdefghijklmnopqrstuvwxyz";

  const dictionary = characters_Lower + numbers + characters_Upper;

  for (let i = 0; i < Codecount; i++) {
    console.log(`Generating code ${i + 1}`);

    const codeLength = 8;
    let code = "";

    for (let j = 0; j < codeLength; j++) {
      const randomIndex = Math.floor(Math.random() * dictionary.length);
      code += dictionary.charAt(randomIndex);
    }
    codes.push(code);
  }
  return codes;
}
