import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GradingIcon from '@mui/icons-material/Grading';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import QueueIcon from '@mui/icons-material/Queue';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';


const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >

            <Link style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
                textDecoration: 'none'
            }} to={to} >
                <Typography>{title}</Typography>
            </Link>
        </MenuItem>
    );
};

export const SidebarComponent = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Box
            sx={{
                "& .ps-sidebar-container": {
                    background: `${colors.primary[400]} !important`,
                    minHeight: "100vh !important",
                    borderColor: `${colors.primary[400]} !important`
                },
                "& .ps-sidebar-root": {
                    width: "350px",
                    borderColor: `${colors.primary[400]} !important`
                },

                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <Sidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 50px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[100]}>
                                    Brainy Internet Group
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>



                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Job Cards
                        </Typography>
                        <Item
                            title="New Job card"
                            to="/jobs/create"
                            icon={<QueueIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Open Job Cards"
                            to="/jobs/open-jobs"
                            icon={<ContentCopyIcon />}

                            selected={selected}
                            setSelected={setSelected}
                        />
                         <Item
                            title="Outsourced Job Cards"
                            to="/jobs/outsourced-jobs"
                            icon={<CompareArrowsIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Closed Job Cards"
                            to="/jobs/closed-jobs"
                            icon={<GradingIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Vendors
                        </Typography>
                        <Item
                            title="New Vendor"
                            to="/vendor/create"
                            icon={<GroupAddIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Vendors List"
                            to="/vendor/list"
                            icon={<ContentCopyIcon />}

                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Users
                        </Typography>
                        <Item
                            title="New user account"
                            to="/user/create"
                            icon={<PersonAddAltIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="User accounts"
                            to="/user/list"
                            icon={<ContentCopyIcon />}

                            selected={selected}
                            setSelected={setSelected}
                        />


                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    );
};