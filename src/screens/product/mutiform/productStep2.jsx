import React, {useState} from 'react';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import {SelectButton} from "primereact/selectbutton";
import {InputField, RadioField, SelectField} from "formik-stepper";

const ProductStep2 =()=>{

    const discountTypes=[
        {label: 'Percentage', value:'percent'},
        {label: 'Literal', value: 'val'},
        {label:'Coupon', value:'coupon'}
    ]

    return (
        <>
            <div className={'grid'}>
                <div className="col-12">
                    <SelectField   label={'Discount Type'} name={'discountType'} options={discountTypes} />
                    <InputField style={{width:'100%'}}  label={'Product Discount'} type={'text'} name={'discount'} className={'col-12'} />
                    <InputField label={'Coupon'} name="coupon" style={{width:'100%'}} />
                    <InputField type={'date'} dateFormat={'dd/mm/yy'} id="promotionStart" name="promotionStart" style={{width:'100%'}} placeholder={'Promotion Start Date'} />
                    <InputField type={'date'} dateFormat={'dd/mm/yy'} id="promotionEnd" name="promotionEnd" style={{width:'100%'}} placeholder={'Promotion End Date'} />
                </div>
            </div>
        </>
    )
}

export default ProductStep2;