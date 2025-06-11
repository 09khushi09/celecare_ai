export const getImage = async (imageUrl: string, mimeType: string) => {
  if (!imageUrl || !mimeType) {
    return;
  }

  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch image");
  }

  const imageBuffer = await response.arrayBuffer();
  const imageBase64 = Buffer.from(imageBuffer).toString("base64");

  return {
    inlineData: {
      data: imageBase64,
      mimeType,
    },
  };
};
