import { useSyncExternalStore } from "react";
const subscribe = (fn: () => void) => {
  window.addEventListener("popstate", fn);
  return () => window.removeEventListener("popstate", fn);
};
export function useSearchParams() {
  return new URLSearchParams(
    useSyncExternalStore(subscribe, () => location.search),
  );
}
export function useRouter() {
  return {
    replace: (url: string) => {
      history.replaceState(null, "", url);
      window.dispatchEvent(new Event("popstate"));
    },
  };
}
