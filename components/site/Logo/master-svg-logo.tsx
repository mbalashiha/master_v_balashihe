import { grey, blueGrey } from "@mui/material/colors";
import { Box } from "@mui/material";
import Image from "next/image";

const MasterSvgLogo = () => (
  <Image
    src={"/images/master-v-balashihe-rf-screwdriver.svg"}
    width={80}
    height={80}
    alt={"Мастер в Балашихе РФ по ремонту компьютеров"}
  />
);
export default MasterSvgLogo;
