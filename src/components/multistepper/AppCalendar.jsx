import React from 'react'
import { useField } from '@formiz/core'
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";

export const AppCalendar = (props) => {
    const {
        errorMessage,
        id,
        isValid,
        isSubmitted,
        setValue,
        value,
    } = useField(props)
    const { label, type, required } = props
    const [isTouched, setIsTouched] = React.useState(false)
    const showError = !isValid && (isTouched || isSubmitted)

    const getFormErrorMessage = () => {
        return showError ? <small className="p-error">{errorMessage}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div className={'grid'}>
            <div className={'col-12 md:col-10'}>
                <span className="p-float-label">
                    <Calendar
                        id={id}
                        value={value ?? ''}
                        onChange={e => setValue(e.target.value)}
                        onBlur={() => setIsTouched(true)}
                        style={{width:'100%', marginTop:20}}
                    />
                    <label for={id}>{label}</label>
                </span>
                {getFormErrorMessage()}
            </div>
        </div>
    )
}