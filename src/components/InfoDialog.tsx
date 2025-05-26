import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { create } from "zustand";

type InfoDialogStoreState = {
  title: string;
  lines: string[];
  isOpen: boolean;
  close: () => void;
};

export const useInfoDialogStore = create<InfoDialogStoreState>((set) => ({
  title: "Info",
  lines: [],
  isOpen: false,
  close: () => set({ isOpen: false }),
}));

type OpenInfoDialogOptions = {
  title?: string;
  lines?: string[];
};

/**
 * Opens an error dialog with the specified title and text.
 *
 * @param options - The options for configuring the error dialog.
 * @param [options.title] - The title of the error dialog (Default: "Error").
 * @param [options.text] - The text content of the error dialog (Default: "An unknown error occurred.")
 */
export const openInfoDialog = ({
  title = "Error",
  lines = [],
}: OpenInfoDialogOptions): void =>
  useInfoDialogStore.setState({
    title,
    lines,
    isOpen: true,
  });

export const InfoDialog = () => {
  const { title, lines, isOpen, close } = useInfoDialogStore();

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        {lines.map((line, i) => (
          <React.Fragment key={i}>
            <Typography fontSize={12}>{line}</Typography>
            <br />
          </React.Fragment>
        ))}
      </DialogContent>

      <DialogActions>
        <Button color="cream" variant="contained" onClick={close}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
