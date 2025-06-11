export const userPromptParts = (
  imageUrl: string | null,
  mimeType: string,
  prompt: string
) => {
  const parts = [];

  if (imageUrl) {
    parts.push({
      fileData: {
        fileUri: imageUrl,
        mimeType,
      },
    });
  }

  if (prompt) {
    parts.push({
      text: prompt,
    });
  }

  return parts;
};
