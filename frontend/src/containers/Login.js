import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createStyles } from '@mui/material/styles';
import { makeStyles } from '@mui/styles'
import { loginUser, registerUser } from '../api/auth';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                CrimeGuard
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            background: "red",
            color: "red"
        },
    }),
);

export default function SignInSide() {
    //redux
    const navigate = useNavigate()
    const userData = useSelector(state => state.user)
    console.log("user Data is ", userData)
    const [location, setLocation] = React.useState(null);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        if (userData.isAuthenticated) {
            navigate('/home')
        }
    }, [userData])
    React.useEffect(() => {
        // Check if geolocation is supported by the browser
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        // Get the user's location
        const successCallback = (position) => {
            const { latitude, longitude } = position.coords;
            console.log({ latitude, longitude })
            setLocation({ latitude, longitude });
        };

        const errorCallback = (error) => {
            setError(`Error getting location: ${error.message}`);
        };

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }, []);


    const classes = useStyles();
    const [signinMode, setSigninMode] = React.useState(true)
    const defaultFormState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        phoneNumber: '',
        houseNameWithNumberBlock: '',
        addressStreet: '',
        location: ''

    }
    const [formState, setFormState] = React.useState(defaultFormState)

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };
    const submitHandler = (e) => {
        if (signinMode) {
            loginUser(formState)
            return
        }
        delete formState.confirmPassword
        formState.location = `${location.latitude} ${location.longitude}`
        console.log(formState)
        registerUser(formState)
    }
    // console.log(formState)
    const handleValueChange = (e) => {
        console.log(e.target.name)
        let newState = { ...formState }
        newState[e.target.name] = e.target.value
        setFormState(newState)
    }

    return (

        <Grid container component="main" sx={{ height: '100vh' }} >
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1563920443079-783e5c786b83?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{
                // background: "#16213E"
            }}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '80%',
                    }}
                >
                    <Box style={{
                        padding: '5px',
                        marginBottom:'20px',
                    }}>
                        <Typography fontSize={48}>Crime<b>Guard</b></Typography>
                    </Box>
                    {/* <img src={logo}/> */}
                    <Typography component="h1" variant="h5">
                        {signinMode ? 'Sign in' : 'Sign up'}
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        {!signinMode && (<Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="fname"
                                    label="First Name"
                                    name="firstName"
                                    variant="filled"
                                    autoFocus
                                    value={formState.firstName}
                                    onChange={(e) => handleValueChange(e)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="lname"
                                    label="Last Name"
                                    name="lastName"
                                    variant="filled"
                                    autoFocus
                                    value={formState.lastName}
                                    onChange={(e) => handleValueChange(e)}
                                />
                            </Grid>
                        </Grid>)}


                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            variant="filled"
                            autoComplete="email"
                            autoFocus
                            value={formState.email}
                            onChange={(e) => handleValueChange(e)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            variant="filled"
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formState.password}
                            onChange={(e) => handleValueChange(e)}

                        />
                        {!signinMode && (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                variant="filled"
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirm_password"
                                autoComplete="current-password"
                                value={formState.confirmPassword}
                                onChange={(e) => handleValueChange(e)}

                            />
                        )}
                        {!signinMode && (
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl variant="filled" sx={{ mt: 2, minWidth: 120, width: '100%' }}>
                                        <InputLabel id="select-label">Gender</InputLabel>
                                        <Select
                                            labelId="select-label"
                                            id="gender"
                                            name="gender"
                                            label="Gender"
                                            value={formState.gender}
                                            onChange={(e) => handleValueChange(e)}
                                        >
                                            <MenuItem value={'male'}>Male</MenuItem>
                                            <MenuItem value={'female'}>Female</MenuItem>
                                            <MenuItem value={'other'}>Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="phoneNumber"
                                        label="Phone Number"
                                        name="phoneNumber"
                                        variant="filled"
                                        autoFocus
                                        value={formState.phoneNumber}
                                        onChange={(e) => handleValueChange(e)}
                                    />
                                </Grid>
                            </Grid>
                        )}
                        {!signinMode && (
                            <Grid container spacing={2}>

                                <Grid item xs={3}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="houseNameWithNumberBlock"
                                        label="Apt Number"
                                        name="houseNameWithNumberBlock"
                                        variant="filled"
                                        autoFocus
                                        value={formState.houseNameWithNumberBlock}
                                        onChange={(e) => handleValueChange(e)}
                                    />
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="addressStreet"
                                        label="Address"
                                        name="addressStreet"
                                        variant="filled"
                                        autoFocus
                                        value={formState.addressStreet}
                                        onChange={(e) => handleValueChange(e)}
                                    />
                                </Grid>
                            </Grid>
                        )}
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            onClick={() => submitHandler()}
                        >
                            {signinMode ? 'Sign In' : ' Sign up'}
                        </Button>
                        <Grid container style={{ display: 'flex', justifyContent: 'center' }}>

                            <Grid item>
                                <Link href="#" onClick={() => setSigninMode(s => !s)} variant="body2">
                                    {signinMode ? "Don't have an account? Sign Up" : "Have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>

    );
}