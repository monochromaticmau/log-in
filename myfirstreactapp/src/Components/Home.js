import React from "react";
import Requests from'../Requests';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
        currentLocation: window.pageYOffset,
        username: '', 
        password: '', 


        needToLogIn: true,

        user:'' ,
    };

    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this) 
    this.onLogInSubmit = this.onLogInSubmit.bind(this) 
  }


  componentDidMount() {
    
  }


  onUsernameChange(e){

      console.log(e.target.value)
      if(e.target.value){
          this.setState({username:e.target.value}, ()=>{ console.log(this.state)})
      }

  }

  onPasswordChange(e){
    console.log(e.target.value)
    if(e.target.value){
        this.setState({password:e.target.value}, ()=>{ console.log(this.state)})
    }

}

resetLogIn(){
    console.log('reset')
    this.setState({username: '' , password: ''})
}

 onLogInSubmit (e){
    e.preventDefault()
     Requests.logIn(this.state.username, this.state.password)
   .then( (response) =>{
     console.log(response )
       if(response){
            console.log(response)
            //document.getElementById("close-log-in").click()
            this.resetLogIn.bind(this)()
            this.setState({username: response.user,needToLogIn: false})

       }else{
        console.log('nope')
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
           <h1> Welcome to The Site! </h1>

            <button onClick={this.getUser.bind(this)} disabled={false}>After Successful Login Check GET User Request and Return req.user </button><div>{this.state.user} </div>
        </div>
     
    );
  }
}

export default Home;
 