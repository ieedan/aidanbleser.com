export type HttpResponse<T> = {
    ok: boolean;
    body: T | null;
};

export const get = async <T>(to: string): Promise<HttpResponse<T>> => {
    return await fetchData<T>("GET", to);
};

export const post = async <T>(to: string, body: object | null = null): Promise<HttpResponse<T>> => {
    return await fetchData<T>("POST", to, body);
};

export const put = async <T>(to: string, body: object | null = null): Promise<HttpResponse<T>> => {
    return await fetchData<T>("PUT", to, body);
};

export const del = async <T>(to: string, body: object | null = null): Promise<HttpResponse<T>> => {
    return await fetchData<T>("DELETE", to, body);
};

/** Removes leading '/' if present */
const formatEndpoint = (endpoint: string) => {
    if (endpoint[0] === "/") return endpoint.slice(1);

    return endpoint;
};

async function fetchData<T>(
    method: string,
    to: string,
    body: object | null = null,
): Promise<HttpResponse<T>> {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    let requestOptions: RequestInit;

    if (body != null) {
        requestOptions = {
            method: method,
            mode: "cors",
            body: JSON.stringify(body),
            headers: headers,
            redirect: "follow",
        };
    } else {
        requestOptions = {
            method: method,
            mode: "cors",
            headers: headers,
            redirect: "follow",
        };
    }

    const url = import.meta.env.VITE_API_URL + formatEndpoint(to);

    return await fetch(url, requestOptions)
        .then((response) => {
            if (response.headers.get("Content-Type")?.includes("application/json")) {
                return Promise.all([response.ok, response.json().catch(() => null)]);
            }
            return Promise.all([response.ok, response.text().catch(() => null)]);
        })
        .then((a) => {
            return { ok: a[0], body: a[1] };
        });
}
