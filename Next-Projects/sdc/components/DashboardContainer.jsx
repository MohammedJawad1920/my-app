"use client";

import { Box, Button, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import {
  AutoStories,
  EmojiEvents,
  LibraryBooks,
  LocalLibrary,
  School,
} from "@mui/icons-material";
import StatBox from "@/components/StatBox";
import LineChart from "@/components/LineChart";
import Header from "@/components/Header";
import { tokens } from "@/libs/themeSettings";
import {
  calculateAnnualReaders,
  calculateTopReader,
  calculateTotalBookCount,
  monthNames,
} from "@/libs/constants";

const Dashboard = ({ booksData, studentsData, rentalsData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const totalBooks = booksData?.length || 0;
  const totalStudents = studentsData?.length || 0;
  const availableBooks =
    booksData?.filter((book) => book.status === "Available").length || 0;
  const rentedBooks =
    booksData?.filter((book) => book.status === "Rented").length || 0;

  const topReadersByMonth = calculateTopReader(rentalsData);
  const totalBooksByMonth = calculateTotalBookCount(rentalsData);
  const annualReaders = calculateAnnualReaders(totalBooksByMonth);

  const currentDate = new Date();
  const lastMonthYearKey = `${
    currentDate.getMonth() === 0 ? 12 : currentDate.getMonth()
  }-${
    currentDate.getMonth() === 0
      ? currentDate.getFullYear() - 1
      : currentDate.getFullYear()
  }`;

  const prevMonthName = getPrevMonthName(lastMonthYearKey);
  const topReadersOfEachMonth = Object.entries(topReadersByMonth);

  return (
    <div className="container mx-auto m-5">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="20px"
      >
        <Header
          title="DASHBOARD"
          subtitle="Welcome to your dashboard"
        />
        <Box>
          <Button
            sx={{
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            <span className="hidden md:block"> Download Reports</span>
          </Button>
        </Box>
      </Box>
      <Box
        padding="20px"
        className=" grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3"
      >
        {renderStatBox(
          "Total Books",
          totalBooks,
          <AutoStories
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            className=" text-2xl"
          />,
          colors.primary[400]
        )}
        {renderStatBox(
          "Total Students",
          totalStudents,
          <School sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />,
          colors.primary[400]
        )}
        {renderStatBox(
          "Available Books",
          availableBooks,
          <LibraryBooks
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />,
          colors.primary[400]
        )}
        {renderStatBox(
          `Reader of the month (${prevMonthName})`,
          topReadersByMonth[lastMonthYearKey]?.studentName || "No data",
          <EmojiEvents
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />,
          colors.primary[400]
        )}
        {renderStatBox(
          "Books Rented",
          rentedBooks,
          <LocalLibrary
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />,
          colors.primary[400]
        )}
      </Box>
      <Box
        padding="20px"
        className="grid lg:grid-cols-6 gap-3"
      >
        <Box className="hidden md:block   lg:col-span-4">
          <Box backgroundColor={colors.primary[400]}>
            {renderAnnualReadersBox()}
          </Box>
        </Box>
        <Box
          backgroundColor={colors.primary[400]}
          overflow="auto"
          height="280px"
          className=" max-w-3xl lg:col-span-2 md:max-w-lg"
        >
          {renderTopReadersOfEachMonthBox()}
        </Box>
      </Box>
    </div>
  );

  function renderStatBox(subtitle, title, icon, backgroundColor) {
    return (
      <Box
        backgroundColor={backgroundColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatBox
          title={title}
          subtitle={subtitle}
          icon={icon}
        />
      </Box>
    );
  }

  function renderAnnualReadersBox() {
    return (
      <>
        <Box
          p="10px 30px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight="600"
              color={colors.grey[100]}
            >
              This Year Readers
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              color={colors.greenAccent[500]}
            >
              {annualReaders}
            </Typography>
          </Box>
          <Box>
            <IconButton>
              <DownloadOutlinedIcon
                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
              />
            </IconButton>
          </Box>
        </Box>
        <Box
          height="250px"
          mt="-40px"
          pr="10px"
        >
          <LineChart totalBooksByMonth={totalBooksByMonth} />
        </Box>
      </>
    );
  }

  function renderTopReadersOfEachMonthBox() {
    return (
      <>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
          color={colors.grey[100]}
          p="15px"
        >
          <Typography
            color={colors.grey[100]}
            variant="h5"
            fontWeight="600"
          >
            Top Reader Of Each Month
          </Typography>
        </Box>
        {topReadersOfEachMonth.map((item, i) => (
          <Box
            key={i}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Typography color={colors.grey[100]}>
                {item[1]?.studentName || "No data"}
              </Typography>
            </Box>
            <Box color={colors.grey[100]}>{item[0]}</Box>
          </Box>
        ))}
      </>
    );
  }

  function getPrevMonthName(lastMonthYearKey) {
    const [month, year] = lastMonthYearKey.split("-");

    return monthNames[month - 1];
  }
};

export default Dashboard;
