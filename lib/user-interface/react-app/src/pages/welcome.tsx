import {
    ContentLayout,
    Header,
    Cards,
    Container,
    SpaceBetween,
    Link,
    BreadcrumbGroup,
} from "@cloudscape-design/components";
import BaseAppLayout from "../components/base-app-layout";
import RouterButton from "../components/wrappers/router-button";
import useOnFollow from "../common/hooks/use-on-follow";
import {CHATBOT_NAME, languageList} from "../common/constants";
import {useHref} from "react-router-dom";
import {TaskOptions} from "../common/constants";
import TaskPriming from "../components/chatbot/task";
import {v4 as uuidv4} from "uuid";
import CarouselNext from "../components/carousel";
import styles from "../../styles/globals.css";
import {StorageHelper} from "../common/helpers/storage-helper.ts";
import {Mode} from "@cloudscape-design/global-styles";
import { useState, useEffect } from "react";

export default function Welcome({theme}) {
    const onFollow = useOnFollow();

    return (
        <BaseAppLayout
            breadcrumbs={
                <BreadcrumbGroup
                    onFollow={onFollow}
                    items={[
                        {
                            text: CHATBOT_NAME,
                            href: "/",
                        },
                    ]}
                />
            }
            content={
                <ContentLayout
                    header={
                        <Header
                            variant="h1"
                            description="Experiment and chat with different models. Compare and contrast their responses for your target uses."
                            actions={
                                <RouterButton
                                    iconAlign="right"
                                    iconName="contact"
                                    variant="primary"
                                    href="/chatbot/playground"
                                >
                                    Getting Started
                                </RouterButton>
                            }
                        >
                            Sandbox Home
                        </Header>
                    }
                >
                    <SpaceBetween size="l">
                        <Cards
                            cardDefinition={{
                                header: (item) => (
                                    <Link
                                        external={item.external}
                                        href={item.href}
                                        fontSize="heading-m"
                                    >
                                        {item.name}
                                    </Link>
                                ),
                                sections: [
                                    {
                                        content: (item) => (
                                            <div style={{minHeight: '200px'}}>
                                                <img
                                                    src={item.img}
                                                    alt="Placeholder"
                                                    style={{
                                                        width: "100%",
                                                        height: '180px',
                                                        objectFit: 'cover',
                                                        borderRadius: '20px'
                                                    }}
                                                />
                                            </div>
                                        ),
                                    },
                                    {
                                        content: (item) => (
                                            <div>
                                                <div>{item.description}</div>
                                            </div>
                                        ),
                                    },
                                    {
                                        id: "type",
                                        header: " ",
                                        content: (item) => item.type,
                                    },
                                ],
                            }}
                            cardsPerRow={[{cards: 1}, {minWidth: 700, cards: 3}]}
                            items={[
                                {
                                    name: "Chatbot",
                                    external: false,
                                    type: " ",
                                    href: "/chatbot/playground",
                                    img: "/images/welcome/chatbotWhite.jpg",
                                    description:
                                        "Experiment using different models to automate your everyday tasks",
                                },
                                {
                                    name: "Multi-Chat Playground",
                                    external: false,
                                    type: " ",
                                    href: "/chatbot/multichat",
                                    img: "/images/welcome/multichat.png",
                                    description:
                                        "Compare how models respond to the same prompt",
                                },
                                {
                                    name: "Models",
                                    type: " ",
                                    href: "/chatbot/models",
                                    img: "/images/welcome/modelBg.png",
                                    description:
                                        "Explore models with AWS Bedrock, Claude, and Llama",
                                },
                            ]}
                        />

                        <Header
                            variant="h1"
                            description="Automate daily tasks with AI driven solutions. Optimize how you summarize, draft, and extract information."
                        >
                            Tasks
                        </Header>

                        <div className="task-container">
                            <CarouselNext theme={theme}></CarouselNext>
                        </div>

                        <Container
                            header={
                                <Header
                                    variant="h2"
                                    description="Explore our comprehensive library of learning materials designed to enhance your skills in generative AI, prompt engineering, and other cutting-edge AI technologies. Dive into tutorials, guides, and interactive courses tailored for all levels, from beginners to advanced practitioners."
                                >
                                    Learn More
                                </Header>
                            }>
                            <Cards
                                cardDefinition={{
                                    header: (item) => (
                                        <Link
                                            href={item.href}
                                            external={item.external}
                                            fontSize="heading-m"
                                        >
                                            {item.name}
                                        </Link>
                                    ),
                                    sections: [
                                        {
                                            content: (item) => (
                                                <div style={{minHeight: '200px'}}>
                                                    <img
                                                        src={item.img}
                                                        alt="Placeholder"
                                                        style={{
                                                            width: "100%",
                                                            height: '180px',
                                                            objectFit: 'cover',
                                                            borderRadius: '20px'
                                                        }}
                                                    />
                                                </div>
                                            ),
                                        },
                                        {
                                            content: (item) => (
                                                <div>
                                                    <div>{item.description}</div>
                                                </div>
                                            ),
                                        },
                                        {
                                            id: "type",
                                            header: " ",
                                            content: (item) => item.type,
                                        },
                                    ],
                                }}
                                cardsPerRow={[{cards: 1}, {minWidth: 700, cards: 3}]}
                                items={[
                                    {
                                        name: "Learn What Generative AI Can Do",
                                        type: " ",
                                        external: true,
                                        href: "https://youtu.be/jNNatjruXx8?si=dRhLLnnBxiNByon4",
                                        img: "/images/welcome/bottom1.png",
                                        description:
                                            "Discover the capabilities of generative AI and learn how to craft effective prompts to enhance productivity.",
                                        tags: [""],
                                    },
                                    {
                                        name: "Advanced Data Analytics",
                                        type: " ",
                                        external: true,
                                        href: "https://aws.amazon.com/blogs/big-data/amazon-opensearch-services-vector-database-capabilities-explained/",
                                        img: "/images/welcome/bottom2.png",
                                        description:
                                            "Transform data into actionable insights, driving strategic decisions for your organization.",
                                    },
                                    {
                                        name: "Prompt Engineering Guide",
                                        external: true,
                                        type: " ",
                                        href: "https://www.promptingguide.ai/",
                                        img: "/images/welcome/bottom3.png",
                                        description:
                                            "Prompt engineering is the skill of crafting clear and specific questions to get the best answers from an AI system.",
                                    },
                                ]}
                            />
                        </Container>
                    </SpaceBetween>
                </ContentLayout>
            }
        />
    );
}
