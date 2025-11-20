from llm import get_answer

answer = get_answer(
    "What is the topic of this PDF?",
    [
        "This PDF discusses machine learning and neural networks."
        "This PDF discusses Astronomy too."
    ]
)


print("\nLLM Response:")
print(answer)
