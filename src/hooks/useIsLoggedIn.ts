import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Hydration-safe login check for client components.
 * Server render and first client render both return `false`; once hydrated it
 * reads the same `accessToken` cookie your `useAuthToken` hook uses, so the
 * server HTML and the client tree never disagree.
 *
 * (The cookie must not be HttpOnly for document.cookie to see it, same as today.)
 */
export function useIsLoggedIn() {
    return useSyncExternalStore(
        noopSubscribe,
        () =>
            document.cookie
                .split(";")
                .some((cookie) => cookie.trim().startsWith("accessToken=")),
        () => false,
    );
}