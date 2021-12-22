import React,{useState,useEffect} from "react";

import  Axios  from "axios";
import {random,commerce,datatype} from "faker";
import {Container,Col,Row} from "reactstrap"
import CartItem from "./CartItem";

const apiKey="INSERT_YOUR_KEY_HERE";
const localurl="http://myjson.dit.upm.es/api/bins/aoi9"
const url="https://api.pexels.com/v1/search?query=laptop&per_page&page=1";

const BuyPage=({addInCart}) => {
    const [product,setProduct]= useState([])

    // const fetchPhotos= async()=>{
    //     const response= await Axios.get(url,{
    //         header:{
    //             Authorization:apiKey
    //         }
    //     })
    const fetchPhotos= async()=>{
        const {data}= await Axios.get(localurl)
        const {photos}= data;

        const allProduct= photos.map(photo=>({
            smallImage:photo.src.medium,
            tinyImage:photo.src.tiny,
            productName:random.word(),
            productPrice:commerce.price(),
            id:datatype.uuid()
        }));

        setProduct(allProduct)
    }
    

    useEffect(()=>{
        fetchPhotos()
    },[])

    return(
        <Container fluid>
            <h1 className="text-success text-center">
                Buy Page
            </h1>
            <Row>
                {product.map(product=>(
                    <Col md={4} key={product.id}>
                        <CartItem product={product} addInCart={addInCart}></CartItem>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
export default BuyPage