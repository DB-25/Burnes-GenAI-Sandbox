import genai_core.clients

# from langchain.llms import Bedrock
from langchain.prompts.prompt import PromptTemplate

from .base import Bedrock
from ..base import ModelAdapter
from genai_core.registry import registry


class BedrockClaudeAdapter(ModelAdapter):
    def __init__(self, model_id, *args, **kwargs):
        self.model_id = model_id

        super().__init__(*args, **kwargs)

    def get_llm(self, model_kwargs={}):
        bedrock = genai_core.clients.get_bedrock_client()
        params = {}
        if "temperature" in model_kwargs:
            params["temperature"] = model_kwargs["temperature"]
        if "topP" in model_kwargs:
            params["top_p"] = model_kwargs["topP"]
        if "maxTokens" in model_kwargs:
            params["max_tokens"] = model_kwargs["maxTokens"]

        params["anthropic_version"] = "bedrock-2023-05-31"
        return Bedrock(
            client=bedrock,
            model_id=self.model_id,
            model_kwargs=params,
            streaming=model_kwargs.get("streaming", False),
            callbacks=[self.callback_handler],
        )

    def get_qa_prompt(self):
        template = """Please utilize the context provided below to answer the subsequent question. If the answer is unknown to you, simply state 'I don't know' rather than attempting to fabricate a response.

        Context provided:
        {context}

        Question to answer:
        {question}
        """

        return PromptTemplate(
            template=template, input_variables=["context", "question"]
        )

    def get_prompt(self):
        template = """This is a friendly conversation between a human and an AI. If the AI is unsure about an answer, it will honestly state that it does not know.

    Current conversation:
    {chat_history}

    Question:
    {input}"""

        input_variables = ["input", "chat_history"]
        prompt_template_args = {
            "chat_history": "{chat_history}",
            "input_variables": input_variables,
            "template": template,
        }
        prompt_template = PromptTemplate(**prompt_template_args)

        return prompt_template

    def get_condense_question_prompt(self):
        template = """<conv>
    {chat_history}
    </conv>

    <followup>
    {question}
    </followup>

    Considering the dialogue provided within the <conv></conv> tags, please reformulate the follow-up question located in the <followup></followup> tags into a clear, standalone question. Ensure the language style of the follow-up question is retained.
    """

        return PromptTemplate(
            input_variables=["chat_history", "question"],
            chat_history="{chat_history}",
            template=template,
        )


# Register the adapter
registry.register(r"^bedrock.anthropic.claude*", BedrockClaudeAdapter)
