import json

from langchain.schema import AIMessage, HumanMessage
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate


Llama2ChatPrompt = """<s>[INST] <<SYS>>
You are a helpful assistant tasked with providing concise responses to user questions, using no more than three sentences per answer. Ensure you do not repeat information. You may use bullet points if necessary, but avoid using emojis.
<</SYS>>

{chat_history}<s>[INST] Context: {input} [/INST]"""


Llama2ChatQAPrompt = """<s>[INST] <<SYS>>
Utilize the provided conversation history and context to answer the following question. If the answer is unknown, simply state 'I don't know'—do not attempt to conjecture. Ensure that you do not repeat information previously given. You may use bullet points if necessary, but avoid using emojis.
<</SYS>>

{chat_history}<s>[INST] Context: {context}

Question: {question} [/INST]"""


Llama2ChatCondensedQAPrompt = """<s>[INST] <<SYS>>
Based on the conversation provided, rephrase the follow-up question at the end to be a standalone question, maintaining the same linguistic style as the original input. Ensure that you do not repeat information. You may use bullet points if necessary, but avoid using emojis.
<</SYS>>

{chat_history}<s>[INST] Follow-up Question: {question} [/INST]"""



Llama2ChatPromptTemplate = PromptTemplate.from_template(Llama2ChatPrompt)
Llama2ChatQAPromptTemplate = PromptTemplate.from_template(Llama2ChatQAPrompt)
Llama2ChatCondensedQAPromptTemplate = PromptTemplate.from_template(
    Llama2ChatCondensedQAPrompt
)


class Llama2ConversationBufferMemory(ConversationBufferMemory):
    @property
    def buffer_as_str(self) -> str:
        return self.get_buffer_string()

    def get_buffer_string(self) -> str:
        """modified version of https://github.com/langchain-ai/langchain/blob/bed06a4f4ab802bedb3533021da920c05a736810/libs/langchain/langchain/schema/messages.py#L14"""
        human_message_cnt = 0
        string_messages = []
        for m in self.chat_memory.messages:
            if isinstance(m, HumanMessage):
                if human_message_cnt == 0:
                    message = f"{m.content} [/INST]"
                else:
                    message = f"<s>[INST] {m.content} [/INST]"
                human_message_cnt += 1
            elif isinstance(m, AIMessage):
                message = f"{m.content} </s>"
            else:
                raise ValueError(f"Got unsupported message type: {m}")
            string_messages.append(message)

        return "".join(string_messages)
