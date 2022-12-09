import { grey, blueGrey } from "@mui/material/colors";
import { Box } from "@mui/material";

const MasterSvgLogo = () => (
  <Box
    sx={{
      pr: "1.4rem",
      "&, & svg": {
        height: "6rem",
      },
      "& svg": {
        transform: "rotate(145deg)",
      },
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g transform="translate(50 50)">
        <g transform="translate(-19 -19) scale(0.6)">
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0;45"
              keyTimes="0;1"
              dur="0.2s"
              begin="0s"
              repeatCount="indefinite"
            ></animateTransform>
            <path
              d="M31.359972760794346 21.46047782418268 L38.431040572659825 28.531545636048154 L28.531545636048154 38.431040572659825 L21.46047782418268 31.359972760794346 A38 38 0 0 1 7.0000000000000036 37.3496987939662 L7.0000000000000036 37.3496987939662 L7.000000000000004 47.3496987939662 L-6.999999999999999 47.3496987939662 L-7 37.3496987939662 A38 38 0 0 1 -21.46047782418268 31.35997276079435 L-21.46047782418268 31.35997276079435 L-28.531545636048154 38.431040572659825 L-38.43104057265982 28.531545636048158 L-31.359972760794346 21.460477824182682 A38 38 0 0 1 -37.3496987939662 7.000000000000007 L-37.3496987939662 7.000000000000007 L-47.3496987939662 7.000000000000008 L-47.3496987939662 -6.9999999999999964 L-37.3496987939662 -6.999999999999997 A38 38 0 0 1 -31.35997276079435 -21.460477824182675 L-31.35997276079435 -21.460477824182675 L-38.431040572659825 -28.531545636048147 L-28.53154563604818 -38.4310405726598 L-21.4604778241827 -31.35997276079433 A38 38 0 0 1 -6.999999999999992 -37.3496987939662 L-6.999999999999992 -37.3496987939662 L-6.999999999999994 -47.3496987939662 L6.999999999999977 -47.3496987939662 L6.999999999999979 -37.3496987939662 A38 38 0 0 1 21.460477824182686 -31.359972760794342 L21.460477824182686 -31.359972760794342 L28.531545636048158 -38.43104057265982 L38.4310405726598 -28.53154563604818 L31.35997276079433 -21.4604778241827 A38 38 0 0 1 37.3496987939662 -6.999999999999995 L37.3496987939662 -6.999999999999995 L47.3496987939662 -6.999999999999997 L47.349698793966205 6.999999999999973 L37.349698793966205 6.999999999999976 A38 38 0 0 1 31.359972760794346 21.460477824182686 M0 -23A23 23 0 1 0 0 23 A23 23 0 1 0 0 -23"
              fill={blueGrey[200]}
            ></path>
          </g>
        </g>
        <g transform="translate(19 19) scale(0.6)">
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="45;0"
              keyTimes="0;1"
              dur="0.2s"
              begin="-0.1s"
              repeatCount="indefinite"
            ></animateTransform>
            <path
              d="M-31.35997276079435 -21.460477824182675 L-38.431040572659825 -28.531545636048147 L-28.53154563604818 -38.4310405726598 L-21.4604778241827 -31.35997276079433 A38 38 0 0 1 -6.999999999999992 -37.3496987939662 L-6.999999999999992 -37.3496987939662 L-6.999999999999994 -47.3496987939662 L6.999999999999977 -47.3496987939662 L6.999999999999979 -37.3496987939662 A38 38 0 0 1 21.460477824182686 -31.359972760794342 L21.460477824182686 -31.359972760794342 L28.531545636048158 -38.43104057265982 L38.4310405726598 -28.53154563604818 L31.35997276079433 -21.4604778241827 A38 38 0 0 1 37.3496987939662 -6.999999999999995 L37.3496987939662 -6.999999999999995 L47.3496987939662 -6.999999999999997 L47.349698793966205 6.999999999999973 L37.349698793966205 6.999999999999976 A38 38 0 0 1 31.359972760794346 21.460477824182686 L31.359972760794346 21.460477824182686 L38.431040572659825 28.531545636048158 L28.53154563604818 38.4310405726598 L21.460477824182703 31.35997276079433 A38 38 0 0 1 6.9999999999999964 37.3496987939662 L6.9999999999999964 37.3496987939662 L6.999999999999995 47.3496987939662 L-7.000000000000009 47.3496987939662 L-7.000000000000007 37.3496987939662 A38 38 0 0 1 -21.46047782418263 31.359972760794385 L-21.46047782418263 31.359972760794385 L-28.531545636048097 38.43104057265987 L-38.431040572659796 28.531545636048186 L-31.35997276079433 21.460477824182703 A38 38 0 0 1 -37.34969879396619 7.000000000000032 L-37.34969879396619 7.000000000000032 L-47.34969879396619 7.0000000000000355 L-47.3496987939662 -7.000000000000002 L-37.3496987939662 -7.000000000000005 A38 38 0 0 1 -31.359972760794346 -21.46047782418268 M0 -23A23 23 0 1 0 0 23 A23 23 0 1 0 0 -23"
              fill={grey[400]}
            ></path>
          </g>
        </g>
      </g>
    </svg>
  </Box>
  /*<svg
    enableBackground="new 0 0 1000 1000"
    version="1.1"
    viewBox="0 0 1e3 1e3"
    xmlns="http://www.w3.org/2000/svg"
    fill={blueGrey[300]}
    style={{
      height: "5.7rem",
      width: "5.7rem",
      marginRight: "0rem",
      padding: "0.4rem",
    }}
  >
    <metadata> Svg Vector Icon </metadata>
    <g transform="translate(0 512) scale(.1 -.1)">
      <path d="m3162.5 4685c0-380.9 26.8-331.1-201-373.2-268-49.8-446-124.4-712-302.4l-160.8-107.2-476.6 476.6-434.5-436.4-436.4-434.5 235.4-235.4c128.2-128.2 233.5-239.3 233.5-246.9 0-5.7-36.4-70.8-78.5-141.6-135.9-222-252.7-507.2-323.5-782.9l-34.4-134-336.9-5.7-336.9-3.8v-1225.1h668l21.1-80.4c74.6-296.7 208.6-625.9 342.6-847.9 44-70.8 78.5-134 78.5-139.7 0-7.7-105.3-118.7-233.5-246.9l-235.4-235.5 436.4-434.5 434.5-436.4 237.3 237.4 237.3 237.3 168.4-97.6c245-139.7 545.5-260.3 798.2-319.6 80.4-19.1 109.1-19.1 109.1-3.8 1.9 147.4 147.4 955.1 199.1 1098.7l28.7 78.5-137.8 42.1c-664.2 201-1167.6 767.5-1286.3 1449-55.5 315.8-24.9 639.3 86.1 949.4 174.2 480.4 604.8 911.1 1085.3 1085.3 683.3 246.9 1412.6 86.1 1921.7-421.1 266.1-264.1 394.3-490 505.3-892 3.8-15.3 55.5-7.7 160.8 23 135.9 40.2 687.1 137.8 951.3 170.4l99.5 13.4-26.8 107.2c-68.9 292.9-218.2 643.1-392.4 916.8-24.9 42.1-15.3 53.6 212.5 283.3l239.3 239.3-436.4 434.5-434.5 436.4-235.4-235.4c-128.2-128.2-239.3-233.5-246.9-233.5-5.7 0-80.4 45.9-162.7 103.4-246.9 168.4-449.8 254.6-700.5 298.6-231.6 38.3-204.8-7.7-204.8 373.2v335h-1225v-335.4z" />
      <path d="m3583.6 1926.9c-434.5-156.9-560.8-692.9-239.3-1012.5 289-290.9 765.6-220.1 964.7 143.6 65.1 116.8 68.9 135.9 67 287.1 0 191.4-45.9 308.2-170.4 430.7-156.9 156.8-424.9 221.9-622 151.1z" />
      <path d="m6225 992.8c0-258.4-5.7-356-23-371.3-13.4-9.6-141.6-59.3-283.3-109.1s-271.8-97.6-287.1-107.2c-21-11.5-90 45.9-277.5 231.6l-248.8 248.8-870.9-870.9 246.9-246.9 246.9-245-91.9-193.3c-51.7-105.3-109.1-245-128.2-312l-34.4-122.5h-698.7v-1225h698.7l34.4-122.5c19.1-67 76.6-206.7 128.2-312l91.9-193.3-246.9-245-246.9-246.9 870.9-870.9 248.8 248.8c187.6 185.7 256.5 243.1 277.5 231.6 15.3-9.6 145.5-57.4 287.1-107.2s269.9-99.5 283.3-109.1c17.2-15.3 23-112.9 23-371.3v-352.2h1225v352.2c0 258.4 5.7 356 24.9 371.3 11.5 9.6 139.7 59.3 281.4 109.1s271.8 97.6 289 105.3c23 13.4 88.1-42.1 277.5-231.6l246.9-246.9 424.9 424.9c235.4 235.4 426.8 434.5 426.8 446s-107.2 126.3-237.4 256.5l-237.3 235.4 84.2 176.1c45.9 95.7 103.4 237.3 126.3 313.9l44 137.8h698.8v1225h-702.5l-32.5 120.6c-17.2 65.1-74.6 206.7-124.4 312l-93.8 195.2 237.3 235.4c130.2 130.2 237.4 245 237.4 256.5s-191.4 210.5-426.8 446l-424.9 424.9-246.9-246.9c-189.5-189.5-254.6-245-277.5-231.6-17.2 7.7-147.4 55.5-289 105.3s-269.9 99.5-281.4 109.1c-19.1 15.3-24.9 112.9-24.9 371.3v352.2h-1225.1v-352.2zm870.9-1514c650.8-135.9 1075.7-796.2 937.9-1454.7-114.8-551.3-629.7-966.6-1196.3-966.6-668 0-1225 557-1225 1225 0 453.6 269.9 890 669.9 1089.1 266.1 130.2 534.1 166.5 813.5 107.2z" />
    </g>
  </svg>*/
);
export default MasterSvgLogo;
