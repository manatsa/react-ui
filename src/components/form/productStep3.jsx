import React, {useState} from 'react';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import {SelectButton} from "primereact/selectbutton";
import {InputField, RadioField, SelectField} from "formik-stepper";
import {AutoComplete} from "primereact/autocomplete";

const ProductStep3 =({errors, values, handleChange})=>{

    const discountTypes=[
        {label: 'Percentage', value:'percent'},
        {label: 'Literal', value: 'val'},
        {label:'Coupon', value:'coupon'}
    ]

    return (
        <>
            <div className={'grid'}>
                <div className="col-12">
                    <AutoComplete   placeholder={'Discount Type'} name={'discountType'} options={discountTypes} value={values['discountType']} onChange={handleChange} />
                    <InputText style={{width:'100%'}}  placeholder={'Product Discount'} value={values['discount']} name={'discount'} onChange={handleChange} />
                    <InputText placeholder={'Coupon'} name="coupon" style={{width:'100%'}} value={values['coupon']} onChange={handleChange} />
                    <Calendar dateFormat={'dd/mm/yy'} id="promotionStart" name="promotionStart" style={{width:'100%'}} value={values['promotionStart']} />
                    <Calendar dateFormat={'dd/mm/yy'} id="promotionEnd" name="promotionEnd" style={{width:'100%'}} value={values['promotionEnd']} />
                </div>
            </div>
        </>
    )
}

export default ProductStep3;