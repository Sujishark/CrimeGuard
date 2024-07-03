import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';


import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../api/auth';
import { logout } from '../redux/userSlice';
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


export default function SettingModal({ handler, open }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(state => state.user.user)
    const defaultFormState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: '',
        phoneNumber: '',
        houseNameWithNumberBlock: '',
        addressStreet: '',
        // location: ''

    }
    const [formState, setFormState] = React.useState(defaultFormState)

    React.useEffect(() => {
        if (userData) {
            defaultFormState.firstName = userData.firstName
            defaultFormState.lastName = userData.lastName
            defaultFormState.phoneNumber = userData.phoneNumber
            defaultFormState.email = userData.email
            defaultFormState.gender = userData.gender
            defaultFormState.houseNameWithNumberBlock = userData.houseNameWithNumberBlock
            defaultFormState.addressStreet = userData.addressStreet
            defaultFormState.location = userData.location
            setFormState(defaultFormState)

        }
    }, [userData])
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };
    const submitHandler = (e) => {
        updateUser(userData.id, formState).then(s => {
            console.log(s)
            if (s == true) handler()
        })
    }
    const deleteHandler = (e) => {
        deleteUser(userData.id).then(s => {
            console.log(s)
            if (s == true) {
                dispatch(logout())
                navigate('/login')
            }
        })
        // if (success) handler()
    }
    const handleValueChange = (e) => {
        console.log(e.target.name)
        let newState = { ...formState }
        newState[e.target.name] = e.target.value
        setFormState(newState)
    }

    return (
        <div  >
            <Modal
                open={open}
                onClose={handler}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                < Box sx={style} spacing={2} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Grid item xs={8}>
                            <Typography fontSize={20} >
                                User Settings
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button


                                variant="outlined"
                                // sx={{ mt: 3, mb: 2 }}
                                color="error"
                                onClick={() => deleteHandler()}
                            >
                                <DeleteIcon />{'Delete'}
                            </Button>
                        </Grid>
                    </Grid>

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
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
                        </Grid>


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



                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            onClick={() => submitHandler()}
                        >
                            {'Save Changes'}
                        </Button>

                    </Box>
                </Box>
            </Modal>
        </div >
    );
}