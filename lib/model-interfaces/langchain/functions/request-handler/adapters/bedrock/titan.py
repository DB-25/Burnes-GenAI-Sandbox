import genai_core.clients
from langchain.prompts.prompt import PromptTemplate

from langchain.llms import Bedrock

from ..base import ModelAdapter
from genai_core.registry import registry


class BedrockTitanAdapter(ModelAdapter):
    def __init__(self, model_id, *args, **kwargs):
        self.model_id = model_id

        super().__init__(*args, **kwargs)

    def get_llm(self, model_kwargs={}):
        bedrock = genai_core.clients.get_bedrock_client()

        params = {}
        if "temperature" in model_kwargs:
            params["temperature"] = model_kwargs["temperature"]
        if "topP" in model_kwargs:
            params["topP"] = model_kwargs["topP"]
        if "maxTokens" in model_kwargs:
            params["maxTokenCount"] = model_kwargs["maxTokens"]

        return Bedrock(
            client=bedrock,
            model_id=self.model_id,
            model_kwargs=params,
            streaming=model_kwargs.get("streaming", False),
            callbacks=[self.callback_handler],
        )

    def get_prompt(self):
        template = """
    Human: Engage in a friendly conversation with an AI. The AI is designed to be talkative and provide extensive details from its knowledge base. If unsure about any question, the AI will honestly indicate its lack of knowledge.

    Current conversation:
    {chat_history}

    Upcoming question:
    {input}

    Assistant:
    """

        input_variables = ["input", "chat_history"]
        prompt_template_args = {
            "chat_history": "{chat_history}",
            "input_variables": input_variables,
            "template": template,
        }
        prompt_template = PromptTemplate(**prompt_template_args)

        return prompt_template


# Register the adapter
registry.register(r"^bedrock.amazon.titan-t*", BedrockTitanAdapter)
