import { useTheme, Switch } from "@mui/material";
import React from "react";

import { ColorContext } from "../../ColorContext";

export const SwitchModeButton = () => {
    const theme = useTheme();
    const colorMode = React.useContext(ColorContext);

    return (
            <Switch 
                checked={theme.palette.mode === "dark"}
                onChange={colorMode.toggleColorMode}
                />
    );
};