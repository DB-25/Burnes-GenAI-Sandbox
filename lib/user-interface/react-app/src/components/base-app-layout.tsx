import { AppLayout, AppLayoutProps } from "@cloudscape-design/components";
import { useNavigationPanelState } from "../common/hooks/use-navigation-panel-state";
import NavigationPanel from "./navigation-panel";
import { ReactElement, useState } from "react";
import {SessionRefreshContext} from "../common/session-refresh-context"

export default function BaseAppLayout(
  props: AppLayoutProps & { info?: ReactElement }
) {
  const [navigationPanelState, setNavigationPanelState] =
    useNavigationPanelState();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [needsRefresh, setNeedsRefresh] = useState(true);

  return (
    <SessionRefreshContext.Provider value={{needsRefresh,setNeedsRefresh}}>
    <AppLayout
      headerSelector="#awsui-top-navigation"
      navigation={<NavigationPanel />}
      navigationOpen={!navigationPanelState.collapsed}
      onNavigationChange={({ detail }) =>
        setNavigationPanelState({ collapsed: !detail.open })
      }
      toolsHide={props.info === undefined ? true : false}
      tools={props.info}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      {...props}
    />
    </SessionRefreshContext.Provider>
  );
}
