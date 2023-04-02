import { grey, blueGrey } from "@mui/material/colors";
import { Box } from "@mui/material";
import Image from "next/image";
import logoImage from "/public/images/master-v-balashihe-rf-screwdriver.svg";

const MasterSvgLogo = () => (
  <Box
    sx={{
      overflow: "visible",
      height: "80px",
    }}
  >
    <Image
      src={logoImage}
      width={80}
      height={80}
      alt={"Мастер в Балашихе РФ по ремонту компьютеров"}
    />
  </Box>
);
export default MasterSvgLogo;
