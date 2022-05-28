import { Autocomplete, Button, Checkbox, FormControlLabel, FormGroup, Step, StepLabel, Stepper, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import "./RequirementsDialog.Module.scss"
// add onchange function
export const RequirementsDialog: React.FC<{}> = () => {
   
    const [requirementsObject, setRequirementsObject] = useState({
        startTime: '',
        endTime: '',
        capacity: '',
        isWhiteboardChecked: false,
        isProjectorChecked: false
    })
    const steps = ['Meeting details', 'Add required assests', 'Select a meeting room'];
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());
    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (activeStep === steps.length - 1) {
            // call the finish function
        }
        else if (isStepSkipped(activeStep)) {
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
    return <div className="outerWrapper">
        <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                    optional?: React.ReactNode;
                } = {};
                return (
                    <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>
        <div  className="flex">
        <div>        
            {activeStep === 0 ?
            <div className="element">
                <TextField label="Start Time" value={requirementsObject.startTime} className='textfield' />
                <TextField label="End Time" value={requirementsObject.endTime} className='textfield' />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[]}
                    renderInput={(params) => <TextField {...params} label="Invite users" className="textfield" />}
                />
            </div>
            :
            activeStep === 1 ?
                <div  className="element">

                    <TextField label="Capacity" value={requirementsObject.capacity} className='textfield' sx={{width:'100%'}}/>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox value={requirementsObject.isWhiteboardChecked} />} label="Whiteboard" />
                            <FormControlLabel control={<Checkbox value={requirementsObject.isProjectorChecked} />} label="Projector" />
                        </FormGroup>
                </div>
                : <div className="element">
                    <div>Suggestions</div><div>Available</div>
                </div>}
        </div>
        <div className="alignCenter">
        <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
        </div>
        </div>
    </div>
}