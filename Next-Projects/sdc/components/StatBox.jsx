import { tokens } from "@/libs/themeSettings";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const StatBox = ({ title, subtitle, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      width="100%"
      padding="10px"
    >
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Box className="space-y-2">
          <Box>{icon}</Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
            className="text-sm md:text-base lg:text-lg"
          >
            {title}
          </Typography>
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        mt="2px"
      >
        <Typography
          variant="h5"
          sx={{ color: colors.greenAccent[500] }}
          className="text-sm md:text-base lg:text-lg"
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
