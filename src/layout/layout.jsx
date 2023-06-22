import React from 'react';
import AppFooterBar from "./AppFooterBar.jsx";
import AppMenu from "./AppMenu";
import {useNavigate} from "react-router-dom";
import Login from "../screens/login";
import {Container} from "@mui/material";
import Box from "@mui/material/Box";

const Layout =({children})=>{

    return (
           <>
               <Box component={'div'} style={{width:'100%'}} className={' flex justify-content-center align-items-start'}>
                   <Box component={'div'} sx={{mb:5}} className={'flex justify-content-center'}>
                        <AppMenu />
                   </Box>
                   <div style={{width:'100%'}} className={'flex justify-content-center align-self-start align-items-start'} >
                       <Container className={'w-full   sm:p-0'}>
                           {children}
                       </Container>
                   </div>
               </Box>

           </>

    )
}

export default Layout;