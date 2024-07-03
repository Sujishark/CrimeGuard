import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from 'moment'
import { useSelector } from 'react-redux';
import { createCrime } from '../api/crime';
import { useNavigate } from 'react-router-dom';
import SearchBoxAutocomplete from '../components/AutoComplete';
import { useJsApiLoader } from '@react-google-maps/api';
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

// const setup = {
//     googleMapsApiKey: "AIzaSyAIzmJyl1MUmBVX8BI4ay_w0Wi6nhUJa-A",
//     libraries: ["places"]
// }

export default function CrimeModal({ handler, open }) {
    // const { isLoaded } = useJsApiLoader(setup)

    const navigate = useNavigate()
    const [placesList, setPlacesList] = React.useState([])
    const [typesList, setTypeList] = React.useState([])
    const [weaponsList, setWeaponsList] = React.useState([])

    const userData = useSelector(state => state.user.user)

    const places = useSelector(state => state.home.places)
    const types = useSelector(state => state.home.types)
    const weapons = useSelector(state => state.home.weapons)

    React.useEffect(() => {
        if (places) {
            setPlacesList(places)
        }
    }, [places])
    React.useEffect(() => {
        if (weapons) {
            setWeaponsList(weapons)
        }
    }, [weapons])
    React.useEffect(() => {
        setTypeList(types)
    }, [types])
    const defaultFormState = {
        houseNameWithNumberBlock: '',
        addressStreet: '',
        crimeTypeId: '',
        placeId: '',
        weapons: [],
        description: '', //@todo
    }
    const [date, setDate] = React.useState(moment())
    const [time, setTime] = React.useState(moment())

    const [formState, setFormState] = React.useState(defaultFormState)

    const handleValueChange = (e) => {
        let newState = { ...formState }
        newState[e.target.name] = e.target.value
        setFormState(newState)
    }
    // console.log(moment(new Date()).utc().format('yyyy-MM-DD HH:mm:ss'))
    const submitHandler = (e) => {
        const reqBody = {
            reportedTimestamp: `${moment(new Date()).utc().format('yyyy-MM-DD HH:mm:ss')}`,
            mappingAddress: `${formState.houseNameWithNumberBlock}, ${formState.addressStreet}`,
            crimeTypeId: formState.crimeTypeId,
            placeId: formState.placeId,
            reportedBy: userData.id,
            location: `${userData.location.x} ${userData.location.y}`,
            description: formState.description,
            weapons: formState.weapons.join(',')
        }
        createCrime(reqBody).then(data => {
            let { success, id } = data
            console.log(success, id)
            if (success) {
                navigate(`/incident/${id}`)
            }
        })


    }

    return (
        <div  >
            <Modal
                open={open}
                onClose={handler}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style} spacing={2} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography fontSize={20} >
                        Report an incident
                    </Typography>
                    <Grid container style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>

                        <Grid container spacing={2}>
                            <Grid item xs={6} style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <DatePicker label="Date of Crime" value={date} name="reportedDate"
                                    onChange={(v) => setDate(v)} />
                            </Grid>
                            <Grid item xs={6} style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <TimePicker label="Time of Crime" value={time} name="reportedTime"
                                    onChange={(v) => setTime(v)} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="fname"
                                    label="Apartment Number"
                                    name="houseNameWithNumberBlock"
                                    variant="filled"
                                    autoFocus
                                    value={formState.houseNameWithNumberBlock}
                                    onChange={(e) => handleValueChange(e)}
                                />
                            </Grid>
                            <Grid item xs={6}>
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
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl variant="filled" sx={{ mt: 2, minWidth: 120, width: '100%' }}>
                                    <InputLabel id="select-crimeTypeId">Crime Type</InputLabel>
                                    <Select
                                        labelId="select-crimeTypeId"
                                        id="crimeTypeId"
                                        name="crimeTypeId"
                                        label="Crime Type"
                                        value={formState.crimeTypeId}
                                        onChange={(e) => handleValueChange(e)}
                                    >
                                        <MenuItem value={''}>Select</MenuItem>
                                        {typesList && typesList.map(item => (
                                            <MenuItem key={item.id} value={item.id}>{item.description}</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="filled" sx={{ mt: 2, minWidth: 120, width: '100%' }}>
                                    <InputLabel id="select-crimeTypeId">Place Type</InputLabel>
                                    <Select
                                        labelId="select-placeId"
                                        id="placeId"
                                        name="placeId"
                                        label="Place Type"
                                        value={formState.placeId}
                                        onChange={(e) => handleValueChange(e)}
                                    >
                                        <MenuItem value={''}>Select</MenuItem>
                                        {placesList && placesList.map(item => (
                                            <MenuItem key={item.id} value={item.id}>{item.description}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="filled" sx={{ mt: 2, minWidth: 120, width: '100%' }}>
                                    <InputLabel id="select-crimeTypeId">Weapons Used</InputLabel>
                                    <Select
                                        multiple
                                        labelId="select-weapon"
                                        id="weapons"
                                        name="weapons"
                                        label="Place Type"
                                        value={formState.weapons}
                                        onChange={(e) => handleValueChange(e)}
                                    >
                                        <MenuItem value={'Street'}>Select</MenuItem>
                                        {weaponsList && weaponsList.map(item => (
                                            <MenuItem key={item.id} value={item.id}>{item.description}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        {/* <Grid container>
                            <Grid item>
                                {<SearchBoxAutocomplete />}
                            </Grid>
                        </Grid> */}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="desc"
                                    label="Brief description of the crime.."
                                    name="description"
                                    multiline
                                    variant="filled"
                                    rows={4}
                                    autoFocus
                                    value={formState.description}
                                    onChange={(e) => handleValueChange(e)}
                                />
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                color="primary"
                                onClick={() => submitHandler()}
                            >
                                {'Create'}
                            </Button>
                        </Grid>
                    </Grid>

                </Box>
            </Modal>
        </div >
    );
}