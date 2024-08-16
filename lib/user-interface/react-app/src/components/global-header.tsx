import {
  ButtonDropdownProps,
  TopNavigation,
} from "@cloudscape-design/components";
import { Mode } from "@cloudscape-design/global-styles";
import { useEffect, useState } from "react";
import { StorageHelper } from "../common/helpers/storage-helper";
import { Auth } from "@aws-amplify/auth";
import useOnFollow from "../common/hooks/use-on-follow";
import { CHATBOT_NAME } from "../common/constants";


export default function GlobalHeader({theme, setTheme}) {
  const onFollow = useOnFollow();
  // possibel change here
  const [userName, setUserName] = useState<string | null>(null);


  useEffect(() => {
    (async () => {
      const result = await Auth.currentAuthenticatedUser();

      if (!result || Object.keys(result).length === 0) {
        Auth.signOut();
        return;
      }

      const userName = result?.signInUserSession?.idToken?.payload?.email;
      setUserName(userName);
    })();
  }, []);

  const onChangeThemeClick = () => {
    if (theme === Mode.Dark) {
      setTheme(StorageHelper.applyTheme(Mode.Light));
    } else {
      setTheme(StorageHelper.applyTheme(Mode.Dark));
    }
  };

  const onUserProfileClick = ({
    detail,
  }: {
    detail: ButtonDropdownProps.ItemClickDetails;
  }) => {
    if (detail.id === "signout") {
      Auth.signOut();
    }
  };

  return (
    <div
      style={{ zIndex: 1002, top: 0, left: 0, right: 0, position: "fixed" }}
      id="awsui-top-navigation"
    >
      <TopNavigation
        identity={{
          href: "/",
          title: "Welcome to the AI Sandbox" ,
          logo: { src: "/images/stateseal-color.png", alt: { CHATBOT_NAME } + " Logo" },
        }}
        utilities={[
          {
            type: "button",
            text: theme === Mode.Dark ? "Light Mode" : "Dark Mode",
            onClick: onChangeThemeClick,
          },
          {
            type: "menu-dropdown",
            description: userName ?? "",
            iconName: "user-profile",
            onItemClick: onUserProfileClick,
            items: [
              {
                id: "signout",
                text: "Sign out",
              },
              {
                id: "username",
                text: "Email: " + userName

              }
            ],
            onItemFollow: onFollow,
          },
        ]}
      />
    </div>
  );
}
