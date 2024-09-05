"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/header.module.css";
import { usePathname } from "next/navigation";
import { useCycle, motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const [navBackground, setNavBackground] = useState(false);
  const curRoute = usePathname();

  const [open, cycleOpen] = useCycle(false, true);

  // Detect scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        // Change this value to when you want the color to change
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <nav
        className={`p-4  fixed w-full transition-all z-30 ${
          navBackground
            ? "bg-nav-light-200/20 shadow-md backdrop-blur-[6px]"
            : ""
        }`}
      >
        <div className="flex justify-between items-center font-semibold text-lg">
          <div className=" w-36 h-9 relative">
            <Link href={"/"}>
              <Image
                src={"/logo.png"}
                alt=""
                fill
                style={{ objectFit: "contain" }}
              />
            </Link>
          </div>
          <div className=" items-center gap-10 hidden md:flex">
            <Link
              href={"/"}
              className={`nav-link ${
                "/" === curRoute ? "selected-nav-link" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href={"/products"}
              className={`nav-link ${
                "/products" === curRoute ? "selected-nav-link" : ""
              }`}
            >
              Products
            </Link>
            <Link
              href={"/about"}
              className={`nav-link ${
                "/about" === curRoute ? "selected-nav-link" : ""
              }`}
            >
              About Us
            </Link>
            <Link
              href={"/contact"}
              className={`nav-link ${
                "/contact" === curRoute ? "selected-nav-link" : ""
              }`}
            >
              Contact Us
            </Link>
          </div>
          <div className="w-32 flex justify-end items-center gap-2">
            <div className={styles.inputContainer}>
              <input
                type="text"
                name="text"
                className={styles.input}
                placeholder="Search something..."
              />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            </div>
            <button onClick={() => cycleOpen()} className="md:hidden h-10 w-10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M6 12H18"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M6 15.5H18"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M6 8.5H18"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <>
            <motion.div
              {...framerSidebarBackground}
              aria-hidden="true"
              className="fixed bottom-0 left-0 right-0 top-0 z-40 backdrop-brightness-[0.5]"
              onClick={() => cycleOpen()}
            ></motion.div>
            <motion.div
              {...framerSidebarPanel}
              className="fixed top-0 bottom-0 left-0 z-50 w-full h-screen max-w-xs border-r-2 border-zinc-800 bg-white"
              aria-label="Sidebar"
            >
              <div className="flex items-center justify-between p-5 border-b-2 border-zinc-800">
                <span className="text-xl font-semibold">Welcome</span>
                <button
                  onClick={() => cycleOpen()}
                  className="h-6 w-6"
                  aria-label="close sidebar"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <g id="Menu / Close_MD">
                        <path
                          id="Vector"
                          d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </button>
              </div>
              <div>
                <Link
                  href={"/"}
                  onClick={() => cycleOpen()}
                  className="flex items-center justify-between gap-5 p-5 transition-all border-b-2 hover:bg-zinc-100 "
                >
                  <motion.span
                    {...framerText(0)}
                    className="text-xl font-semibold"
                  >
                    Home
                  </motion.span>
                  <motion.div {...framerIcon(0)}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      width="24px"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <g id="style=fill" clip-path="url(#clip0_1_188)">
                          <g id="home-smile">
                            <path
                              id="Subtract"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M14.469 2.16334C13.0553 0.926668 10.9447 0.926666 9.53099 2.16334L2.87259 7.98785C1.84148 8.88983 1.25 10.1931 1.25 11.563L1.25 20C1.25 22.0711 2.92893 23.75 5 23.75L19 23.75C21.0711 23.75 22.75 22.0711 22.75 20L22.75 11.563C22.75 10.1931 22.1585 8.88983 21.1274 7.98786L14.469 2.16334ZM8.16166 14.8248C7.98381 14.4507 7.53638 14.2916 7.16229 14.4694C6.7882 14.6473 6.62911 15.0947 6.80696 15.4688C7.27394 16.4511 8.00995 17.2808 8.92954 17.8616C9.84913 18.4424 10.9146 18.7504 12.0022 18.75C13.0899 18.7496 14.1551 18.4407 15.0742 17.8592C15.9933 17.2777 16.7287 16.4474 17.1949 15.4648C17.3725 15.0905 17.213 14.6432 16.8388 14.4657C16.4646 14.2881 16.0173 14.4475 15.8397 14.8218C15.4951 15.5481 14.9516 16.1618 14.2722 16.5916C13.5929 17.0214 12.8055 17.2497 12.0016 17.25C11.1977 17.2503 10.4102 17.0226 9.73052 16.5933C9.05083 16.1641 8.50682 15.5508 8.16166 14.8248Z"
                              fill="#000000"
                            ></path>
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_1_188">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(0 24) rotate(-90)"
                            ></rect>
                          </clipPath>
                        </defs>
                      </g>
                    </svg>
                  </motion.div>
                </Link>
                <Link
                  href={"/products"}
                  onClick={() => cycleOpen()}
                  className="flex items-center justify-between gap-5 p-5 transition-all border-b-2 hover:bg-zinc-100 "
                >
                  <motion.span
                    {...framerText(1)}
                    className="text-xl font-semibold"
                  >
                    Products
                  </motion.span>
                  <motion.div {...framerIcon(1)}>
                    <svg
                      height="24px"
                      width="24px"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 248.272 248.272"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <path
                            style={{ fill: "#010002;" }}
                            d="M235.221,153.795c-2.415-5.086-9.725-12.515-14.566-17.432L106.342,18.199 c-4.373-4.52-12.407-10.481-18.694-12.635l-1.039-0.359C79.539,2.768,71.527,0,61.894,0C49.39,0,37.032,4.759,23.968,14.664 c-0.62,0.533-15.224,13.299-16.04,33.211c-0.566,13.935,5.749,27.69,18.819,40.929l81.026,78.567 c8.153,8.387,17.1,12.646,26.575,12.646c15.501,0,26.63-11.444,26.945-11.786c12.009-10.791,12.929-25.373,2.589-41.049 c-2.975-4.514-8.594-9.883-13.108-14.201l-2.121-2.034c-15.365-14.887-47.401-47.646-47.684-47.934 c-0.152-0.163-3.84-4.036-9.79-4.417c-3.367,0-7.223,2.225-9.828,5.673c-2.116,2.801-2.872,5.76-2.143,8.316 c0.772,2.698,2.567,5.309,5.412,7.898l43.322,42.963c1.702,1.686,3.911,3.666,6.217,5.733c3.514,3.155,7.152,6.407,9.442,9.04 c7.974,9.127,3.497,13.369,1.86,14.936c-0.038,0.044-4.21,4.65-9.883,4.65c-2.817,0-5.646-1.142-8.398-3.405 c-2.567-2.11-5.646-5.657-8.626-9.083c-2.148-2.469-4.215-4.846-6.016-6.603l-64.91-63.664c-0.756-0.74-1.605-1.545-2.513-2.404 c-3.971-3.758-9.399-8.909-11.123-12.956c-2.263-5.347-1.692-11.052,1.697-16.964c2.567-4.465,9.507-10.383,14.865-12.662 c14.484-6.162,28.256-4.417,38.721,5.086l123.01,126.213c0.06,0.06,6.037,6.266,5.722,16.399 c-0.294,9.54-5.983,19.347-17.008,29.262c-0.174,0.174-17.449,17.438-37.589,17.438c-8.779,0-16.915-3.323-24.106-9.818 l-92.682-89.951c-0.179-0.19-4.471-4.661-10.476-5.151l-0.642-0.022c-3.051,0-6.092,1.806-8.338,4.95 c-2.627,3.682-3.573,8.273-2.399,11.699c1.18,3.438,3.318,6.462,6.222,8.86l95.896,90.212c4.64,4.357,18.259,11.65,26.303,12.406 c4.52,0.424,8.458,0.626,12.042,0.626c19.439,0,31.704-5.842,52.427-24.933C218.012,223.018,253.317,191.874,235.221,153.795z"
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <input
        type="text"
        name="text"
        className={`hidden md:block lg:hidden ${styles.pageInput}`}
        placeholder="Search something..."
      />
    </div>
  );
};

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
};

const framerSidebarPanel = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.5 },
};

const framerText = (delay: number) => {
  return {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50, transition: { delay: 0 } },
    transition: {
      delay: 0.5 + (delay / 5) * 1.5,
    },
  };
};

const framerIcon = (delay: number) => {
  return {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0, transition: { delay: 0 } },
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: 0.75 + (delay / 5) * 1.5,
    },
  };
};
