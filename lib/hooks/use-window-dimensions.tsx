import { useState, useEffect } from "react";

interface WindowDimensions {
  width: number;
  height: number;
  orientation: "landscape" | "portrate";
  windowWidthBiggerOrEqualThanHeigh: boolean;
}

function getWindowDimensions(): WindowDimensions {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
    orientation: innerWidth >= innerHeight ? "landscape" : "portrate",
    windowWidthBiggerOrEqualThanHeigh: innerWidth >= innerHeight,
  };
}

export default function useWindowDimensions(): WindowDimensions {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
