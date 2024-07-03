import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ActivityCard from '../components/ActivityCard';
import { useSelector } from 'react-redux';
import { haversineDistance } from '../utils';
import { subscribeUserToCrime } from '../api/crime';


export default function ActivityTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState([])
    const [distancesFromActivity, setDistancesFromActivity] = React.useState({})
    const activityData = useSelector(state => state.home.latestActivity)
    const userData = useSelector(state => state.user.user)
    const [showAlert, setShowAlert] = React.useState(false)
    React.useEffect(() => {
        let activityArray = [...activityData]
        let disMap = []
        activityArray.map((activity, index) => {
            disMap[activity.crimeId] = haversineDistance(activity.crimeLocation, userData.location).toFixed(2)
        })
        setData(activityData)
        setDistancesFromActivity(disMap)
        //run through the list and fetch the smallest of the distances

        //if the distance is less than one km then send subscriber post call
        let low = null
        for (var i = 0; i < activityArray.length; i++) {
            if (disMap[activityArray[i].crimeId] < 1.0) {
                if (activityArray[i].latestStatus == 'Created') {
                    low = activityArray[i].crimeId
                    break
                }
            }
        }
        if (low) {
            subscribeUserToCrime(low, userData?.id)
        }
        //make new api that polls the notif every 5 seconds

    }, [activityData])
    return (
        <Paper sx={{ width: '100%', overflow: 'scroll', height: '80vh', borderRadius: '15px' }}>


            <TableContainer sx={{ minHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                key={'ids'}
                                align={'center'}
                            //   style={{ minWidth: column.minWidth }}
                            >
                                Latest Activity
                            </TableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {data
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>

                                        <ActivityCard data={row} distance={distancesFromActivity[row.crimeId]} />
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
    );
}