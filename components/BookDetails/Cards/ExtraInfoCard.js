import React from 'react'
import {Box, Text, SimpleGrid} from "@chakra-ui/react"
const ExtraInfoCard = () => {
  return (
    <>
        <Box shadow={"lg"} rounded={"lg"}> 
            <Box p={"8"}>
                <Text fontWeight={"bold"} fontSize={"1.5rem"}>More Details</Text>
            </Box>
        </Box>
    </>
  )
}

export default ExtraInfoCard