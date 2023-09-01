export function generateRandomCodes(
  Codecount: number
): Array<{ gameCode: string }> {
  const codes: Array<{ gameCode: string }> = [];
  const characters_Upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const characters_Lower = "abcdefghijklmnopqrstuvwxyz";

  const dictionary = characters_Lower + numbers + characters_Upper;

  for (let i = 0; i < Codecount; i++) {
    const codeLength = 8;
    let code = "";

    for (let j = 0; j < codeLength; j++) {
      const randomIndex = Math.floor(Math.random() * dictionary.length);
      code += dictionary.charAt(randomIndex);
    }
    codes.push({ gameCode: code });
  }
  return codes;
}
