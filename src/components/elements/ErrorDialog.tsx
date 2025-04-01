import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  Stack,
} from "@mui/material";
import { create } from "zustand";

type ErrorDialogStoreState = {
  title: string;
  text: string;
  isOpen: boolean;
  close: () => void;
};

export const useErrorDialogStore = create<ErrorDialogStoreState>((set) => ({
  title: "Error",
  text: "An unknown error occurred.",
  isOpen: false,
  close: () => set({ isOpen: false }),
}));

type OpenErrorDialogOptions = {
  title?: string;
  text?: string;
};

/**
 * Opens an error dialog with the specified title and text.
 *
 * @param options - The options for configuring the error dialog.
 * @param [options.title] - The title of the error dialog (Default: "Error").
 * @param [options.text] - The text content of the error dialog (Default: "An unknown error occurred.")
 */
export const openErrorDialog = ({
  title = "Error",
  text = "An unknown error occurred.",
}: OpenErrorDialogOptions): void =>
  useErrorDialogStore.setState({
    title: title,
    text: text,
    isOpen: true,
  });

export const ErrorDialog = () => {
  const { title, text, isOpen, close } = useErrorDialogStore();

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Stack direction="row" gap={2} alignItems="center">
          <Icon
            className="material-symbols-outlined"
            sx={{ fontSize: 64 }}
            color="primary"
          >
            error
          </Icon>
          <DialogContentText paddingRight={1} fontSize={18}>
            {text}
          </DialogContentText>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button color="cream" variant="contained" onClick={close}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
