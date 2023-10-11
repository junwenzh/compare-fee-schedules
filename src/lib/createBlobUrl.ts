export function createBlobUrl(text: string) {
  const blob = new Blob([text], { type: 'text/plain' });
  const blobUrl = URL.createObjectURL(blob);
  return blobUrl;
}
