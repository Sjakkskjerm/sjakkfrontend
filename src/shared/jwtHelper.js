export function jwtDecrypt(token) {
  let base64Url = token.split(".")[1]; // token you get
  let base64 = base64Url.replace("-", "+").replace("_", "/");
  let decodedData = JSON.parse(
    Buffer.from(base64, "base64").toString("binary")
  );
  return decodedData;
}

export function tokenAlive(exp) {
  if (Date.now() >= exp * 1000) {
    return false;
  }

  return true;
}
