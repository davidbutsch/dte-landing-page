import { NavBar } from "./Navbar/NavBar";

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};
