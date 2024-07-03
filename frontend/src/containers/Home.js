import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../redux/userSlice"
import { MapContainer } from "../components/MapContainer"
import styles from '../assets/styles/home.module.css'
import { BottomNavigation, BottomNavigationAction, Box, Button, Card, CardContent, Grid, IconButton, Paper, Snackbar, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TopSlider from '../components/TopSlider';
import CrimeModal from './CrimeModal';
import { fetchAllCrimes, fetchNotifications, fetchPlaces, fetchTypes, fetchWeapons, fetchlatestActivity } from '../api/home';
import LatestActivityWindow from './LatestActivityWindow';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MapIcon from '@mui/icons-material/Map';
import ListIcon from '@mui/icons-material/List';
import DemoTable from './CrimeTable';
import ActivityTable from './ActivityTable';
import SettingModal from './SettingModal';
import NotificationModal from './NotificationModal';
export default function Home() {
    const [mode, setMode] = React.useState(1)
    const [year, setYear] = React.useState(2023)
    const [value, setValue] = React.useState(1);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [openCrimeModal, setOpenCrimeModal] = React.useState(false);
    const [openSettingsModal, setOpenSettingsModal] = React.useState(false);
    const [openNotifModal, setOpenNotifModal] = React.useState(false);

    const crimeModalHandler = () => setOpenCrimeModal(s => !s);
    const settingModalHandler = () => setOpenSettingsModal(s => !s);
    const notificationModelHandler = () => setOpenNotifModal(s => !s)
    const [activityData, setActivityData] = React.useState([])
    const activityDataMain = useSelector(state => state.home.latestActivity)
    const userData = useSelector(state => state.user.user)

    React.useEffect(() => {

        setActivityData(activityDataMain)

    }, [activityDataMain])

    useEffect(() => {
        fetchTypes()
        fetchWeapons()
        fetchPlaces()
        fetchlatestActivity()
        fetchAllCrimes()
    }, [])
    useEffect(() => {
        fetchNotifications(userData?.id)
    }, [userData])
    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <div className={styles.logo}>
                <Paper style={{
                    padding: '5px',
                }}>
                    <Typography fontSize={24}>Crime<b>Guard</b></Typography>
                </Paper>
            </div>

            {!mode && (
                <>
                    <div className={styles.topSlider}>
                        <Paper style={{ borderRadius: '15px', paddingLeft: '10px', paddingRight: '10px', display: 'flex', alignItems: 'center' }}>
                            <TopSlider year={year} setYear={setYear} />
                        </Paper>
                    </div>
                    <div className={styles.topSliderData}>
                        <Paper style={{ borderRadius: '15px', paddingLeft: '10px', paddingRight: '10px', display: 'flex', alignItems: 'center' }}>
                            <Typography fontSize={24}>{year}</Typography>
                        </Paper>
                    </div>
                </>
            )}
            <div className={styles.buttonList}>
                <Paper style={{ borderRadius: '15px', paddingLeft: '10px', paddingRight: '10px', display: 'flex', alignItems: 'center' }}>
                    <IconButton aria-label="fingerprint" style={{ color: mode == 0 ? '#3880ff' : 'grey' }} onClick={() => { setMode(0) }} >
                        <MapIcon />
                    </IconButton>
                    <IconButton aria-label="fingerprint" style={{ color: mode == 1 ? '#3880ff' : 'grey' }} onClick={() => { setMode(1) }} >
                        <ListIcon />
                    </IconButton>
                </Paper>
            </div>
            {!mode && (<>
                <MapContainer year={year} />
                <div className={styles.activityTabContainer}>
                    <ActivityTable />
                </div>


            </>)}
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                className={styles.bottomTab}
            >
                <BottomNavigationAction label="Logout" icon={<LogoutIcon onClick={() => {
                    dispatch(logout())
                    navigate('/login')
                }} />} />
                <BottomNavigationAction label="Create" icon={<AddIcon />} onClick={() => setOpenCrimeModal(true)} />
                <BottomNavigationAction label="Notifications" icon={<NotificationsIcon />} onClick={() => setOpenNotifModal(true)} />
                <BottomNavigationAction label="Settings" icon={<SettingsIcon />} onClick={() => setOpenSettingsModal(true)} />
            </BottomNavigation>
            {mode && (
                <Grid container mt={10} paddingLeft={5} paddingRight={5} spacing={2} >
                    <Grid item xs={4} >
                        <ActivityTable />
                    </Grid>
                    <Grid item xs={8}  >
                        <DemoTable />
                    </Grid>
                </Grid>
            )}
            <CrimeModal handler={crimeModalHandler} open={openCrimeModal} />
            <SettingModal handler={settingModalHandler} open={openSettingsModal} />
            <NotificationModal handler={notificationModelHandler} open={openNotifModal} />

        </div>

    )
}