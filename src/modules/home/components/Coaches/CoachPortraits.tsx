import Grid from "@mui/material/Grid2";
import { CoachPortrait } from "./CoachPortrait";

const coaches = [
  {
    image: "https://assets.dtefrisco.com/images/coaches/daniel_kovalsky.png",
    name: "Daniel Kovalsky",
    role: "Head Coach",
  },
  {
    image: "https://assets.dtefrisco.com/images/coaches/josh_holland.png",
    name: "Josh Holland",
    role: "Asst. Coach",
  },
  {
    image: "https://assets.dtefrisco.com/images/coaches/yonatan_eilate.png",
    name: "Yonatan Eilate",
    role: "Asst. Coach",
  },
];

export const CoachPortraits = () => {
  return (
    <Grid container spacing={2}>
      {coaches.map((coach) => (
        <CoachPortrait
          key={coach.name}
          image={coach.image}
          name={coach.name}
          role={coach.role}
        />
      ))}
    </Grid>
  );
};
