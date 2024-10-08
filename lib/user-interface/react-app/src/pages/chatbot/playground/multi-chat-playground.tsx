import BaseAppLayout from "../../../components/base-app-layout";
import MultiChat from "../../../components/chatbot/multi-chat";
import { BreadcrumbGroup, Header, HelpPanel } from "@cloudscape-design/components";
import { Link } from "react-router-dom";
import {Alert} from "@cloudscape-design/components";
import { CHATBOT_NAME } from "../../../common/constants";


export default function MultiChatPlayground() {
  return (
    <BaseAppLayout
    breadcrumbs={
      <BreadcrumbGroup
        items={[
          {
            text: CHATBOT_NAME,
            href: "/",
          },
          {
            text: "Multichat Playground",
            href: "/chatbot/multichat",
          },
        ]}
      />
    }
      info={
        <HelpPanel header={<Header variant="h3">Using the chat</Header>}>
          <p>
            The multi-chat playground allows user to interact with up to 4 LLM
            and RAG <Link to="/rag/workspaces">workspaces</Link> combinations.
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
          <h3>Session history</h3>
          <p className="m50">
          All individual conversations are saved and can be later accessed via
            the <Link to="/chatbot/sessions">Session</Link> in the navigation
            bar. For example, if you have 3 chats, there will be 3 sessions
            saved in the history.
          </p>
        </HelpPanel>
      }
      content={<div>
                    <Alert
                        statusIconAriaLabel="Info"
                        header="">
                        AI models may occasionally make errors. Please validate critical information, avoid entering
                        sensitive data, and refrain from attaching any sensitive documents.
                    </Alert><MultiChat/></div>}
        />
        );
        }
