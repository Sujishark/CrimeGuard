import React from 'react';

import { Box, Card, CardContent, Typography } from "@mui/material"
import moment from 'moment';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { Link } from 'react-router-dom';
const ActivityCard = ({ data, distance }) => {
    return (
        <Card sx={{ minWidth: 50, overflow: 'hidden', borderRadius: '0px' }}>
            <CardContent>
                <Box>
                    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>

                        <Link to={`/incident/${data?.crimeId}`}> <Typography style={{ fontSize: 16, marginBottom: 0, marginTop: 0 }} >
                            {data?.crimeId}
                        </Typography></Link>
                        <Typography style={{ fontSize: 14, marginBottom: 0, marginTop: 0 }}
                            sx={{ fontWeight: 'bold' }} >
                            {data?.latestStatus}
                        </Typography>
                    </Box>
                    <Typography fontSize={14} style={{ marginBottom: 0, marginTop: 0 }} >
                        {data?.crimeAddress}
                    </Typography>

                    <Typography fontStyle={'italic'} fontSize={12} style={{ marginBottom: 0, marginTop: 0 }}>
                        Urbana, IL
                    </Typography>
                    <Box style={{
                        // float:'right',
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <Box>
                            <Typography fontSize={12} variant="body2">
                                {`${distance} miles away`}
                            </Typography>
                        </Box>
                        <Box style={{
                            // float:'right',
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center"
                        }}>
                            <AccessAlarmIcon />
                            <Typography fontSize={12} variant="body2">
                                {moment(data?.latestActivityCreatedAt).format('LLL')}
                            </Typography>
                        </Box>

                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ActivityCard