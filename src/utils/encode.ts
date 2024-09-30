export async function sha256(plain: string) {
  const encoder = new TextEncoder()

  return crypto.subtle.digest('SHA-256', encoder.encode(plain))
}

export function base64encode(input: string) {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}
