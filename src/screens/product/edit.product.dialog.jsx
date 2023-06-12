import * as React from "react";
import * as Yup from "yup";
import ProductStep1 from "../../components/form/productStep1.jsx";
import ProductStep2 from "../../components/form/productStep2.jsx";
import ProductStep3 from "../../components/form/productStep3.jsx";
import ProductMultiStepForm from "./mutiform/ProductMultiStepForm.jsx";
import {useState} from "react";

export default function EditProductDialog({showErrorFeedback, showSuccessFeedback, selectedProduct}) {

    const [mergedValues, setMergedValues] = useState({});
    const initialValues=[
        {
            name:mergedValues['name'] || '',
            description: mergedValues['description'] || '',
            price: mergedValues['price'] || '',
            tags: mergedValues['tags'] || ''
        },
        {
            discountType: mergedValues['discountType'] || '',
            discount: mergedValues['discount'] || '',
            coupon: mergedValues['coupon'] || '',
            promotionStart: mergedValues['promotionStart'] || '',
            promotionEnd:mergedValues['promotionEnd'] || '',
        },
        {
            owner: mergedValues['owner'] || '',
            category: mergedValues['category'] || '',
            effectiveDate: mergedValues['effectiveDate'] || ''
        }
    ];

    console.log(initialValues[0])
    const productValidationSchema=[
        {
            name: Yup.string().required('Please enter name of product'),
            description: Yup.string(),
            price: Yup.string().required('Please enter price of product.'),
            tags: Yup.string().required('Please enter at least one tag.')
        },
        {
            discountType: Yup.string().optional(),
            discount: Yup.string().optional(),
            coupon: Yup.string().optional(),
            promotionStart: Yup.string().optional(),
            promotionEnd:Yup.string().optional(),
        },
        {
            owner: Yup.string().required('Please select the product owner'),
            category: Yup.string().required('Please select product category.'),
            effectiveDate: Yup.string().required('Please enter product effective date.')
        }
    ]

    const stepLabels=[
        {label:'General Info'},
        {label:'Promotion Info'},
        {label:'Classification Info'}
    ]

    const steps=[ProductStep1,ProductStep2,ProductStep3
    ]

    const submit=values=>{
        alert(JSON.stringify(values));
    }

    /*return <>
        <EditProductMultiForm selectedProduct showErrorFeedback showSuccessFeedback/>
    </>
}*/

    return (
        <ProductMultiStepForm
            steps={steps}
            stepLabels={stepLabels}
            initialValues={initialValues}
            validationSchema={productValidationSchema}
            mergedValues={mergedValues}
            setMergedValues={setMergedValues}
            onSubmit={submit}
        />
    );
}
