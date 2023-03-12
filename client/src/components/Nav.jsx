import { useLocation, Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { IoDocumentsOutline, IoDocumentOutline } from "react-icons/io5";
import { GoGear } from "react-icons/go";
import { GiGears } from "react-icons/gi";
import { RiHomeGearFill, RiCarFill, RiCarWashingFill } from "react-icons/ri";
import { BsFillBuildingFill, BsBuildingFillAdd } from "react-icons/bs";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  GroupAdd,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  Build,
  Construction,
  HomeRepairService,
  Store,
  AddBusiness,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useEffect, useState } from "react";

function Nav() {
  const { setListType } = useGlobalContext();
  const theme = useTheme();
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const [isSideBarOpen, setIsSidebarOpen] = useState(true);
  const isNonMobile = useMediaQuery("(min-width: 600px");
  const drawerWidth = "250px";
  const navigate = useNavigate();

  const navItems = [
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
      nav: "",
      listType: "none",
    },
    {
      text: "Work Order List",
      icon: <IoDocumentsOutline />,
      nav: "workorderlist",
      listType: "workorders",
    },
    {
      text: "New Work Order",
      icon: <IoDocumentOutline />,
      nav: "workorderform",
      listType: "",
    },
    {
      text: "Customer List",
      icon: <Groups2Outlined />,
      nav: "customerlist",
      listType: "customers",
    },
    {
      text: "New Customer",
      icon: <GroupAdd />,
      nav: "customerform",
      listType: "",
    },
    {
      text: "Parts List",
      icon: <GiGears />,
      nav: "parts",
      listType: "partslist",
    },
    {
      text: "New Part",
      icon: <GoGear />,
      nav: "partform",
      listType: "",
    },
    {
      text: "Part Category",
      icon: <RiHomeGearFill />,
      nav: "partcategory",
      listType: "partcategory",
    },
    {
      text: "Labor List",
      icon: <Construction />,
      nav: "labor",
      listType: "laborlist",
    },
    {
      text: "New Labor",
      icon: <Build />,
      nav: "laborform",
      listType: "",
    },
    {
      text: "Labor Category",
      icon: <HomeRepairService />,
      nav: "laborcategory",
      listType: "laborcategory",
    },
    {
      text: "Vendor List",
      icon: <Store />,
      nav: "vendorlist",
      listType: "vendors",
    },
    {
      text: "New Vendor",
      icon: <AddBusiness />,
      nav: "vendorform",
      listType: "",
    },
    {
      text: "Job Types List",
      icon: <RiCarFill />,
      nav: "jobtypelist",
      listType: "jobtypes",
    },
    {
      text: "New Job Type",
      icon: <RiCarWashingFill />,
      nav: "jobtypeform",
      listType: "",
    },
  ];

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      <Drawer
        open={isSideBarOpen}
        onClose={() => setIsSidebarOpen(false)}
        variant="persistent"
        anchor="left"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            color: theme.palette.secondary[200],
            backgroundColor: theme.palette.background.alt,
            boxSixing: "border-box",
            borderWidth: isNonMobile ? 0 : "2px",
            width: drawerWidth,
          },
        }}
      >
        <Box width="100%">
          <Box m="1.5rem 2rem 2rem 3rem">
            <FlexBetween color={theme.palette.secondary.main}>
              <Box display="flex" alignItems="center" gap="0.5rem">
                <Typography variant="h4" fontWeight="bold">
                  Yeoman Race Engines
                </Typography>
              </Box>
              {!isNonMobile && (
                <IconButton onClick={() => setIsSidebarOpen(!isSideBarOpen)}>
                  <ChevronLeft />
                </IconButton>
              )}
            </FlexBetween>
          </Box>
          <List>
            {navItems.map(({ text, icon, nav, listType }) => {
              if (!icon) {
                return (
                  <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                    {text}
                  </Typography>
                );
              }
              const lcText = nav.toLowerCase();

              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/${nav}`);
                      setActive(lcText);
                      setListType(listType);
                    }}
                    sx={{
                      backgroundColor:
                        active === lcText
                          ? theme.palette.secondary[300]
                          : "transparent",
                      color:
                        active === lcText
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: "2rem",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    {active === lcText && (
                      <ChevronRightOutlined sx={{ ml: "auto" }} />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Nav;
