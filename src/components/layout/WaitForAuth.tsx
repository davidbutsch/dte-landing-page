import React from "react";

type WaitForAuthProps = {
  children: React.ReactNode;
};

/**
 * @returns Children components once user has loaded.
 *
 * **TODO: Rework how we wait for critical data**
 */
export const WaitForAuth = ({ children }: WaitForAuthProps) => {
  // const { isUserLoading } = ();

  return children;
  // return isUserLoading ? (
  //   <Fade in={true}>
  //     <LinearProgress />
  //   </Fade>
  // ) : (
  //   children
  // );
};
