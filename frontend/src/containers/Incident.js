import React, { useEffect } from 'react'
import { fetchIncident, fetchActivityForIncident, fetchCommentsForIncident, createComment } from '../api/crime'
import { useNavigate, useParams } from 'react-router-dom'
import StatusStepper from '../components/StatusStepper'
import { Box, Grid, IconButton, Paper, TextField, Typography } from '@mui/material'
import classes from '../assets/styles/incident.module.css'
import { MapContainer } from '../components/MapContainer'
import { useSelector } from 'react-redux'
import moment from 'moment'
import StopWatch from '../components/StopWatch'
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import { createTimestamp } from '../utils'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MapContainerComponent } from '../components/MapContainerComponent'
export const Incident = () => {
    const bottomRef = React.useRef(null);
    const [diff, setDiff] = React.useState(null)
    let { id } = useParams()
    const navigate = useNavigate()
    const incident = useSelector(state => state.incident.data)
    const comments = useSelector(state => state.incident.comments)
    const activities = useSelector(state => state.incident.activities)
    const userData = useSelector(state => state.user.user)

    const [incidentData, setIncidentData] = React.useState(null)
    const [commentsData, setCommentsData] = React.useState(null)
    const [activitiesData, setActivitiesData] = React.useState(null)
    const [comment, setComment] = React.useState('')
    const [didSend, setDidSend] = React.useState(false)
    useEffect(() => {
        //fetch all data
        fetchIncident(id)
        fetchActivityForIncident(id)
        fetchCommentsForIncident(id)
    }, [])
    useEffect(() => {
        //fetch all data
        setIncidentData(incident)
        setCommentsData(comments)
        setActivitiesData(activities)
    }, [incident, comments, activities])

    const findDiffTimeStamp = () => {
        let diffdate = moment().diff(incidentData?.reportedTimestamp)
        let secs = moment.duration(diffdate).asSeconds()
        setDiff(secs)
    }
    function showDate(timestamp) {
        const offsetFromChampaign = -6; // Champaign is in the Central Time Zone (UTC-6)

        const t = createTimestamp(timestamp, offsetFromChampaign);
        return t
    }
    useEffect(() => {
        findDiffTimeStamp()
    }, [incidentData])
    const postComment = () => {
        createComment({
            crimeId: id,
            userId: userData.id,
            body: comment,
        }).then(data => {
            const { success } = data
            if (success) {
                fetchCommentsForIncident(id)
            }
            setComment('')
            setDidSend(true)
            return

        })
    }
    useEffect(() => {
        if (didSend) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        return ()=>{
            setDiff(null)
        }
    }, [commentsData])

    console.log(incidentData)
    return (

        <Paper style={{ backgroundColor: '#D3D3D3', display: 'block', minHeight: '100vh', width: '100%' }} >
            <Grid container direction="column"
            >
                <Grid item margin={10} >
                    <Grid container spacing={2}>
                        <Box>
                            <Paper
                                variant="outlined"

                                color="error"
                                // onClick={() => deleteHandler()}
                                style={{
                                    background: "transparent",
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onClick={()=>navigate('/home')}
                            >
                                <ArrowBackIcon /><Typography ml={1}>{'Back to Home'}</Typography>
                            </Paper>
                        </Box>
                        <Box style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 10 }}>
                            <Grid item style={{ width: "60%" }}>
                                <StatusStepper data={activitiesData} />
                                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
                                    {(incidentData && diff > 0) && <StopWatch diff={diff} />}
                                </div>
                            </Grid>
                        </Box>

                    </Grid>
                </Grid>

                <Grid item marginLeft={10} marginRight={10}>
                    <Grid container direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}>
                        <Grid item xs={6}>
                            <Paper className={classes.sideGrid}>
                                {incidentData && <MapContainer />}
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.sideGrid}>
                                <Box style={{ padding: 20, marginTop: 10 }}>
                                    <Typography fontSize={16} >
                                        Incident Details
                                    </Typography>
                                    <Grid container mt={1} spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography textTransform={'uppercase'} color={'grey'} fontSize={12}  >
                                                Reported Date
                                            </Typography>
                                            <Typography textTransform={'uppercase'} fontSize={14}  >
                                                {moment(incidentData?.reportedTimestamp).format('LLL')}
                                            </Typography>
                                        </Grid>
                                        {/* <Grid item xs={6}>
                                            <Typography textTransform={'uppercase'} color={'grey'} fontSize={12}  >
                                                Reported Time
                                            </Typography>
                                            <Typography textTransform={'uppercase'} fontSize={14}  >
                                                {moment(new Date(incidentData?.reportedTimestamp)).format('hh:mm:ss A')}
                                            </Typography>
                                        </Grid> */}
                                        <Grid item xs={6}>
                                            <Typography textTransform={'uppercase'} color={'grey'} fontSize={12}  >
                                                Address of Incident
                                            </Typography>
                                            <Typography textTransform={'uppercase'} fontSize={14}  >
                                                {`${incidentData?.crimeAddress}`}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography textTransform={'uppercase'} color={'grey'} fontSize={12}  >
                                                Crime Type
                                            </Typography>
                                            <Typography textTransform={'uppercase'} fontSize={14}  >
                                                {incidentData?.crimeType}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography textTransform={'uppercase'} color={'grey'} fontSize={12}  >
                                                Crime Place
                                            </Typography>
                                            <Typography textTransform={'uppercase'} fontSize={14}  >
                                                {incidentData?.crimePlace}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography textTransform={'uppercase'} color={'grey'} fontSize={12}  >
                                                Description
                                            </Typography>
                                            <Typography textTransform={'uppercase'} fontSize={14}  >
                                                {incidentData?.crimeDescription || '-'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography textTransform={'uppercase'} color={'grey'} fontSize={12}  >
                                                Weapons used
                                            </Typography>
                                            <Typography textTransform={'uppercase'} fontSize={14}  >
                                                {incidentData?.weaponsUsed || '-'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Typography fontSize={16} mt={3} >
                                        Reporter Details
                                    </Typography>
                                    <Grid container mt={1} spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography textTransform={'uppercase'} color={'grey'} fontSize={12}  >
                                                Name
                                            </Typography>
                                            <Typography textTransform={'uppercase'} fontSize={14}  >
                                                {`${incidentData?.reportedByFirstName}, ${incidentData?.reportedByLastName}`}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>

                            </Paper>
                        </Grid>

                    </Grid>
                    <Grid container mt={5} style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                    }} >
                        <Box className={classes.bottomGrid}>
                            <Typography fontSize={24} >
                                Comments
                            </Typography>
                        </Box>
                        <Box>
                            {commentsData && commentsData.map(c => (
                                <Grid item mt={3}>
                                    <Box style={{ display: 'flex', alignItems: 'center' }}><PersonIcon />
                                        <Typography fontSize={18} ml={2} >
                                            {`${c.firstName}, ${c.lastName}`}
                                        </Typography>
                                        <Typography fontSize={12} ml={4} fontStyle={'italic'} >
                                            {`${moment(c.CommentCreatedAt).format('LLL')}`}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography fontSize={14} ml={5} >
                                            {c.body}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Box>
                        {/* comment list comes here */}
                        <Grid item xs={12} mb={3}>
                            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <TextField fullWidth id="standard-basic" variant="standard" label="Start typing.." onChange={(e) => setComment(e.target.value)} value={comment} />
                                <IconButton aria-label="fingerprint" color="primary" onClick={() => postComment()}>
                                    <SendIcon />
                                </IconButton>
                            </Box>
                        </Grid>


                    </Grid>
                    <div ref={bottomRef} />
                </Grid>
            </Grid>

        </Paper>
    )
}
