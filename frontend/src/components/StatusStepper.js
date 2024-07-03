import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import moment from 'moment'
import Typography from '@mui/material/Typography';


export default function StatusStepper({ data }) {
    const defaultSteps = ['Created', 'In progress'];
    const [steps,setSteps]= React.useState(defaultSteps)
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [stepSet, setStepSet] = React.useState({})
    const isStepOptional = (step) => {
        // return step === 1;
    };

    React.useEffect(() => {
        // 'Resolved', 'False Alarm'
        let newSet = {}
       if(data){
        data.map((d) => {
            if([d.status]=='False Alarm') defaultSteps.push('False Alarm')
            newSet[d.status] = d.createdAt
        })
        console.log(steps.length)
        if(defaultSteps.length==2) defaultSteps.push('Resolved')
        setSteps(defaultSteps)
        setStepSet(newSet)
       }
    }, [data])
    console.log(stepSet)
    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                   
                    if (stepSet[label]) {
                        stepProps.completed = true;
                        labelProps.optional = (
                            <Typography variant="caption">{moment(stepSet[label]).format('yyyy-MM-DD, HH:mm')}</Typography>
                        );
                    }
                       
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    );
}