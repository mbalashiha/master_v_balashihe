import { useState, useEffect } from "react";

interface WindowDimensions {
  width: number;
  height: number;
  orientation: "landscape" | "portrate";
  windowWidthBiggerOrEqualThanHeigh: boolean;
}

function getWindowDimensions(): WindowDimensions {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    const windowWidthBiggerOrEqualThanHeigh = innerWidth >= innerHeight;
    return {
      width,
      height,
      orientation: windowWidthBiggerOrEqualThanHeigh ? "landscape" : "portrate",
      windowWidthBiggerOrEqualThanHeigh,
    };
  } else {
    return {
      width: 0,
      height: 0,
      orientation: "landscape",
      windowWidthBiggerOrEqualThanHeigh: true,
    };
  }
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
