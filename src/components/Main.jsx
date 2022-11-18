import { Box, Button, Link, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import featuredIn from "../modules/featuredIn.png"

const MainPage = () => {
    return (
        <div>

            <SimpleGrid columns={[1, null, 2]} spacing='40px' >
                <Box w={"90%"} mt={"60px"} ml={["25px", null, "80px"]}>
                    <Box fontFamily={'Poppins'} font-style={"normal"} fontWeight={"800"} fontSize={["19px", null, "38px"]} lineHeight={"63px"} color={"#D2C2FF"}>
                        It's taking us a bit longer than usual to get your order to you. <span style={{ color: "#A6D4FF", textDecorationLine: 'underline' }}>Thank you for your patience!</span>
                    </Box>
                    <Box mt={"50px"}>
                        <Button as={Link} href={"/studio"} w={"60%"} borderRadius={"30px"} bg={"#F3A6FF"}>
                            <Text fontSize={["12px", null, "15px"]}>Let Start Shoping!</Text>
                        </Button>
                    </Box>
                </Box>
                <Box p={"10px"} w={"45%"} mt={"50px"} ml={["90px", null, "180px"]} >
                    <img style={{ borderRadius: "100px" }} src={"https://images.unsplash.com/photo-1667477159482-db346abdcd56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDk3fFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"} alt="artwork" />
                </Box>
            </SimpleGrid>
            <Box w={"90%"} m={"auto"} mt={"33px"}  >
                <img src={featuredIn} alt="featuredIn" />
            </Box>
        </div>
    )
}

export default MainPage