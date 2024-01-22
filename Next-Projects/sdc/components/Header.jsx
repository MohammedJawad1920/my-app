import { tokens } from "@/libs/themeSettings";
import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{
          mb: "5px",
        }}
        className="text-2xl md:text-3xl"
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        color={colors.greenAccent[400]}
        className="text-base md:text-lg"
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
