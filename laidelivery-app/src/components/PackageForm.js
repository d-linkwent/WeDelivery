import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "./controls/Controls";
import { useForm, Form } from './useForm';
import * as packageService from "../services/packageService";


const modeItems= [
    { id: 'pickup', title: 'Pickup' },
    { id: 'dropoff', title: 'Dropoff' },
    { id: 'other', title: 'Other' },
]

const initialFValues = {
    packageId: 0,
    size: '',
    weight: '',
    content: '',
    mode: 'pickup',
    centerId: '',
    PickupDate: new Date('December 22, 2021 03:30:00'),
    isMember: false,
}

export default function PackageForm() {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('size' in fieldValues)
            temp.size = fieldValues.size ? "" : "This field is required."
        if ('content' in fieldValues)
            temp.content = fieldValues.content ? "" : "This field is required."
        if ('weight' in fieldValues)
            temp.weight = fieldValues.weight.length > 0 ? "" : "Minimum 2 numbers required."
        if ('catagoryId' in fieldValues)
            temp.catagoryId = fieldValues.catagoryId.length !== 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);
    values.centerId = undefined

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            packageService.insertPackage(values)
            resetForm()
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>

                    <Controls.Input
                        name="content"
                        label="Package Content"
                        value={values.content}
                        onChange={handleInputChange}
                        error={errors.content}
                    />
                    <Controls.Input
                        label="Weight(lb)"
                        name="weight"
                        value={values.weight}
                        onChange={handleInputChange}
                        error={errors.weight}
                    />
                    <Controls.Input
                        name="size"
                        label="Size"
                        value={values.size}
                        onChange={handleInputChange}
                        error={errors.size}
                    />

                    <Controls.Input
                        label="Ship from "
                        name="shipFrom"
                        value={values.shipFrom}
                        onChange={handleInputChange}
                        error={errors.shipFrom}
                    />
                    <Controls.Input
                        label="Ship to "
                        name="shipTo"
                        value={values.shipTo}
                        onChange={handleInputChange}
                        error={errors.shipTo}
                    />


                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        name="Mode"
                        label="Mode"
                        value={values.mode}
                        onChange={handleInputChange}
                        items={modeItems}
                    />

                    <Controls.DatePicker
                        name="PickupDate"
                        label="Pickup Time"
                        value={values.PickupDate}
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        name="isMember"
                        label="I am a member"
                        value={values.isMember}
                        onChange={handleInputChange}
                    />

                    <div>
                        <Controls.Button
                            htmlType="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}