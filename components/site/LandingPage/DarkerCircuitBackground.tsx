import { Box } from "@mui/material";

export function DarkerCircuitBackground() {
  return (
    <>
      <Box
        sx={{
          backgroundPosition: "center center",
          backgroundAttachment: "scroll",
          backgroundImage: `url(/images/circuit.webp)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100%",
          width: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          border: "1px solid #010101",
        }}
      ></Box>
      <Box
        sx={{
          backgroundImage: `linear-gradient(to bottom, rgba(1,1,1,1) 0px, rgba(9, 5, 1, 0.85) 20px, rgba(1,1,1,1) 100%)`,
          height: "100%",
          width: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          border: "1px solid #010101",
        }}
      ></Box>
    </>
  );
}
