import {
    SideNavigation,
    SideNavigationProps,
    Spinner,
    Header,
} from "@cloudscape-design/components";
import useOnFollow from "../common/hooks/use-on-follow";
import {useNavigationPanelState} from "../common/hooks/use-navigation-panel-state";
import {AppContext} from "../common/app-context";
import {useContext, useState, useEffect, useMemo} from "react";
import {CHATBOT_NAME} from "../common/constants";
import {ApiClient} from "../common/api-client/api-client";
import RouterButton from "../components/wrappers/router-button";
import {SessionRefreshContext} from "../common/session-refresh-context";
import {Auth} from "aws-amplify";
import {v4 as uuidv4} from "uuid";
import TaskPriming from "./chatbot/task";

export default function NavigationPanel() {
    const appContext = useContext(AppContext);
    const onFollow = useOnFollow();
    const apiClient = new ApiClient(appContext);
    const [navigationPanelState, setNavigationPanelState] = useNavigationPanelState();
    const {needsRefresh, setNeedsRefresh} = useContext(SessionRefreshContext);
    const [sessions, setSessions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadSessions() {
            let username;
            await Auth.currentAuthenticatedUser().then((value) => username = value.username);
            if (username && needsRefresh) {
                const fetchedSessions = await apiClient.sessions.getSessions();
                if (fetchedSessions.data && fetchedSessions.data.listSessions) {
                    const sortedSessions = fetchedSessions.data.listSessions.sort((a, b) =>
                        new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
                    );
                    const listedSessions = sortedSessions.slice(0, 5);
                    setSessions(listedSessions);
                } else {
                    setSessions([]);
                }
                setNeedsRefresh(false);
                setLoading(false);
            }
        }

        loadSessions();
    }, [needsRefresh]);

    function truncateText(text, charLimit) {
        let cleanText = text.replace(/[^a-zA-Z0-9\s]/g, '');
        cleanText = cleanText.charAt(0).toUpperCase() + cleanText.slice(1);
        if (cleanText.length > charLimit) {
            return cleanText.substring(0, charLimit) + ' [...]';
        }
        return cleanText;
    }

    const items = useMemo(() => {
        const baseItems: SideNavigationProps.Item[] = [
            {
                type: "link", text: "", href: "/", info: <RouterButton
                    iconName="add-plus"
                    variant="primary"
                    href={`/chatbot/playground/${uuidv4()}`}
                >
                    New session
                </RouterButton>
            },
            {
                type: "section",
                text: "Experiment With AI",
                items: [
                    {type: "link", text: "Playground", href: "/chatbot/playground"},
                    {type: "link", text: "Compare Different Models", href: "/chatbot/multichat"},
                    {type: "link", text: "Complete Chat History", href: "/chatbot/sessions"},
                    {type: "link", text: "Document Upload", href: "/rag/workspaces/"},
                    {type: "link", text: "Available Models", href: "/chatbot/models"},
                ],
            },
            {
                type: "section",
                text: "Recent Chat History",
                items: loading ? [{ type: "link", text: "Loading...", href: "#" }] : (
                    sessions.length > 0 ? sessions.map((session) => ({
                        type: "link",
                        text: `${truncateText(session.title || 'Untitled Session', 35)} - ${new Intl.DateTimeFormat('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                        }).format(new Date(session.startTime))}`,
                        href: `/chatbot/playground/${session.id}`,
                        tooltip: `Time Created: ${new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true
                        }).format(new Date(session.startTime))}`
                    })) : [{ type: "link", text: "No sessions available", href: "#" }]
                ),
            },
            {
                type: "section",
                text: "Explore Task Based AI Solutions",
                items: [
                    {
                        type: "link",
                        text: "Summarize Text",
                        href: `/chatbot/task-playground/${uuidv4()}/summarize`
                    },
                    {
                        type: "link",
                        text: "Translate",
                        href: `/chatbot/task-playground/${uuidv4()}/translate`
                    },
                    {
                        type: "link",
                        text: "Create A Meeting Agenda",
                        href: `/chatbot/task-playground/${uuidv4()}/meetingAgenda`
                    },
                    {
                        type: "link",
                        text: "Email Composition Assistant",
                        href: `/chatbot/task-playground/${uuidv4()}/email`
                    },
                    {
                        type: "link",
                        text: "Draft A Memo",
                        href: `/chatbot/task-playground/${uuidv4()}/memo`
                    },
                    {
                        type: "link",
                        text: "Daily Planning",
                        href: `/chatbot/task-playground/${uuidv4()}/dailyPlanning`
                    },
                    {
                        type: "link",
                        text: "Need Some Positive Affirmation?",
                        href: `/chatbot/task-playground/${uuidv4()}/positiveAffirmation`
                    },
                ],
            },
        ];

        if (appContext?.config.rag_enabled) {
            // Add additional items if RAG is enabled
        }
        return baseItems;
    }, [sessions, loading, appContext?.config.rag_enabled]);

    const onChange = ({
                          detail,
                      }: {
        detail: SideNavigationProps.ChangeDetail;
    }) => {
        const sectionIndex = items.indexOf(detail.item);
        setNavigationPanelState({
            collapsedSections: {
                ...navigationPanelState.collapsedSections,
                [sectionIndex]: !detail.expanded,
            },
        });
    };

    return (
        <div>
            <SideNavigation
                onFollow={onFollow}
                onChange={onChange}
                header={{href: "/", text: CHATBOT_NAME}}
                items={items}
            />
        </div>
    );
}


// import {
//     SideNavigation,
//     SideNavigationProps,
//     Header,
// } from "@cloudscape-design/components";
// import useOnFollow from "../common/hooks/use-on-follow";
// import {useNavigationPanelState} from "../common/hooks/use-navigation-panel-state";
// import {AppContext} from "../common/app-context";
// import {useContext, useState, useEffect} from "react";
// import {CHATBOT_NAME} from "../common/constants";
// import {ApiClient} from "../common/api-client/api-client";
// import RouterButton from "../components/wrappers/router-button";
// import {SessionRefreshContext} from "../common/session-refresh-context"
// import {Auth} from "aws-amplify";
// import {v4 as uuidv4} from "uuid";
// import TaskPriming from "./chatbot/task";
//
// export default function NavigationPanel() {
//     const appContext = useContext(AppContext);
//     const onFollow = useOnFollow();
//     const apiClient = new ApiClient(appContext);
//     const [navigationPanelState, setNavigationPanelState] = useNavigationPanelState();
//     const {needsRefresh, setNeedsRefresh} = useContext(SessionRefreshContext);
//     const [sessions, setSessions] = useState<any[]>([]);
//     const [items, setItems] = useState<SideNavigationProps.Item[]>([]);
//
//     useEffect(() => {
//         async function loadSessions() {
//             let username;
//             await Auth.currentAuthenticatedUser().then((value) => username = value.username);
//             if (username && needsRefresh) {
//                 const fetchedSessions = await apiClient.sessions.getSessions();
//                 if (fetchedSessions.data && fetchedSessions.data.listSessions) {
//                     const sortedSessions = fetchedSessions.data.listSessions.sort((a, b) =>
//                         new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
//                     );
//                     const listedSessions = sortedSessions.slice(0, 5);
//                     setSessions(listedSessions);
//                     updateItems(listedSessions);
//                     setNeedsRefresh(false);
//
//                 }
//             }
//
//         }
//
//         loadSessions();
//     }, [needsRefresh]);
//
//
//     function truncateText(text, charLimit) {
//     let cleanText = text.replace(/[^a-zA-Z0-9\s]/g, '');
//     cleanText = cleanText.charAt(0).toUpperCase() + cleanText.slice(1);
//     if (cleanText.length > charLimit) {
//         return cleanText.substring(0, charLimit) + ' [...]';
//     }
//     return cleanText;
// }
//
//     const updateItems = (sessions: any[]) => {
//         // const sessionItems = sessions.map(session => ({
//         //   type: "link",
//         //   text: '${session.title}' ,
//         //   href: '/chatbot/playground/${session.id}',
//         // }) as SideNavigationProps.Item);
//
//         const baseItems: SideNavigationProps.Item[] = [
//             // { type: "link", text: "Home", href: "/" },
//             {
//                 type: "link", text: "", href: "/", info: <RouterButton
//                     iconName="add-plus"
//                     variant="primary"
//                     href={`/chatbot/playground/${uuidv4()}`}
//                 >
//                     New session
//                 </RouterButton>
//             },
//             {
//                 type: "section",
//                 text: "Experiment With AI",
//                 items: [
//                     {type: "link", text: "Playground", href: "/chatbot/playground"},
//                     {type: "link", text: "Compare Different Models", href: "/chatbot/multichat"},
//                     {type: "link", text: "Complete Chat History", href: "/chatbot/sessions"},
//                     {type: "link", text: "Document Upload", href: "/rag/workspaces/"},
//                     {type: "link", text: "Available Models", href: "/chatbot/models"},
//
//                 ],
//             },
//             {
//                 type: "section",
//                 text: "Recent Chat History",
//                 items: sessions.map((session, index) => ({
//                     type: "link",
//                     text: `${truncateText(session.title || 'Untitled Session', 35)} - ${new Intl.DateTimeFormat('en-US', {
//                         month: 'short',
//                         day: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit',
//                         hour12: true
//                     }).format(new Date(session.startTime))}`,
//                     href: `/chatbot/playground/${session.id}`,
//                     tooltip: `Time Created: ${new Intl.DateTimeFormat('en-US', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: '2-digit',
//                         hour: '2-digit',
//                         minute: '2-digit',
//                         second: '2-digit',
//                         hour12: true
//                     }).format(new Date(session.startTime))}`
//                 })),
//             },
//             { // need to learn how to refresh with side-bar navigation
//                 type: "section",
//                 text: "Explore Task Based AI Solutions",
//                 items: [
//                     {
//                         type: "link",
//                         text: "Draft A Memo",
//                         // href: `/chatbot/task-playground?prompt=${encodeURIComponent(TaskPriming("memo").prompt)}`
//                         // next thing to try
//                         // href:  `/chatbot/task-playground/${uuidv4()}${"memo"}`
//                         href: `/chatbot/task-playground/${uuidv4()}/${"memo"}`
//                     },
//                     {
//                         type: "link",
//                         text: "Summarize Text",
//                         href: `/chatbot/task-playground/${uuidv4()}/${"summarize"}`
//                     },
//                     {
//                         type: "link",
//                         text: "Translate",
//                         href: `/chatbot/task-playground/${uuidv4()}/${"translate"}`
//                     },
//                 ],
//             },
//         ];
//
//         if (appContext?.config.rag_enabled) {
//
//         }
//         setItems(baseItems);
//     };
//
//     const onChange = ({
//                           detail,
//                       }: {
//         detail: SideNavigationProps.ChangeDetail;
//     }) => {
//         // const sectionIndex = items.findIndex(item => item.text === detail.item.text);
//         const sectionIndex = items.indexOf(detail.item);
//         setNavigationPanelState({
//             collapsedSections: {
//                 ...navigationPanelState.collapsedSections,
//                 [sectionIndex]: !detail.expanded,
//             },
//         });
//     };
//
//     return (
//         <div>
//             {/* <Header>
//         <RouterButton
//           iconName="add-plus"
//           variant="primary"
//           href={`/chatbot/playground/${uuidv4()}`}
//         >
//           New session
//         </RouterButton>
//       </Header> */}
//             <SideNavigation
//                 onFollow={onFollow}
//                 onChange={onChange}
//                 header={{href: "/", text: CHATBOT_NAME}}
//                 items={items}
//             />
//         </div>
//     );
// }