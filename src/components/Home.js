import React, { Component } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: []
        }
    }
    componentDidMount = () => {
        axios.get(`http://${process.env.REACT_APP_BACKEND}/getFavorites`).then(
            res => { this.setState({ allData: res.data }) }
        )
    }
    handleSubmit = (title,image_url,toUSD,description) => {
let config={
    method:"POST",
    baseURL:`http://${process.env.REACT_APP_BACKEND}`,
    url:"/AddToFavorite",
    data:{
        title:title,
        image_url: image_url,
        toUSD: toUSD,
        description:description
    }
} 
axios(config);
    }
    render() {
        return (
            <>{
                this.state.allData.map(item => {
                    return <>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={item.image_url} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>
                                    {item.toUSD}
                                    <br />
                                    {item.description}
                                </Card.Text>
                                <Button variant="primary" onClick={() => { this.handleSubmit(item.title,item.image_url,item.toUSD,item.description) }}>Add To watch liste</Button>
                            </Card.Body>
                        </Card>   </>
                })
            }


            </>
        )
    }
}

export default Home
