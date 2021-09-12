import { useEffect, useState } from "react";

export default function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [down, setDown] = useState(false);

  useEffect(() => {
    const mouseDownHandler = () => {
      setDown(true)
    }
    const mouseUpHandler = () => {
      setDown(false)
    }
    const mouseMoveHandler = (event) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    };
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mousedown", () => setDown(true));
    document.addEventListener("mouseup", () => setDown(false));

    return () => {
      document.removeEventListener("mousedown", mouseDownHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return {down, ...mousePosition};
}