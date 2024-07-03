import React from 'react'
import styles from '../assets/styles/home.module.css'
import { Card, CardContent, Grid, Paper, Typography } from "@mui/material"
import ActivityCard from '../components/ActivityCard';
import DemoTable from './CrimeTable';

const LatestActivityWindow = () => {
    return (
        <div className={styles.activityTabContainer}>
            <Card sx={{ minWidth: 50, borderRadius: '0px' }} className={styles.activityTabHeader}>
                <CardContent style={{ padding: 10, display: 'flex', justifyContent: 'center' }}>
                    <Typography fontSize={16} style={{ marginBottom: 0, marginTop: 0, paddingBottom: 0 }} >
                        Latest Activity
                    </Typography>
                </CardContent>
            </Card>
            <div className={styles.activityTab}>
                <Paper style={{ background: 'white', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', overflow: 'hidden' }}>
                    <Grid container>
                        <Grid item xs={12} >

                        </Grid>
                        <Grid item xs={12}>
                        </Grid>
                        <Grid item xs={12}>
                            <ActivityCard />
                        </Grid>

                        <Grid item xs={12}>
                            <ActivityCard />
                        </Grid>
                        <Grid item xs={12}><ActivityCard /></Grid>
                        {/* <Grid item xs={12}><ActivityCard /></Grid>
                        <Grid item xs={12}><ActivityCard /></Grid> */}


                    </Grid>
                </Paper>
                {/* <DemoTable /> */}
            </div >
        </div>




    )
}

export default LatestActivityWindow