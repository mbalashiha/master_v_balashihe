import * as React from "react";
import { FC, useMemo, useRef } from "react";
import Image from "next/image";
import { Grid, Box, Stack, Typography, Divider } from "@mui/material";
import { AddBoxOutlined } from "@mui/icons-material";
import SidebarPhone from "./SidebarPhoneNumber";
import { WizardCircularProgress } from "./WizardCircularProgress";
import { StepWizardChildProps } from "./Providers/MyStepWizard";

const WizardSidebar: React.FC<any> = (props: StepWizardChildProps) => {
  return (
    <Stack
      direction="column"
      sx={{
        p: "10px",
        "& img": {
          borderRadius: "100%",
        },
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <Typography
        sx={{
          "&&&&": {
            fontSize: "17px",
            lineHeight: "24px",
            fontWeight: 800,
            background: "#FFE684",
            borderRadius: "5px",
            padding: "10px",
            marginTop: { xs: 0, md: "35px" },
            textAlign: "center",
          },
        }}
      >
        Ваша скидка 25%
      </Typography>
      <Stack direction={"row"} spacing={1}>
        <Image
          src={"/images/tiny_computer_master_balashikha.webp"}
          alt=""
          width={60}
          height={60}
          quality={100}
        ></Image>
        <Box>
          <Typography component="div">Дмитрий</Typography>
          <Typography
            component="div"
            sx={{ fontSize: "14px", lineHeight: "16px" }}
          >
            IT специалист
          </Typography>
          <SidebarPhone />
        </Box>
      </Stack>
      <Divider light sx={{ transform: "scaleY(2)", my: "10px" }} />
      <WizardCircularProgress {...props} />
    </Stack>
  );
};

export default WizardSidebar;
