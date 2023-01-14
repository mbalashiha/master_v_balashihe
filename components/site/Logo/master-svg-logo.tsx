import { grey, blueGrey } from "@mui/material/colors";
import { Box } from "@mui/material";
import Image from "next/image";
import logoImage from "/public/images/master-v-balashihe-rf-screwdriver.svg";

const MasterSvgLogo = () => (
  <Box
    sx={{
      pr: "0px",
      pt: "6px",
      overflow: "visible",
    }}
  >
    <Image
      src={logoImage}
      width={82}
      height={82}
      alt={"Мастер в Балашихе РФ по ремонту компьютеров"}
    />
  </Box>
);
export default MasterSvgLogo;
