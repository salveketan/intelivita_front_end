import React, { useEffect } from 'react'
import { Box, Button, Heading, Image, Input, Spacer, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "", password: ""
    })
    let name, value
    const handle = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
    }
    const PostData = async (e) => {
        e.preventDefault();
        const { email, password } = user;
        const data =
            await fetch("https://intelvitabackend.herokuapp.com/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': "*",
                    },
                    body: JSON.stringify({
                        email, password
                    })
                })

        const res = await data.json();

        if (data.status === 401 || !res) {
            window.alert("invalid registration please try again")
            navigate("/signup", { replace: true })
        }
        else if (data.status === 451) {
            window.alert("please fill all filled")
        }
        else if (data.status === 501) {
            window.alert("Server Error")
        }
        else if (data.status === 201) {
            localStorage.setItem("intel-user", JSON.stringify(res))
            window.alert("Your are successfully sign in");
            navigate("/", { replace: true })
            window.location.reload()
        }
    }
    useEffect(() => {
        alert("please login to look the products")
    }, [])
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
                            <Input name='email' value={user.email} variant='flushed' placeholder='Enter Register Email ID*' onChange={handle} />
                            <Input name='password' value={user.password} variant='flushed' placeholder='Password*' onChange={handle} />
                        </Box>
                        <Box w='100%' p={4} color='black' margin={"auto"}>
                            <Text fontSize='sm'>By “logging in”, you agree to our Privacy Policy and Terms & Conditions.</Text>
                        </Box>
                        <Button onClick={PostData} marginTop={"10px"} borderRadius={"50px"} bg={"black"} color={"white"}>Log-In</Button>

                    </Box>
                </form>
            </Box>
        </div>
    )
}

export default Login




