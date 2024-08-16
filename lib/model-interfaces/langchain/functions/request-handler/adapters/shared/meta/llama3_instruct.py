import json

from langchain.schema import AIMessage, HumanMessage, SystemMessage
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate

BEGIN_OF_TEXT = "<|begin_of_text|>"
SYSTEM_HEADER = "<|start_header_id|>system<|end_header_id|>"
USER_HEADER = "<|start_header_id|>user<|end_header_id|>"
ASSISTANT_HEADER = "<|start_header_id|>assistant<|end_header_id|>"
EOD = "<|eot_id|>"

Llama3Prompt = f"""{BEGIN_OF_TEXT}{SYSTEM_HEADER}
You are a helpful assistant that provides concise answers to user questions using as few sentences as possible, up to a maximum of 3 sentences. You do not repeat yourself. You may use bullet points if necessary, but avoid emojis.{EOD}{{chat_history}}{USER_HEADER}
{{input}}{EOD}{ASSISTANT_HEADER}"""


Llama3QAPrompt = f"""{BEGIN_OF_TEXT}{SYSTEM_HEADER}
Use the following conversation history and pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, do not attempt to conjecture. You do not repeat yourself. You may use bullet points if necessary, but avoid emojis.{EOD}{{chat_history}}{USER_HEADER}
Context: {{context}}
{{question}}{EOD}{ASSISTANT_HEADER}"""


Llama3CondensedQAPrompt = f"""{BEGIN_OF_TEXT}{SYSTEM_HEADER}
Given the following conversation and the question at the end, rephrase the follow-up input to be a standalone question, in the same language as the follow-up input. You do not repeat yourself. You may use bullet points if necessary, but avoid emojis.{EOD}{{chat_history}}{USER_HEADER}
{{question}}{EOD}{ASSISTANT_HEADER}"""


Llama3PromptTemplate = PromptTemplate.from_template(Llama3Prompt)
Llama3QAPromptTemplate = PromptTemplate.from_template(Llama3QAPrompt)
Llama3CondensedQAPromptTemplate = PromptTemplate.from_template(Llama3CondensedQAPrompt)


class Llama3ConversationBufferMemory(ConversationBufferMemory):
    @property
    def buffer_as_str(self) -> str:
        return self.get_buffer_string()

    def get_buffer_string(self) -> str:
        # See https://llama.meta.com/docs/model-cards-and-prompt-formats/meta-llama-3/
        string_messages = []
        for m in self.chat_memory.messages:
            if isinstance(m, HumanMessage):
                message = f"""{USER_HEADER}

{m.content}{EOD}"""

            elif isinstance(m, AIMessage):
                message = f"""{ASSISTANT_HEADER}

{m.content}{EOD}"""
            else:
                raise ValueError(f"Got unsupported message type: {m}")
            string_messages.append(message)

        return "".join(string_messages)
