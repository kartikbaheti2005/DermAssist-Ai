"""Server-side provider abstraction for AI text generation."""
from abc import ABC, abstractmethod
from typing import Any
from urllib.parse import quote
import requests

from core.config import (
    ANTHROPIC_API_KEY, GEMINI_API_KEY, GROQ_API_KEY,
    LLM_MODEL, LLM_PROVIDER, OPENAI_API_KEY,
)


class LLMProviderError(RuntimeError):
    """Safe, user-presentable provider configuration/request error."""


class LLMProvider(ABC):
    name: str

    @abstractmethod
    def generate(self, system_prompt: str, messages: list[dict[str, str]]) -> str:
        raise NotImplementedError

    @staticmethod
    def post(url: str, headers: dict[str, str], payload: dict[str, Any]) -> dict[str, Any]:
        try:
            response = requests.post(url, headers=headers, json=payload, timeout=(5, 45))
        except requests.RequestException as exc:
            raise LLMProviderError("The configured AI provider could not be reached. Try again shortly.") from exc
        if not response.ok:
            if response.status_code in (401, 403):
                message = "The configured AI provider rejected its credentials. Check the backend provider key."
            elif response.status_code == 429:
                message = "The configured AI provider is rate limited. Try again shortly."
            else:
                message = f"The configured AI provider returned an error (HTTP {response.status_code}). Check the backend model configuration."
            raise LLMProviderError(message)
        try:
            return response.json()
        except ValueError as exc:
            raise LLMProviderError("The configured AI provider returned an invalid response.") from exc


class OpenAICompatibleProvider(LLMProvider):
    def __init__(self, name: str, key: str | None, base_url: str, model: str):
        if not key:
            raise LLMProviderError(f"Set the API key for {name} in the backend environment.")
        if not model:
            raise LLMProviderError("Set LLM_MODEL in the backend environment for the selected provider.")
        self.name, self.key, self.base_url, self.model = name, key, base_url.rstrip("/"), model

    def generate(self, system_prompt: str, messages: list[dict[str, str]]) -> str:
        data = self.post(
            f"{self.base_url}/chat/completions",
            {"Authorization": f"Bearer {self.key}", "Content-Type": "application/json"},
            {"model": self.model, "messages": [{"role": "system", "content": system_prompt}, *messages], "max_completion_tokens": 900},
        )
        try:
            content = data["choices"][0]["message"]["content"]
        except (KeyError, IndexError, TypeError) as exc:
            raise LLMProviderError("The configured AI provider returned no text response.") from exc
        if isinstance(content, list):
            content = "".join(part.get("text", "") for part in content if isinstance(part, dict))
        if not isinstance(content, str) or not content.strip():
            raise LLMProviderError("The configured AI provider returned an empty response.")
        return content.strip()


class ClaudeProvider(LLMProvider):
    name = "claude"

    def __init__(self, key: str | None, model: str):
        if not key:
            raise LLMProviderError("Set ANTHROPIC_API_KEY in the backend environment to use Claude.")
        if not model:
            raise LLMProviderError("Set LLM_MODEL to a Claude model ID in the backend environment.")
        self.key, self.model = key, model

    def generate(self, system_prompt: str, messages: list[dict[str, str]]) -> str:
        data = self.post(
            "https://api.anthropic.com/v1/messages",
            {"x-api-key": self.key, "anthropic-version": "2023-06-01", "Content-Type": "application/json"},
            {"model": self.model, "max_tokens": 900, "system": system_prompt, "messages": messages},
        )
        result = "".join(x.get("text", "") for x in data.get("content", []) if isinstance(x, dict) and x.get("type") == "text")
        if not result.strip():
            raise LLMProviderError("The configured AI provider returned an empty response.")
        return result.strip()


class GeminiProvider(LLMProvider):
    name = "gemini"

    def __init__(self, key: str | None, model: str):
        if not key:
            raise LLMProviderError("Set GEMINI_API_KEY in the backend environment to use Gemini.")
        if not model:
            raise LLMProviderError("Set LLM_MODEL to a Gemini model ID in the backend environment.")
        self.key, self.model = key, model

    def generate(self, system_prompt: str, messages: list[dict[str, str]]) -> str:
        contents = [
            {"role": "model" if item["role"] == "assistant" else "user", "parts": [{"text": item["content"]}]}
            for item in messages
        ]
        data = self.post(
            f"https://generativelanguage.googleapis.com/v1beta/models/{quote(self.model, safe='')}:generateContent",
            {"x-goog-api-key": self.key, "Content-Type": "application/json"},
            {"systemInstruction": {"parts": [{"text": system_prompt}]}, "contents": contents, "generationConfig": {"maxOutputTokens": 900}},
        )
        try:
            parts = data["candidates"][0]["content"]["parts"]
        except (KeyError, IndexError, TypeError) as exc:
            raise LLMProviderError("The configured AI provider returned no text response.") from exc
        result = "".join(item.get("text", "") for item in parts if isinstance(item, dict))
        if not result.strip():
            raise LLMProviderError("The configured AI provider returned an empty response.")
        return result.strip()


def get_llm_provider() -> LLMProvider:
    provider, model = (LLM_PROVIDER or "").lower(), LLM_MODEL
    if provider in ("openai", "groq"):
        if provider == "groq" and not model:
            model = "openai/gpt-oss-20b"
        key = OPENAI_API_KEY if provider == "openai" else GROQ_API_KEY
        base = "https://api.openai.com/v1" if provider == "openai" else "https://api.groq.com/openai/v1"
        return OpenAICompatibleProvider(provider, key, base, model)
    if provider in ("claude", "anthropic"):
        return ClaudeProvider(ANTHROPIC_API_KEY, model)
    if provider in ("gemini", "google"):
        return GeminiProvider(GEMINI_API_KEY, model)
    raise LLMProviderError("Unsupported LLM_PROVIDER. Choose groq, openai, claude, or gemini.")


def provider_is_configured() -> bool:
    try:
        get_llm_provider()
    except LLMProviderError:
        return False
    return True
