import { useBreakpoints } from "@vueuse/core";

export default function useBreakpoint() {
  /** Get a list of all users (optionally filtered by department) */
  const breakpoints = useBreakpoints({
    mobile: 200,
    tablet: 700,
    laptop: 1024,
    desktop: 1280,
  });

  const isMobile = breakpoints.between("mobile", "tablet");
  return {
    isMobile,
  };
}
