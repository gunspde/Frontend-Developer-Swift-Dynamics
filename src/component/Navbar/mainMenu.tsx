import React from "react";
import { Menu } from "antd";
import { MenuMode } from "./type";
import { useNavigate } from "react-router-dom";
import clientRoute from "../../config/clientRoute";
import { useTranslation } from "react-i18next";

type Props = {
    mode: MenuMode
}

const LeftMenu = (props: Props) => {
    const { mode } = props
    const navigate = useNavigate();
    const { t } = useTranslation();
    const handlerChangeToPage = () => {
        navigate(clientRoute.home)
    }

    return (
        <Menu mode={mode}>
            <Menu.Item key="home" onClick={() => handlerChangeToPage()}>
            {t(`MENU_HOME`)}
            </Menu.Item>
        </Menu>
    );
};

export default LeftMenu;