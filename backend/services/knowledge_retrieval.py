"""Injectable retrieval seam; no corpus is configured, so default is empty."""
from typing import Protocol


class KnowledgeRetriever(Protocol):
    def retrieve(self, query: str, *, limit: int = 4) -> list[dict[str, str]]: ...


class EmptyKnowledgeRetriever:
    def retrieve(self, query: str, *, limit: int = 4) -> list[dict[str, str]]:
        return []


_retriever: KnowledgeRetriever = EmptyKnowledgeRetriever()


def configure_knowledge_retriever(retriever: KnowledgeRetriever) -> None:
    global _retriever
    _retriever = retriever


def retrieve_medical_references(query: str, *, limit: int = 4) -> list[dict[str, str]]:
    return _retriever.retrieve(query, limit=limit)
