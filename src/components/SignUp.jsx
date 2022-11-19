import React from 'react'
import { Box, Button, Heading, Image, Input, Spacer, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: "", email: "", password: "", phone: "", address: "", city: "", state: "", pincode: ""
    })
    console.log(user.phone.length);

    let name, value
    const handle = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
    }
    // console.log(user);
    const PostData = async (e) => {
        e.preventDefault();
        const { name, email, password, phone, address, city, state, pincode } = user;
        if (phone.length !== 10) {
            alert("Phone number must be 10 digit")
        }
        else {
            const data =
                await fetch("https://intelvitabackend.herokuapp.com/signin",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                            // 'Access-Control-Allow-Origin': "*",
                        },
                        body: JSON.stringify({
                            name, email, password, phone, address, city, state, pincode
                        })
                    })

            const res = await data.json();
            // console.log(data.status);

            if (data.status === 401 || !res) {
                window.alert("Email is already exist, please use diffrent email")
            }
            else if (data.status === 451) {
                window.alert("Please fill all filled")
                // navigate("/login", { replace: true })
            }
            else if (data.status === 201) {
                window.alert("You have register successfully");
                navigate("/login", { replace: true })
            }
        }
    }
    return (
        <div>
            <Box w='100%' p={4} color='white' >
                <form method='POST'>
                    <Box w='35%' h="1000px" color='black' margin={"auto"} textAlign="center">
                        <Box w='100%' p={4} color='black' margin={"auto"}>
                            <Heading as='h6' size='xs'>
                                Sign In / Sign Up
                            </Heading>
                        </Box>
                        <Box w='100%' p={4} color='black' margin={"auto"}>

                            <Heading as='h5' size='md'>
                                LET’S SIGN IN OR CREATE ACCOUNT WITH YOUR EMAIL!
                            </Heading>
                        </Box>
                        <Box w='100%' p={4} color='black' margin={"auto"}>
                            <Input name='name' value={user.name} variant='flushed' placeholder='Name*' onChange={handle} />
                            <Input name='email' value={user.email} variant='flushed' placeholder='Email*' onChange={handle} />
                            <Input name='password' value={user.password} variant='flushed' placeholder='Password*' onChange={handle} />
                            <Input name='phone' value={user.phone} variant='flushed' placeholder='Phone Number*' onChange={handle} />
                            <Input name='address' value={user.address} variant='flushed' placeholder='Address' onChange={handle} />
                            <Box display={"flex"}>
                                <Input name='city' value={user.city} variant='flushed' placeholder='City' onChange={handle} />
                                <Input name='state' value={user.state} variant='flushed' placeholder='State' onChange={handle} />
                            </Box>
                            <Input name='pincode' value={user.pincode} variant='flushed' placeholder='Pin Code' onChange={handle} />
                        </Box>
                        <Box w='100%' p={4} color='black' margin={"auto"}>
                            <Text fontSize='sm'>By “logging in”, you agree to our Privacy Policy and Terms & Conditions.</Text>
                        </Box>
                        <Button onClick={PostData} marginTop={"10px"} borderRadius={"50px"} bg={"black"} color={"white"}>Sign-Up</Button>
                        <Box marginTop={"10px"} display={"flex"}>
                            <Box borderTop={"1px solid rgb(68,68,68)"} w="45%" marginTop={"10px"}></Box>
                            <Spacer />
                            <Box>Or</Box>
                            <Spacer />
                            <Box borderTop={"1px solid rgb(68,68,68)"} w="45%" marginTop={"10px"}></Box>
                        </Box>
                        <Link to={"/menu"}>
                            <Button marginTop={"10px"} borderRadius={"50px"} border={"1px solid black"} color={"black"} w="90%" bg={"white"}>Skip, Continue As guest</Button>
                        </Link>
                    </Box>
                </form>
            </Box>
        </div>
    )
}

export default Signin



