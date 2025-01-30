import { type UUID, type Character } from "@elizaos/core";

const BASE_URL = "http://localhost:3000";

const fetcher = async ({
    url,
    method,
    body,
    headers,
}: {
    url: string;
    method?: "GET" | "POST";
    body?: object | FormData;
    headers?: HeadersInit;
}) => {
    const options: RequestInit = {
        method: method ?? "GET",
        headers: headers
            ? headers
            : {
                  Accept: "application/json",
                  "Content-Type": "application/json",
              },
    };

    if (method === "POST") {
        if (body instanceof FormData) {
            // @ts-expect-error - Supressing potentially undefined options header
            delete options.headers["Content-Type"];
            options.body = body;
        } else {
            options.body = JSON.stringify(body);
        }
    }

    return fetch(`${BASE_URL}${url}`, options).then(async (resp) => {
        if (resp.ok) {
            const contentType = resp.headers.get("Content-Type");

            if (contentType === "audio/mpeg") {
                return await resp.blob();
            }
            return resp.json();
        }

        const errorText = await resp.text();
        console.error("Error: ", errorText);

        let errorMessage = "An error occurred.";
        try {
            const errorObj = JSON.parse(errorText);
            errorMessage = errorObj.message || errorMessage;
        } catch {
            errorMessage = errorText || errorMessage;
        }

        throw new Error(errorMessage);
    });
};

export const apiClient = {
    async sendMessage(agentId: string, message: string, selectedFile?: File | null) {
        const formData = new FormData();
        formData.append("text", message);
        formData.append("user", "user");

        if (selectedFile) {
            formData.append("file", selectedFile);
        }
        return fetcher({
            url: `/${agentId}/message`,
            method: "POST",
            body: formData,
        });
    },

    async getMessages(agentId: string) {
        const response = await fetch(`/api/agents/${agentId}/messages`);
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        return response.json();
    },

    async getAgents() {
        return fetcher({ url: "/agents" });
    },

    async getAgent(agentId: string): Promise<{ id: UUID; character: Character }> {
        return fetcher({ url: `/agents/${agentId}` });
    },

    async tts(agentId: string, text: string) {
        return fetcher({
            url: `/${agentId}/tts`,
            method: "POST",
            body: {
                text,
            },
            headers: {
                "Content-Type": "application/json",
                Accept: "audio/mpeg",
                "Transfer-Encoding": "chunked",
            },
        });
    },

    async whisper(agentId: string, audioBlob: Blob) {
        const formData = new FormData();
        formData.append("file", audioBlob, "recording.wav");
        return fetcher({
            url: `/${agentId}/whisper`,
            method: "POST",
            body: formData,
        });
    },
};
