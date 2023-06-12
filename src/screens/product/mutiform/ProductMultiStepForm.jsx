import React, {useState} from 'react';
import {Steps} from "primereact/steps";

const ProductMultiStepForm = ({
                                  steps,
                                  initialValues,
                                  validationSchema,
                                  stepLabels,
                                  onSubmit,
                                  mergedValues,
                                  setMergedValues,
                              }) => {
    const [currentStep, setCurrentStep] = useState(0);

    console.log(typeof initialValues)

    let currentInitValues = initialValues[currentStep];

    let currentValidationSchema = validationSchema[currentStep];

    const isFirstStep = () => {
        return currentStep === 0;
    };

    const submit = currentStep >= initialValues.length - 1 ? true : false;

    const onNextStep = (value) => {
        let mVals = { ...mergedValues, ...value };
        setMergedValues(mVals);
        if (submit) {
            onSubmit(mVals, setCurrentStep);
            setCurrentStep(0);
        } else {
            let nextStep = currentStep + 1;
            setCurrentStep(nextStep);
        }
    };

    const numberOfSteps = Object.keys(steps).length;

    const onBack = () => {
        if (!isFirstStep()) {
            let previousStep = currentStep - 1;
            setCurrentStep(previousStep);
        }
    };

    const currentStepComponent = steps[currentStep];

    if (Object.keys(steps).length !== stepLabels.length) {
        throw new Error(
            "Number of defined steps should match number of step labels."
        );
    }
    return(
        <>
            <div className="grid">
                <div className="col-12">
                    <Steps model={stepLabels} activeIndex={currentStep} onSelect={(e) => setCurrentStep(e.index)} readOnly={false}/>
                </div>
                <div className="col-12">
                    {React.createElement(
                        currentStepComponent,
                        {
                            initValues: currentInitValues,
                            validationSchema: currentValidationSchema,
                            onNextStep: onNextStep,
                            onBack: onBack,
                        },
                        ""
                    )}

                </div>
            </div>

        </>
    )
}

export default  ProductMultiStepForm;

/*

/!**
 * Formik form wizard engine. This component contains the logic to switch the component views, setting the initial values for each view,
 * its validation schema, as well as managing state for each view.
 * @param {object} steps - an object where key is anything numbers, strings, etc and the value is the Component reference eg {0: ExampleComponent}.
 * @param {Array} initialValues - an array of objects where the objects are corresponding to the steps
 * @param {Array} validationSchema - a yup object array containing corrsponding validation objects for each step
 * @param {Array} stepLabels - an array of strings with description for each step( this will appear under steps indicator on each step)
 * @param {function} onSubmit - a function which collects all the values when user hits submit
 * @param {object} mergedValues - the object collecting all the data as user goes through the steps. It has to be a state variable.
 * @param {function} setMergedValues - a function that sets the state variable mergedValues.
 * @returns current view depending on the step the user is on.
 * @author Manatsa Chinyeruse <manatsachinyeruse@gmail.com>
 *!/
export default function FormikStepper({
                                          steps,
                                          initialValues,
                                          validationSchema,
                                          stepLabels,
                                          onSubmit,
                                          mergedValues,
                                          setMergedValues,
                                          defaultStepColor,
                                          completedStepColor,
                                          defaultStepNumberColor,
                                          completedStepNumberColor,
                                          stepNumberFontSize,
                                          stepLabelFontSize,
                                          activeStepColor,
                                      }: FormikStepperProps) {
    const [currentStep, setCurrentStep] = useState(0);

    let currentInitValues = initialValues[currentStep];
    const currentValidationSchema = validationSchema[currentStep];

    const isFirstStep = () => {
        return currentStep === 0;
    };

    const submit = currentStep >= initialValues.length - 1 ? true : false;

    // if (!submit) {
    //   const keys = Object.keys(currentInitValues);
    //   keys.forEach((key) => {
    //     const initVal = currentInitValues[key];
    //     const currentVal = mergedValues[key];
    //     currentInitValues[key] = currentVal ? currentVal : initVal;
    //   });
    // }

    const onNextStep = (value: {}) => {
        let mVals = { ...mergedValues, ...value };
        setMergedValues(mVals);
        if (submit) {
            onSubmit(mVals, setCurrentStep);
            setCurrentStep(0);
        } else {
            let nextStep = currentStep + 1;
            setCurrentStep(nextStep);
        }
    };

    const numberOfSteps = Object.keys(steps).length;

    const onBack = () => {
        if (!isFirstStep()) {
            let previousStep = currentStep - 1;
            setCurrentStep(previousStep);
        }
    };

    const currentStepComponent: any = steps[currentStep];

    if (Object.keys(steps).length !== stepLabels.length) {
        throw new Error(
            "Number of defined steps should match number of step labels."
        );
    }

    return (
        <>
            <View style={styles.stepperContainer}>
                <StepIndicator
                    currentStep={currentStep + 1}
                    labels={stepLabels}
                    completedStepColor={completedStepColor}
                    defaultStepColor={defaultStepColor}
                    completedStepNumberColor={completedStepNumberColor}
                    defaultStepNumberColor={defaultStepNumberColor}
                    activeStepColor={activeStepColor}
                    labelFontSize={stepLabelFontSize}
                    stepNumberFontSize={stepNumberFontSize}
                />
            </View>

            {React.createElement(
                currentStepComponent,
                {
                    initValues: currentInitValues,
                    validationSchema: currentValidationSchema,
                    onNextStep: onNextStep,
                    onBack: onBack,
                },
                ""
            )}
        </>
    );
}
*/
