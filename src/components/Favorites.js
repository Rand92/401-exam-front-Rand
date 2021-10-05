import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap'
 class Favorites extends Component {
     constructor(props){
         super(props);
         this.state={
             favItem:[],
             showUpdate:false,
             id:'',
             title:'',
             description:'',
             toUSD:'',
             image_url:''
         }
     }
     componentDidMount = () => {
        axios.get(`http://${process.env.REACT_APP_BACKEND}/getFavorites`).then(
            res => { this.setState({ favItem: res.data }) }
        )
    }
    handleDelete=(id)=>{
        let config={
            method:"DELETE",
            baseURL: `http://${process.env.REACT_APP_BACKEND}`,
            url:`deleteFavorit/${id}`
        }
        axios(config).then(response=>{
            this.setState({favItem:response.data})
        })
    }
    // handleID=(e)=>{this.setState({id:e.target.value})};
    handleTitle=(e)=>{this.setState({title:e.target.value})};
    handleDescription=(e)=>{this.setState({description:e.target.value})}
    handleToUSD=(e)=>{this.setState({toUSD:e.target.value})};
    handleImage_url=(e)=>{this.setState({image_url:e.target.value})};
    handleUpdate=(title,description,toUSD,image_url)=>{
this.setState({
    title:title,
        image_url: image_url,
        toUSD: toUSD,
        description:description,
        showUpdate:true
})
    }
    handelUpdatedForm=(id)=>{
        let config={
            method:"PUT",
            baseURL: `http://${process.env.REACT_APP_BACKEND}`,
            url:`updateFavorites/${id}`,
            data:{
                title:this.state.title,
                image_url:this.state.image_url,
                toUSD:this.state.toUSD,
                description:this.state.description
            }
        }
        axios(config).then(res=>{
            this.setState({favItem:res.data})
        })
    }
    render() {
        return (
            <div>{this.state.showUpdate? <br></br> :
                <Form onSubmit={()=>{this.handelUpdatedForm(this.stat.id)}}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>title</Form.Label>
                  <Form.Control type="text" placeholder={this.state.title} onChange={this.handleTitle} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>image</Form.Label>
                  <Form.Control type="text" placeholder={this.state.image_url} onChange={this.handleImage_url} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>tousd</Form.Label>
                  <Form.Control type="text" placeholder={this.state.toUSD} onChange={this.handleToUSD} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label></Form.Label>
                  <Form.Control type="text" placeholder="title" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>description</Form.Label>
                  <Form.Control as="textarea"placeholder={this.state.description} onChange={this.handleDescription} rows={3} />
                </Form.Group>
                <Button variant="success" type="submit">Update</Button>
              </Form>
            }
            {
                this.stat.favItem.map(item=>{
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
                                <Button variant="primary" onClick={() => { this.handleDelete(item._id) }}>Remove</Button>
                                <Button variant="primary" onClick={() => { this.handleUpdate(item._id,item.title,item.toUSD,item.image_url,item.description) }}>updat</Button>

                            </Card.Body>
                        </Card> 
                    </>
                })
            }
                
            </div>
        )
    }
}

export default Favorites
