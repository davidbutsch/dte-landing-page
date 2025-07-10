import { ErrorDialog, InfoDialog, ScrollToTop } from "@/components";
import { queryClient } from "@/libs";
import { ThemeProvider } from "@/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
  return (
    <BrowserRouter>
      <QueryParamProvider
        adapter={ReactRouter6Adapter}
        options={{
          includeAllParams: true,
          params: {},
          updateType: "replaceIn",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <ThemeProvider>
            {/* Reusable Components */}

            <ScrollToTop />
            <Toaster />
            <ErrorDialog />
            <InfoDialog />
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </QueryParamProvider>
    </BrowserRouter>
  );
};
