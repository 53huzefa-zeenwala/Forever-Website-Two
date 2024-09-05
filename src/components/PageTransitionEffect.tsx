"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useEffect, useRef, useState } from "react";

function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {});
  const frozen = useRef(context).current;

  if (!frozen) {
    return <>{props.children}</>;
  }

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

export const ROUTES = ["/", "/products", "/about", "/contact"];

const PageTransitionEffect = ({ children }: { children: React.ReactNode }) => {
  const key = usePathname(); // Get the current route
  const [prevRoute, setPrevRoute] = useState<string>("/");
  const [direction, setDirection] = useState<"left" | "right">("right");

  // Update the previous route and determine transition direction
  useEffect(() => {
    const currentIndex = ROUTES.indexOf(key);
    const prevIndex = ROUTES.indexOf(prevRoute);

    if (currentIndex > prevIndex) {
      setDirection("left"); // Moving backward in the ROUTES array
    } else if (currentIndex < prevIndex) {
      setDirection("right"); // Moving forward in the ROUTES array
    }

    // Update the previous route to the current one
    setPrevRoute(key);
  }, [key, prevRoute]);

  // Animation variants for left and right transitions
  const variants = {
    left: {
      hidden: { opacity: 0, x: -1000, filter: "blur(10px)" },
      enter: { opacity: 1, x: 0, filter: "blur(0px)" },
      exit: { opacity: 0, x: 1000, filter: "blur(10px)" },
    },
    right: {
      hidden: { opacity: 0, x: 1000, filter: "blur(10px)" },
      enter: { opacity: 1, x: 0, filter: "blur(0px)" },
      exit: { opacity: 0, x: -1000, filter: "blur(10px)" },
    },
  };

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={key}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants[direction]}
        transition={{ ease: "easeInOut", duration: 0.75 }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransitionEffect;
