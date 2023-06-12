import React, {useState} from 'react';
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {classNames} from "primereact/utils";

const ProductStep1 =({setMergedValues, initValues, validationSchema, handleSubmit, formik})=>{

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className={'grid'}>

                    <div className={'col-12'}>
                        <span className="p-float-label">
                            <InputText id="name" name="name" value={formik.values['name']} onChange={(e) => {formik.setFieldValue('name', e.target.value);}}
                                       className={classNames({ 'p-invalid': isFormFieldInvalid('name') })} style={{width:'100%'}}
                            />
                            <label htmlFor="name">Product Name</label>
                        </span>
                        {getFormErrorMessage('description')}
                    </div>

                    <div className={'col-12'}>
                        <span className="p-float-label">
                            <InputText id="description" name="description" value={formik.values['description']} onChange={(e) => {formik.setFieldValue('description', e.target.value);}}
                                           className={classNames({ 'p-invalid': isFormFieldInvalid('description') })} style={{width:'100%'}}
                            />
                            <label htmlFor="description">Product Description</label>
                        </span>
                        {getFormErrorMessage('description')}
                    </div>

                    <div className={'col-12'}>
                        <span className="p-float-label">
                            <InputText id="price" name="price" value={formik.values['price']} onChange={(e) => {formik.setFieldValue('price', e.target.value);}}
                                       className={classNames({ 'p-invalid': isFormFieldInvalid('price') })} style={{width:'100%'}}
                            />
                            <label htmlFor="price">Product Price</label>
                        </span>
                        {getFormErrorMessage('description')}
                    </div>

                    <div className={'col-12'}>
                        <span className="p-float-label">
                            <InputText id="tags" name="tags" value={formik.values['tags']} onChange={(e) => {formik.setFieldValue('tags', e.target.value);}}
                                       className={classNames({ 'p-invalid': isFormFieldInvalid('tags') })} style={{width:'100%'}}
                            />
                            <label htmlFor="tags">Comma (,) Separated Product Tags</label>
                        </span>
                        {getFormErrorMessage('tags')}
                    </div>

                </div>
                <div className="col-12 flex justify-content-end p-5">
                    <Button severity={'success'} label={'Next'} type={'submit'} />
                </div>
            </form>
        </>
    )
}

export default ProductStep1;