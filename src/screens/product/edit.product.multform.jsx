/*
import React from 'react'
import {
    Formiz,
    FormizStep, // Import the FormizStep component
    useForm,
} from '@formiz/core'
import { isEmail } from '@formiz/validations'
import {AppTextField} from "../../components/multistepper/AppTextField";
import {AppCalendar} from "../../components/multistepper/AppCalendar";


export const EditProductMultiForm = ({selectedProduct, showErrorFeedback, showSuccessFeedback}) => {
    const myForm = useForm()

    const handleSubmit = (values) => {
        console.log(values)
    }

    return (
        <Formiz
            connect={myForm}
            onValidSubmit={handleSubmit}
        >
            <form
                noValidate
                // Change the myForm.submit to myForm.submitStep
                onSubmit={myForm.submitStep}
            >

                <FormizStep
                    name="step1" // Split the form with FormizStep
                >
                    <AppTextField
                        name="name"
                        label="Product Name"
                        required="Product Name is required"
                    />
                    <AppCalendar
                        name="promotionStart"
                        label="Promotion Start Date"
                        required="Promotion Start Date is required"
                    />
                </FormizStep>

                <FormizStep
                    name="step2" // Split the form with FormizStep
                >
                    <AppTextField
                        name="email"
                        label="Email"
                        validations={[
                            {
                                rule: isEmail(),
                                message: 'This is not a valid email',
                            },
                        ]}
                    />
                </FormizStep>

                {/!* Update the submit button to allow navigation between steps. *!/}
                {!myForm.isFirstStep && (
                    <button type="button" onClick={myForm.prevStep}>
                        Back
                    </button>
                )}
                {myForm.isLastStep ? (
                    <button type="submit" disabled={!myForm.isValid}>
                        Submit
                    </button>
                ) : (
                    <button type="submit" disabled={!myForm.isStepValid}>
                        Continue
                    </button>
                )}
            </form>
        </Formiz>
    )
}*/
