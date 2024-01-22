"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
} from "@mui/material";
import {
  HighlightOff,
  HomeOutlined,
  StorefrontOutlined,
  SchoolOutlined,
  LibraryBooksOutlined,
  ManageAccountsOutlined,
  ListAltOutlined,
  AppRegistrationOutlined,
  ExpandLess,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { useStateContext } from "@/libs/contextProvider";
import { tokens } from "@/libs/themeSettings";

const drawerWidth = 280;

const DrawerHeader = styled("div")(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  };
});

export default function Sidebar({ dashboardName, user }) {
  const [openStudents, setOpenStudents] = useState(false);
  const [openBooks, setOpenBooks] = useState(false);
  const [openRental, setOpenRental] = useState(false);
  const [openProgram, setOpenProgram] = useState(false);
  const [openMark, setOpenMark] = useState(false);
  const [openAssignProgram, setOpenAssignProgram] = useState(false);
  const [openUserManagement, setOpenUserManagement] = useState(false);

  const { isSidebarOpen, setIsSidebarOpen } = useStateContext();
  const userRole = user?.role;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const sdcItemsList = [
    { text: "Dashboard", icon: <HomeOutlined />, path: "/sdc-dashboard" },
    {
      text: "Students",
      icon: <SchoolOutlined />,
      path: "/sdc-dashboard/students",
      subItems: [
        {
          text: "Student Registration",
          path: "/sdc-dashboard/students/student-registration",
          icon: <AppRegistrationOutlined />,
        },
        {
          text: "Student Details",
          path: "/sdc-dashboard/students/student-details",
          icon: <ListAltOutlined />,
        },
      ],
    },
    {
      text: "Books",
      icon: <LibraryBooksOutlined />,
      path: "/sdc-dashboard/books",
      subItems: [
        {
          text: "Add Book",
          path: "/sdc-dashboard/books/add-books",
          icon: <AppRegistrationOutlined />,
        },
        {
          text: "Book Details",
          path: "/sdc-dashboard/books/book-details",
          icon: <ListAltOutlined />,
        },
      ],
    },
    {
      text: "Rental",
      icon: <StorefrontOutlined />,
      path: "/sdc-dashboard/rental",
      subItems: [
        {
          text: "Rental Form",
          path: "/sdc-dashboard/rental/rental-form",
          icon: <AppRegistrationOutlined />,
        },
        {
          text: "Rental List",
          path: "/sdc-dashboard/rental/rental-list",
          icon: <ListAltOutlined />,
        },
      ],
    },
    {
      text: "User Management",
      icon: <ManageAccountsOutlined />,
      path: "/sdc-dashboard/user-management",
      subItems: [
        {
          text: "Create User",
          path: "/sdc-dashboard/user-management/create-user",
          icon: <AppRegistrationOutlined />,
        },
        {
          text: "User Details",
          path: "/sdc-dashboard/user-management/user-details",
          icon: <ListAltOutlined />,
        },
      ],
    },
  ];
  const espItemsList = [
    { text: "Dashboard", icon: <HomeOutlined />, path: "/meelad-fest" },
    {
      text: "Programs",
      icon: <SchoolOutlined />,
      path: "/meelad-fest/program",
      subItems: [
        {
          text: "Add Program",
          path: "/meelad-fest/program/add-program",
          icon: <AppRegistrationOutlined />,
        },
        {
          text: "Program Details",
          path: "/meelad-fest/program/program-details",
          icon: <ListAltOutlined />,
        },
      ],
    },
    {
      text: "Students",
      icon: <SchoolOutlined />,
      path: "/meelad-fest/students",
      subItems: [
        {
          text: "Student Registration",
          path: "/meelad-fest/students/student-registration",
          icon: <AppRegistrationOutlined />,
        },
        {
          text: "Student Details",
          path: "/meelad-fest/students/student-details",
          icon: <ListAltOutlined />,
        },
      ],
    },
    {
      text: "Assign Programs",
      icon: <LibraryBooksOutlined />,
      path: "/meelad-fest/assign-programs",
      subItems: [
        {
          text: "Assign",
          path: "/meelad-fest/assign-programs/assign",
          icon: <AppRegistrationOutlined />,
        },
        {
          text: "Program List",
          path: "/meelad-fest/assign-programs/program-list",
          icon: <ListAltOutlined />,
        },
      ],
    },
    {
      text: "Code Letter",
      icon: <SchoolOutlined />,
      path: "/meelad-fest/code-letter",
    },
    {
      text: "Mark",
      icon: <StorefrontOutlined />,
      path: "/meelad-fest/mark",
      subItems: [
        {
          text: "Mark Entry",
          path: "/meelad-fest/mark/mark-entry",
          icon: <AppRegistrationOutlined />,
        },
        {
          text: "Check Mark",
          path: "/meelad-fest/mark/check-mark",
          icon: <ListAltOutlined />,
        },
      ],
    },
    {
      text: "Rental",
      icon: <StorefrontOutlined />,
      path: "/meelad-fest/rental",
      subItems: [
        {
          text: "Rental Form",
          path: "/meelad-fest/rental/rental-form",
          icon: <AppRegistrationOutlined />,
        },
        {
          text: "Rental List",
          path: "/meelad-fest/rental/rental-list",
          icon: <ListAltOutlined />,
        },
      ],
    },
    {
      text: "User Management",
      icon: <ManageAccountsOutlined />,
      path: "/meelad-fest/user-management",
      subItems: [
        {
          text: "Create User",
          path: "/meelad-fest/user-management/create-user",
          icon: <AppRegistrationOutlined />,
        },
        {
          text: "User Details",
          path: "/meelad-fest/user-management/user-details",
          icon: <ListAltOutlined />,
        },
      ],
    },
  ];
  const itemsList = dashboardName === "Library" ? sdcItemsList : espItemsList;

  let modifiedItemsList;
  if (userRole === "Subscriber") {
    modifiedItemsList = itemsList.filter((item) => item.text === "Dashboard");
  } else if (userRole === "Administrator") {
    // Include all items for the "Administrator" role
    modifiedItemsList = itemsList;
  } else {
    // Exclude "User Management" for non-admin users
    modifiedItemsList = itemsList.filter(
      (item) => item.text !== "User Management"
    );
  }

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "students":
        setOpenStudents(!openStudents);
        break;
      case "books":
        setOpenBooks(!openBooks);
        break;
      case "rental":
        setOpenRental(!openRental);
        break;
      case "programs":
        setOpenProgram(!openProgram);
        break;
      case "assign programs":
        setOpenAssignProgram(!openAssignProgram);
        break;
      case "mark":
        setOpenMark(!openMark);
        break;
      case "user management":
        setOpenUserManagement(!openUserManagement);
        break;
      default:
        break;
    }
  };

  const DrawerItem = ({ item }) => (
    <Link href={item.path}>
      <ListItem
        button
        className="pl-7"
      >
        <ListItemIcon className="grid place-content-center">
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItem>
    </Link>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          background: "none",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: colors.primary[400],
          },
        }}
        variant="temporary"
        anchor="left"
        open={isSidebarOpen}
        slotProps={{
          backdrop: {
            onClick: closeSidebar,
          },
        }}
      >
        <DrawerHeader>
          <Box className="w-full grid place-content-center text-lg font-semibold">
            {dashboardName}
          </Box>
          <IconButton onClick={closeSidebar}>
            <HighlightOff />
          </IconButton>
        </DrawerHeader>
        <List>
          {modifiedItemsList.map((item, index) =>
            item.subItems ? (
              <div key={index}>
                <ListItem
                  button
                  className="pl-7"
                  onClick={() => toggleDropdown(item.text.toLowerCase())}
                >
                  <ListItemIcon className="grid place-content-center">
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                  {openStudents && item.text === "Students" ? (
                    <ExpandLess />
                  ) : null}
                  {openBooks && item.text === "Books" ? <ExpandLess /> : null}
                  {openRental && item.text === "Rental" ? <ExpandLess /> : null}
                  {openMark && item.text === "Mark" ? <ExpandLess /> : null}
                  {openProgram && item.text === "Programs" ? (
                    <ExpandLess />
                  ) : null}
                  {openAssignProgram && item.text === "Assign Programs" ? (
                    <ExpandLess />
                  ) : null}
                  {openUserManagement && item.text === "User Management" ? (
                    <ExpandLess />
                  ) : null}
                </ListItem>
                <Collapse
                  in={
                    (openStudents && item.text === "Students") ||
                    (openBooks && item.text === "Books") ||
                    (openRental && item.text === "Rental") ||
                    (openProgram && item.text === "Programs") ||
                    (openAssignProgram && item.text === "Assign Programs") ||
                    (openMark && item.text === "Mark") ||
                    (openUserManagement && item.text === "User Management")
                  }
                  timeout="auto"
                  unmountOnExit
                >
                  <List
                    component="div"
                    disablePadding
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.path}
                      >
                        <ListItem
                          button
                          className="pl-10"
                        >
                          <ListItemIcon className="grid place-content-center">
                            {subItem.icon}
                          </ListItemIcon>
                          <ListItemText primary={subItem.text} />
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              </div>
            ) : (
              <DrawerItem
                item={item}
                key={index}
              />
            )
          )}
        </List>
      </Drawer>
    </Box>
  );
}
