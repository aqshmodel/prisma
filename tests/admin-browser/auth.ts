const user = {
  email: "fixture@example.invalid",
  getIdToken: async () => "fixture-token",
};
export function onAuthStateChanged(_auth: unknown, fn: (u: unknown) => void) {
  queueMicrotask(() => fn(user));
  return () => {};
}
export async function signInWithEmailAndPassword() {
  return user;
}
export async function signOut() {
  location.reload();
}
