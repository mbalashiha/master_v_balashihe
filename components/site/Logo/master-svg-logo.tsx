import { grey, blueGrey } from "@mui/material/colors";
import { Box } from "@mui/material";
import Image from "next/image";

const MasterSvgLogo = () => (
  <Box
    sx={{
      overflow: "visible",
      height: "80px",
    }}
  >
    <Image
      src={"/images/master-v-balashihe-rf-screwdriver.svg"}
      width={80}
      height={80}
      alt={"Мастер в Балашихе РФ по ремонту компьютеров"}
    />
  </Box>
);
export default MasterSvgLogo;
