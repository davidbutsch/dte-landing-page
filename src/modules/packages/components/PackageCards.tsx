import { theme } from "@/theme";
import {
  Button,
  Chip,
  Container,
  Grid2,
  Icon,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

type PackageCardTag = {
  icon: string;
  label: string;
  color:
    | "primary"
    | "default"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
};

type PackageCard = {
  key: number;
  title: string;
  description: string;
  services: string[];
  tags: PackageCardTag[];
  price: string;
};

const programCards: PackageCard[] = [
  {
    key: 1,
    title: "Fundamentals Training",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    services: [
      "1 Practice Per Week",
      "1 Game Per Week",
      "8 Hours Of training Per Month",
      "Access To Multiple Coaches",
    ],
    tags: [
      {
        icon: "group",
        color: "success",
        label: "Sibling Discount",
      },
    ],
    price: "135/mo",
  },
  {
    key: 2,
    title: "Elite Training",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    services: [
      "24 Hours Of Training/Coaching Per Month",
      "1 Game Per Week",
      "Comes To Just $7.29 Per Hour!!!",
      "Indoor Basketball Court Access",
      "Access To Multiple Coaches",
      "Game Evaluation (Film) Days",
      "Video Library Of Drills So Players Can Practice At Home",
      "Goal Setting Sessions",
    ],
    tags: [
      {
        icon: "attach_money",
        color: "secondary",
        label: "Best Value",
      },
      {
        icon: "group",
        color: "success",
        label: "Sibling Discount",
      },
    ],
    price: "175/mo",
  },
  {
    key: 3,
    title: "Personal Lesson",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.",
    services: [
      "In Depth Personal Training Lesson",
      "1 Hour Of Skills Training",
      "Learn From College Athletes",
    ],
    tags: [],
    price: "60",
  },
];

const CardTags = ({ tags }: { tags: PackageCardTag[] }) => {
  if (tags.length == 0) return;

  return (
    <Stack mb={2} direction="row" gap={2}>
      {tags.map((tag) => (
        <Chip
          size="small"
          color={
            tag.color as
              | "primary"
              | "default"
              | "secondary"
              | "error"
              | "info"
              | "success"
              | "warning"
          }
          icon={<Icon className="material-symbols-outlined">{tag.icon}</Icon>}
          label={tag.label}
        />
      ))}
    </Stack>
  );
};

const CardInfo = ({
  title,
  description,
  price,
}: {
  title: string;
  description: string;
  price: string;
}) => {
  return (
    <Stack mb={2}>
      <Typography variant="h5" fontWeight={600}>
        {title}
      </Typography>
      <Typography mb={2} color="textSecondary">
        {description}
      </Typography>
      <Typography variant="h4" fontWeight={600}>
        ${price}
      </Typography>
    </Stack>
  );
};

const CardCallToAction = () => {
  return (
    <Button sx={{ mb: 2 }} variant="contained" color="secondary" fullWidth>
      Get Started
    </Button>
  );
};

const CardServices = ({ services }: { services: string[] }) => {
  return (
    <List dense>
      {services.map((service) => (
        <ListItem disableGutters>
          <Icon
            sx={{ mr: 2 }}
            color="success"
            className="material-symbols-outlined"
          >
            check
          </Icon>
          <ListItemText primary={service} />
        </ListItem>
      ))}
    </List>
  );
};

export const PackageCards = () => {
  return (
    <Container>
      <Grid2 container spacing={2}>
        {programCards.map((card) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={card.key}>
            <Paper
              variant="outlined"
              sx={{
                padding: theme.spacing(2),
              }}
            >
              <CardTags tags={card.tags} />
              <CardInfo
                title={card.title}
                description={card.description}
                price={card.price}
              />
              <CardCallToAction />
              <CardServices services={card.services} />
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};
