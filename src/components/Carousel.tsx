import * as React from "react";
import {
  animate,
  motion,
  MotionStyle,
  MotionValue,
  PanInfo,
  useMotionValue,
} from "framer-motion";
// import { Page } from "./Page";

const range = [-1, 0, 1];

interface VirtualizedPageProps {
  children: (props: { index: number }) => JSX.Element;
}

const containerStyle: MotionStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflowX: "hidden",
};

const transition = {
  type: "spring",
  bounce: 0,
};

export const VirtualizedPage: React.FunctionComponent<VirtualizedPageProps> = ({
  children,
}) => {
  const x = useMotionValue(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);

  const calculateNewX = () => -index * (containerRef.current?.clientWidth || 0);

  const handleEndDrag = (e: Event, dragProps: PanInfo) => {
    const clientWidth = containerRef.current?.clientWidth || 0;

    const { offset, velocity } = dragProps;

    if (Math.abs(velocity.y) > Math.abs(velocity.x)) {
      //      animate(x, calculateNewX(), transition);
      return;
    }

    if (offset.x > clientWidth / 4) {
      setIndex(index - 1);
    } else if (offset.x < -clientWidth / 4) {
      setIndex(index + 1);
    } else {
      //      animate(x, calculateNewX(), transition);
    }
  };

  //   React.useEffect(() => {
  //     //const controls = animate(x, calculateNewX(), transition);
  //     return controls.stop;
  //   }, [index]);

  return (
    <motion.div ref={containerRef} style={containerStyle}>
      {range.map((rangeValue) => {
        return (
          <Page
            key={rangeValue + index}
            x={x}
            onDragEnd={handleEndDrag}
            index={rangeValue + index}
            renderPage={children}
          />
        );
      })}
    </motion.div>
  );
};

interface PageProps {
  index: number;
  renderPage: (props: { index: number }) => JSX.Element;
  x: MotionValue;
  onDragEnd(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
}

const pageStyle: MotionStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
};

export const Page: React.FunctionComponent<PageProps> = ({
  index,
  renderPage,
  x,
  onDragEnd,
}) => {
  const child = React.useMemo(() => renderPage({ index }), [index, renderPage]);

  return (
    <motion.div
      style={{
        ...pageStyle,
        x,
        left: `${index * 100}%`,
        right: `${index * 100}%`,
      }}
      draggable
      drag="x"
      dragElastic={1}
      onDragEnd={onDragEnd}
    >
      {child}
    </motion.div>
  );
};
