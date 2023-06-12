import React, {useEffect, useRef, useState} from 'react';
import {useJwt} from "react-jwt";
import {useNavigate} from "react-router-dom";
import showToast from "../../notifications/showToast";
import {Toast} from "primereact/toast";
import {ProgressSpinner} from "primereact/progressspinner";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import {ContextMenu} from "primereact/contextmenu";
import {Toolbar} from "primereact/toolbar";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import {InputText} from "primereact/inputtext";
import {Dialog} from "primereact/dialog";
import {Typography} from "@mui/material";
import {useFetch} from "../../query/useFetch.js";
import {getLogin} from "../../auth/check.login";
import EditProductDialog from "./edit.product.dialog.jsx";
import ProductMultiStepForm from "./mutiform/ProductMultiStepForm.jsx";

const Product =  () => {


    const {token, login}=getLogin();
    const {isExpired} =useJwt(token);
    const navigate=useNavigate();
    const toast= useRef(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [openNewProductDialog, setOpenNewProductDialog] = useState(false);
    const [openViewProductDialog, setOpenViewProductDialog] = useState(false);
    const [products, setProducts]=useState([]);
    const dt = useRef(null);
    const cm = useRef(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
        description: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
        industry: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] }
    });

    const logins=login ? JSON.parse(login) : null;

    useEffect((e)=>{
        if(!token || isExpired ){
            navigate("/")
        }else {
            if(!logins || !logins['privileges']?.includes('ADMIN')){
                console.log("Not admin")
                showToast(toast,'error','Error 401: Access Denied','You do not have access to this resource!');
                window.history.back()
            }
        }
    },[])



    const {data, error, isError, isLoading }=useFetch('/api/products/',token,['get','product']);

    useEffect(()=>{
        let prods=data?.map(d=>{
            return {...d,userName:d?.createdBy?.userName,category:d?.category?.name, owner:d?.owner?.name};
        })
        setProducts(prods)
    },[data])

    const cols = [
        { field: 'name', header: 'CATEGORY NAME' },
        { field: 'description', header: 'CATEGORY DESCRIPTION' },
        { field: 'category', header: 'CATEGORY NAME' },
        { field: 'owner', header: 'OWNER NAME' },
        { field: 'active', header: 'ACTIVE' },
        { field: 'dateCreated', header: 'DATE CREATED' },
        { field: 'userName', header: 'CREATED BY' },

    ];

    const viewProduct = () => {
        setOpenViewProductDialog(true)
    };

    const editProduct = () => {
        setOpenNewProductDialog(true)
    };

    const deleteProduct = () => {
        toast.current.show({ severity: 'info', summary: 'product deleted', detail: selectedProduct.name });
    };

    const openNew=()=>{
        setOpenNewProductDialog(true);
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className={'flex flex-row justify-content-between'}>
                <h2 className="m-0">Products List</h2>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" variant={'standard'}/>
                </span>
            </div>
        );
    };

    const menuModel = [
        { label: 'View', icon: 'pi pi-fw pi-hourglass', command: () => viewProduct() },
        { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => editProduct() },
        { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => deleteProduct() }
    ];

    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(exportColumns, products);
                doc.save('products.pdf');
            });
        });
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="" rounded icon="pi pi-plus" severity="success" onClick={openNew}/>
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <div style={{width:'100%', flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                <Button type="button" label={'CSV'} icon="pi pi-download " severity="success" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
                &nbsp;&nbsp;
                <Button type="button" label={'PDF'} icon="pi pi-download" severity="danger" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
            </div>)
    };

    const refresh=(data)=>{
        setProducts(data);
    }

    const showSuccessFeedback=()=>{
        showToast(toast,'success','Operation Feedback','Operation completed successfully!')
    }

    const showErrorFeedback=(error)=>{
        showToast(toast,'error','Operation Feedback',error.toString())
    }


    return (
        <>
            <Toast ref={toast} position={'center'} />
            {isLoading && <div className="card flex justify-content-center"> <ProgressSpinner style={{zIndex:1000}}/></div>}
            <div className="card">
                <Tooltip target=".export-buttons>button" position="bottom" />
                <ContextMenu model={menuModel} ref={cm} onHide={()=>null} />
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}/>
                <DataTable ref={dt} value={products}  tableStyle={{ minWidth: '50rem' }} paginator={true} rows={5} header={renderHeader}
                           filters={filters} filterDisplay="menu" globalFilterFields={['name', 'description',  'industry']}
                           onContextMenu={(e) => cm.current.show(e.originalEvent)} stripedRows={true}
                           rowsPerPageOptions={[5,10, 25, 50]} dataKey="id" resizableColumns showGridlines
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                           contextMenuSelection={selectedProduct} onContextMenuSelectionChange={(e) => setSelectedProduct(e.value)}>
                    {cols?.map((col,index)=>{
                        return <Column key={index}  field={col?.field} header={col?.header} />
                    })
                    }

                </DataTable>

                <Dialog header={()=>{
                    return <div style={{textDecoration:'underline', textDecorationColor:'forestgreen', paddingLeft:20, paddingRight:10}}>
                        <Typography component="h1" variant="h3" color={'green'}>
                            {selectedProduct && selectedProduct?.id ? selectedProduct?.name:"New Product"}
                        </Typography>
                    </div>
                }} visible={openNewProductDialog} style={{ width: '70vw' }} onHide={() => setOpenNewProductDialog(false)}>
                    {/*<EditProductDialog selectedProduct={selectedProduct} setEditProductDialogVisible={setOpenNewProductDialog} openNewUserDialog={openNewProductDialog}
                                        token={token} setProductsData={refresh} showSuccessFeedback={showSuccessFeedback} showErrorFeedback={showErrorFeedback}/>*/}
                    {/*<MultiStepForm  />*/}
                    <EditProductDialog />
                    {/*<ProductMultiStepForm />*/}

                </Dialog>

                <Dialog header={()=>{
                    return <div style={{textDecoration:'underline', textDecorationColor:'forestgreen', paddingLeft:20, paddingRight:10}}>
                        <Typography component="h1" variant="h3" color={'green'}>
                            {'VIEW CATEGORY :: '+selectedProduct?.name}
                        </Typography>
                    </div>
                }} visible={openViewProductDialog} style={{ width: '60vw' }} onHide={() => setOpenViewProductDialog(false)}>
                    <div className={'grid'}>
                        <div className="col-6 sm:col-6">Product Name</div>
                        <div className="col-6 sm:col-6">{selectedProduct?.name}</div>

                        <div className="col-6 sm:col-6">Product Active</div>
                        <div className="col-6 sm:col-6">{selectedProduct?.active?.toString()}</div>

                        <div className="col-6 sm:col-6">Date Created</div>
                        <div className="col-6 sm:col-6">{selectedProduct?.dateCreated}</div>

                        <div className="col-6 sm:col-6">Created By</div>
                        <div className="col-6 sm:col-6">{selectedProduct?.createdBy?.userName?.toString()}</div>
                    </div>
                </Dialog>

            </div>
        </>
    )
}

export default Product;
