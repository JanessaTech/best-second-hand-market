
import React, { useEffect, useState } from 'react'
import { Box, Container, Paper, Step, StepContent, StepLabel, Stepper, Typography, Link} from '@mui/material'
import {HeaderHeight} from '../../../common/constant'
import logger from '../../../common/Logger'
import {GlobalVariables} from '../../MainLayout'
import {Link as RouterLink } from "react-router-dom"
import Upload from './Upload'
import CreateNFT from './CreateNFT'
import Done from './Done'

const steps = [
    {
        label: 'Upload a file to IPFS',
        description: `The file is the one you want to show others how your product looks like.`
    },
    {
        label: 'Mint a NFT',
        description: 'Choose the chain and smart contract address you want to mint a nft with'
    },
    {
        label: 'Congratulation! A new NFT is created',
        description: `Check out My NFTs to edit the new NFT you have created above. 
                      You may not see it immediately, because the time you see it in My NFTs depends on
                      when your data is mined into chain. Please keep patient. Ask admin for help if you don't see it after 10mins`
    }
]

export default function Mint2() {
    logger.debug('[Mint] rendering...')
    const {eventsBus, notifyAlertUpdate, notifyHideMenu, notifyNetworkCheckAndBuy, notityMintCall} = React.useContext(GlobalVariables)
    const [activeStep, setActiveStep] = useState(1)
    const [ipfsURL, setIpfsURL] = useState('')

    useEffect(() => {
        logger.debug('[Mint] call notifyHideMenu in useEffect')
        notifyHideMenu()
      }, [])
    
    const handleNext = (data) => {
        if (data && data.ipfs) {
            setIpfsURL(data.ipfs)
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
      
    return (
        <Box component="main" sx={{width:1}}>
            <Box sx={{width:1, height: HeaderHeight}}></Box>
            <Container maxWidth="sm" sx={{my:5}}>
                <Box>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        <Step key={steps[0].label}>
                            <StepLabel>
                                {steps[0].label}
                            </StepLabel>
                            <StepContent>
                                <Typography>{steps[0].description}</Typography>
                                <Upload handleNext={handleNext} notifyAlertUpdate={notifyAlertUpdate}/>
                            </StepContent>
                        </Step>
                        <Step key={steps[1].label}>
                            <StepLabel>
                                {steps[1].label}
                            </StepLabel>
                            <StepContent>
                                <Typography>{steps[1].description}</Typography>
                                <CreateNFT 
                                    ipfsURL={ipfsURL} 
                                    eventsBus={eventsBus}
                                    handleNext={handleNext} 
                                    notifyAlertUpdate={notifyAlertUpdate} 
                                    notifyNetworkCheckAndBuy={notifyNetworkCheckAndBuy}
                                    notityMintCall={notityMintCall}
                                    />
                            </StepContent>
                        </Step>
                        <Step key={steps[2].label}>
                            <StepLabel>
                                {steps[2].label}
                            </StepLabel>
                            <StepContent>
                                <Typography>{steps[2].description}</Typography>
                                <Done handleNext={handleNext}/>
                            </StepContent>
                        </Step>
                    </Stepper>
                    {
                        activeStep === steps.length &&
                        <Box>
                            <Paper square elevation={0} sx={{ p: 3 }}>
                                <Typography>All steps completed - check <Link component={RouterLink} to='/profile/nfts' color={'primary.main'}>My NFTs</Link></Typography>
                            </Paper>
                        </Box>
                    }
                    
                </Box>
            </Container>
        </Box>
    )
}