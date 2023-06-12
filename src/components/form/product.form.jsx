import * as Yup from "yup";


const productValidationSchema = Yup.object().shape({
    name: Yup.string().required("The Product Name field is required"),
    description: Yup.string().optional(),
    price: Yup.number().required("Please set product price"),
    tags: Yup.array().min(1,'Please enter at least one tag for this product'),
    /*.matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*)[A-Za-z\d]{8,}$/,
        `Must Contain 8 Characters, One Uppercase, One Lowercase,
  One Number and one special case Character [@$!%*#?&-_]`
    ),*/
    owner: Yup.object().required("Please select product owner"),
    category: Yup.object().required("Please select product category"),
});

const productOnSubmit = async (values,{ setSubmitting }) => {
    console.log(values);
    alert(JSON
        .stringify(values))
};

export {productValidationSchema, productOnSubmit}