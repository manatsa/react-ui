import React, {useState} from 'react';;
import {InputField} from "formik-stepper";

const ProductStep1 =()=>{

    return (
        <>
            <div className={'grid'}>
                <InputField label={'Product Name'} name="name" style={{width:'100%'}} />
                <InputField label={'Product Description'} id="description" name="description" style={{width:'100%'}} />
                <InputField label={'Product Price'} name={'price'} style={{width:'100%'}}/>
                <InputField label={'Comma(,) separated product tags'} name={'tags'} style={{width:'100%'}}/>
            </div>


        </>
    )
}

export default ProductStep1;