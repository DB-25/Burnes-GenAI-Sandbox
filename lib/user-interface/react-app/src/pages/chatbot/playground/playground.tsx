import BaseAppLayout from "../../../components/base-app-layout";
import Chat from "../../../components/chatbot/chat";

import {Link, useParams} from "react-router-dom";
import {Header, HelpPanel} from "@cloudscape-design/components";
import {Alert} from "@cloudscape-design/components";

export default function Playground() {
    const {sessionId} = useParams();
    const {initialPrompt} = useParams();
    // console.log(prompt + "testing #85")
    return (
        <BaseAppLayout
            info={
                <HelpPanel header={<Header variant="h3">Using the chat</Header>}>
                    <p>
                        "react"playground allows user to interact with a chosen LLM and
                        optional RAG retriever. You can create new RAG workspaces via the{" "}
                        <Link to="/rag/workspaces">Workspaces</Link> console.
                    </p>
                    <h2> Smart Model</h2>
                    <p> The Smart Model is set as the default model option. It automatically routes your input to the
                        model
                        best suited for the task. To see which model was selected, see settings for the Metadata option.
                        Of course, you are also encouraged to experiment with multiple models, and find your favorites!
                        and find the
                    </p>
                    <h3>Settings</h3>
                    <p>
                        You can configure additional settings for the LLM via the setting
                        action at the bottom-right. You can change the Temperature and Top P
                        values to be used for the answer generation. You can also enable and
                        disable streaming mode for those models that support it (the setting
                        is ignored if the model does not support streaming). Turning on
                        Metadata displays additional information about the answer, such as
                        the prompts being used to interact with the LLM and the document
                        passages that might have been retrieved from the RAG storage.
                    </p>
                    <h3>Multimodal chat</h3>
                    <p>
                        If you select a multimodal model (like Anthropic Claude 3), you can
                        upload images to use in the conversation.
                    </p>
                    <h3>Session history</h3>
                    <p>
                        All conversations are saved and can be later accessed via the{" "}
                        <Link to="/chatbot/sessions">Session</Link> in the navigation bar.
                    </p>
                </HelpPanel>
            }
            toolsWidth={300}
            //
            content={
                <div>
                    <Alert
                        statusIconAriaLabel="Info"
                        header="">
                        AI models may occasionally make errors. Please validate critical information, avoid entering
                        sensitive data, and refrain from attaching any sensitive documents.
                    </Alert>
                    <Chat sessionId={sessionId} prompt={initialPrompt}/>
                </div>
                // initialPrompt
                // prompt = {initialPrompt}
            }
        />
    ); //send prompt here : prompt = {}
}
