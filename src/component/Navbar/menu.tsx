import React, { useState } from "react";
import { Menu, Avatar, MenuProps } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";
import { MenuMode } from "./type";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../../store/languageReducer";
import { menuLang } from "../../config/menuItem";
import { useTranslation } from "react-i18next";

type Props = {
  mode: MenuMode;
  setVisible: Function;
};

const RightMenu = (props: Props) => {
  const { mode, setVisible } = props;
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector((state: any) => state.language.language);
  const [current, setCurrent] = useState("SubMenu");
  const onClickMenuSelect = (lang: string) => {
    console.log("");
  };
  const onClick: MenuProps["onClick"] = (e) => {
    const filterLocale = menuLang.filter((item) => item.name === e.key);
    setCurrent(e.key);
    dispatch(setLanguage(filterLocale[0]?.key || "en"));
    i18n.changeLanguage(filterLocale[0]?.key || "en");
  };

  type MenuItem = Required<MenuProps>["items"][number];
  const items: MenuItem[] = [
    {
      label: "",
      key: "SubMenu",
      icon: "🌐",
      children: [
        {
          type: "group",
          label: "",
          children: menuLang.map((item) => ({
            label: `${item.icon} ${t(`${item.name}`)}`,
            key: `${item.name}`,
          })),
        },
      ],
    },
  ];
  return (
    <Menu mode={mode}>
      <div style={{ display: "flex" }}>
        {language === "TH" ? t(`LOCALE_TH`) : language.toUpperCase()}{" "}
        <Menu
          mode="horizontal"
          items={items}
          selectedKeys={[current]}
          onClick={onClick}
        />
      </div>
    </Menu>
  );
};

export default RightMenu;
