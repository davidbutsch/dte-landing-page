import { QueryPlayer } from "@/modules/checkout/types";
import { Button, Collapse, Icon } from "@mui/material";
import React from "react";
import { TransitionGroup } from "react-transition-group";
import { JsonParam, useQueryParam, withDefault } from "use-query-params";
import { PlayerForm } from "./PlayerForm";

export const PlayerForms = () => {
  // STATE

  const [players, setPlayers] = useQueryParam<QueryPlayer[]>(
    "players",
    withDefault(JsonParam, [{ name: "", grade: "" }])
  );

  // API

  // METHODS

  /**
   * Increments the player count by 1.
   */
  const handleAddPlayer = () => {
    // Create new players entry if query parameter 'players' exists
    if (players) setPlayers([...players, { name: "", grade: "" }]);
  };

  return (
    <>
      <TransitionGroup component={React.Fragment}>
        {players.map((_player, index) => (
          <Collapse key={index}>
            <PlayerForm index={index} />
          </Collapse>
        ))}
      </TransitionGroup>

      <Button
        variant="contained"
        color="secondary"
        startIcon={<Icon className="material-symbols-outlined">add</Icon>}
        onClick={handleAddPlayer}
      >
        Add Player
      </Button>
    </>
  );
};
