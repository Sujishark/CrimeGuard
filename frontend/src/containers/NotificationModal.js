import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import moment from 'moment'

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Grid } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function NotificationModal({ handler, open }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [notificationList, setNotificationList] = React.useState()
    const userData = useSelector(state => state.user.user)
    const notifications = useSelector(state => state.home.notifications)

    React.useEffect(() => {
        if (notifications.length) {
            setNotificationList(notifications)
        }
    }, [notifications])
    return (
        <div  >
            <Modal
                open={open}
                onClose={handler}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                < Box sx={style} spacing={2} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                    <Grid container>
                    <Grid item xs={12} style={{display:'flex'}}>
                            <Typography fontSize={20}  >
                                Notifications
                            </Typography>
                        </Grid>
                        {notificationList && notificationList.map((data => (
                            <Grid item xs={12}>
                                <Card sx={{ minWidth: 50, overflow: 'hidden', borderRadius: '0px' }}>
                                    <CardContent>
                                        <Box>
                                            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>

                                                <Link to={`/incident/${data?.bannerNavigation}`}> <Typography style={{ fontSize: 16, marginBottom: 0, marginTop: 0 }} >
                                                    {data?.bannerNavigation}
                                                </Typography></Link>
                                                <Box style={{
                                                    // float:'right',
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    alignItems: "center"
                                                }}>
                                                    <AccessAlarmIcon />
                                                    <Typography fontSize={12} variant="body2">
                                                        {moment(data?.createdAt).format('YYYY/mm/dd, hh:mm A')}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Typography fontSize={14} style={{ marginBottom: 0, marginTop: 0 }} >
                                                {data?.bannerContent}
                                            </Typography>


                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )))}
                        {!notificationList && (
                            <Typography color={'grey'} mt={2} width={'100%'} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>Nothing to show</Typography>
                        )}

                    </Grid>
                </Box>
            </Modal>
        </div >
    );
}