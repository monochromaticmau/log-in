
import React from "react";
import Requests from'../Requests';


class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
        currentLocation: window.pageYOffset,
        username: '', 
        password: '', 


        needToLogIn: true,

        user:'' ,
        greetings: '',
    };


      
  
  }


  componentDidMount() {
    Requests.checkifLoggedIn().then(response =>{
        console.log(response)
        if(response){
            this.setstate({loggedin:true}, ()=>{
                console.log(this.state)
            })
        }    
    })


  }


  handleClick(e){ 
      Requests.getTest().then(message =>{
          console.log(message)
          if(message){
            this.setState({greetings:'lol'})
          }
     
        })
    } 

 

getUser(e){
  console.log('clicked')
  Requests.checkifLoggedIn().then((response) =>{
      console.log(response)
      if(response){
          this.setState({user:response})
      }
  })

}


  render() {
 
    return (
   
        <div className="container">
            <button onClick={this.handleClick.bind(this)} disabled={this.state.needToLogIn}>Testing FetCH, Only Available if Logged In</button>
            <input type="text" value = {this.state.greeting}/>
        </div>
     
    );
  }
}

export default Data;
