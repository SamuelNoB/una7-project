import fs from 'fs/promises';

/**
 * Com o path absoluto, obtem os dados de uma imagem e a converte em base64.
 */
export async function convertImage(path: string): Promise<string> {
  let base64Image = ''
  const rawImage = await fs.readFile(path)
  base64Image = rawImage.toString('base64')
  return base64Image;
}