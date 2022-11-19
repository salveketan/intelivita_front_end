import { Box, Button, Center, Heading, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const Cart = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const user = JSON.parse(localStorage.getItem("intel-user")) || [];
    const userId = user?.userExist._id;
    // console.log(userId);

    useEffect(() => {
        axios.get(`https://intelvitabackend.herokuapp.com/cart/${userId}`)
            .then(function (response) {
                setData(response.data);
            })
    }, [])

    let amount = 0
    data.forEach(e => {
        amount += (e.salePrice);
    });


    const remove = async (id) => {
        await fetch(`https://intelvitabackend.herokuapp.com/cart/${id}`, {
            method: "DELETE",
        })
        alert("Item is remove from cart")
        window.location.reload()
    }

    const checkout = () => {
        alert("added to orders succesfully")
        //remove all item from cart
        axios.delete(`https://intelvitabackend.herokuapp.com/deleteall/${userId}`)
            .then((r) => console.log(r))
            .catch((e) => console.log({ error: e.message }))
        navigate("/")
    }

    return (
        <div>
            <Box ml={"10%"} mt={"2%"}>
                <Heading as='h4' size='md' color={"white"}>
                    Total :  ₹ {amount}
                </Heading>
                <Button colorScheme='teal' variant='outline' onClick={() => checkout()}>
                    CheckOut
                </Button>
            </Box>
            <SimpleGrid columns={[1, null, 2]} spacing='40px' width={"80%"} m={"auto"} mt={"2%"}>
                {data.map((e) =>

                    <Center color='white'>
                        <Box key={e.id}>
                            <img style={{ borderRadius: "10px" }} src={e.image} alt="img" />
                            <h4>{e.name}</h4>
                            <p> ₹{e.salePrice}</p>
                            <Button colorScheme='teal' variant='outline' onClick={() => remove(e._id)}>
                                Remove from cart
                            </Button>
                        </Box>
                    </Center>
                )}
            </SimpleGrid>
        </div>
    )
}

export default Cart
