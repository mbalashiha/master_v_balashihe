import { grey, blueGrey } from "@mui/material/colors";
import { Box } from "@mui/material";
import Image from "next/image";

const MasterSvgLogo = () => (
  <Image
    itemProp="logo"
    src={"/images/master-v-balashihe-rf-screwdriver.svg"}
    width={80}
    height={80}
    alt={"Мастер в Балашихе для ремонта компьютеров"}
    title={"Мастер в Балашихе для ремонта"}
    loading="eager"
  />
);
export default MasterSvgLogo;
