import { Box, Button, Center, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Studio = () => {
    const user = JSON.parse(localStorage.getItem("intel-user")) || [];
    const userId = user?.userExist._id;

    const [data, setData] = useState([]);

    

    useEffect(() => {
        axios.get('https://intelvitabackend.herokuapp.com/products')
            .then(function (response) {
                setData(response.data.product);
            })
    }, [])

    const addToCart = (e) => {
        const { name, salePrice, image, customerReviewCount } = e
        axios.post(`https://intelvitabackend.herokuapp.com/cart`, {
            name, salePrice, image, customerReviewCount, userId
        })
            .then((response) => {
                alert("item added to cart")
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    }
    const handle = (e) => {
        if (e.target.value == "hightolow") {
            axios.get('https://intelvitabackend.herokuapp.com/products')
                .then(function (response) {
                    let ans = response.data.product.sort((a, b) => b.salePrice - a.salePrice)
                    setData(ans)
                })
        }
        else if (e.target.value == "lowtohigh") {
            axios.get('https://intelvitabackend.herokuapp.com/products')
                .then(function (response) {
                    let ans = response.data.product.sort((a, b) => a.salePrice - b.salePrice)
                    setData(ans)
                })
        }
    }

    return (
        <div>
            <div>
                <Box ml={"10%"} mt={"2%"}>
                    <select name="select" id="" onClick={handle}>
                        <option value="">All</option>
                        <option value="hightolow">high to low</option>
                        <option value="lowtohigh">low to high</option>
                    </select>
                </Box>
            </div>
            <SimpleGrid columns={[1, null, 2]} spacing='40px' width={"80%"} m={"auto"} mt={"2%"}>
                {data.map((e) =>

                    <Center color='white'>
                        <Box key={e.id}>
                            <img style={{ borderRadius: "10px" }} src={e.image} alt="img" />
                            <h4>{e.name}</h4>
                            <p> ₹{e.salePrice}</p>
                            <Button colorScheme='teal' variant='outline' onClick={() => addToCart(e)}>
                                Add To Cart
                            </Button>
                        </Box>
                    </Center>
                )}
            </SimpleGrid>
        </div>
    )
}

export default Studio
