import React from "react";
import { HashLink, NavHashLink } from "react-router-hash-link";
import Collapse from "react-bootstrap/Collapse";
import {Button} from "react-bootstrap";
import Requests from'../Requests';


class Nav extends React.Component {
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
    //Colapse Nabar when Scrolling beyond length of navbar ~240px
    //console.log(this.state.currentLocation, 'current')
    window.addEventListener("scroll", () => {
      const navbarElement = document.getElementById("navbarResponsive");
      if (Math.abs(this.state.currentLocation - window.pageYOffset) > 241) {
        this.setState({ currentLocation: window.pageYOffset }, () => {
          if (navbarElement) {
            this.setState({ open: false });
          }
        });
      }
    });
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
    const scrollWithOffset = (el, offset) => {
      const elementPosition = el.offsetTop - offset;
      console.log(el);
      window.scroll({
        top: elementPosition,
        left: 0,
        behavior: "smooth",
      });
    };
    return (
      <nav
        className="navbar navbar-expand-lg bg-primary text-uppercase sticky-top"
        id="mainNav"
      >
        <div className="container">
          <HashLink
            smooth
            to="/"
            className={"navbar-brand js-scroll-trigger text-center"}
          >
            <div>Company</div>
          </HashLink>
          <>
            <Button
              className={
                "navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded"
              }
              variant="secondary"
              onClick={() =>
                this.setState({ open: !this.state.open }, () => {
                  console.log(this.state.open);
                })
              }
              aria-controls="navbarResponsive"
              aria-expanded={this.state.open}
            >
              {" "}
              Menu
              <i className="fas fa-bars"></i>
            </Button>

            <Collapse in={this.state.open}>
              <div className=" navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item mx-0 mx-lg-1"></li>
                  <li className="nav-item mx-0 mx-lg-1">
                    <NavHashLink
                      data-spy="scroll"
                      activeClassName="active"
                      scroll={(el) => scrollWithOffset(el, 70)}
                      smooth
                      to="/data"
                      className={
                        "nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                      }
                    >
                      Data Page
                    </NavHashLink>
                  </li>
                  
                  
                  <li>
                  { this.state.needToLogIn ?  <div
                    className="nav-link login-button py-3 px-0 px-lg-3"
                    role="button"
                    data-toggle="modal"
                    data-target="#loginPopUp"
                  >
                    Login
                  </div> :
                  <div  className="nav-link login-button py-3 px-0 px-lg-3" >Welcome {this.state.username}</div> }
                  </li>
          
                </ul>
              </div>
            </Collapse>




          </>
       

         {/* <!-- Large modal -->*/}

         <div
            className="portfolio-modal modal fade"
            id="loginPopUp"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="logInMoldal1Label"
            aria-hidden="true"
          >
    <div className="modal-dialog modal-md" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <ul className="nav login-nav-tabs">
                            <li className="active"><a  className= 'active' href="#Login" data-toggle="tab">Login</a></li>
                 
                    </ul>
                    <button
                    id="close-log-in"
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">
                    <i className="fas fa-times"></i>
                  </span>
                </button>
                   {/*}  <!-- Nav tabs --> */}
        
            </div>
            <div className="modal-body">
                <div className="row">
                    <div className="col" style={{'borderRight': '1px' , 'dotted' :'#C2C2C2' , 'paddingRight': '30px'}}>
                   
                         {/*<!-- Tab panes -->*/}
                        <div className="tab-content">
                             {/*<!-- Login panes -->*/}
                            <div className="tab-pane active" id="Login">
                            <button onClick={this.getUser.bind(this)}>After Successful Login Check GET User Request and Return req.user </button><div>{this.state.user} </div>
                            <form
                      id="loginForm"
                      className= "form-horizontal"
                      name="sentMessage"
                      onSubmit={this.onLogInSubmit}
                      noValidate
                    >

                      
    
                                <div className="control-group">
                                    <div className="form-group floating-label-form-group controls mb-0 pb-2">
                                    <input
                                        className="form-control"
                                        id="username"
                                        type="text"
                                        placeholder="Username"
                                        required="required"
                                        value={this.state.username}
                                        onChange={this.onUsernameChange}
                                        data-validation-required-message="Please enter valid username."
                                    />
                                    <p className="help-block warning-text-danger"></p>
                                    </div>
                                 </div>
                                <div className="control-group">
                                    <div className="form-group floating-label-form-group controls mb-0 pb-2">
                                    <label>Password</label>
                                    <input
                                        className="form-control"
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        required="required"
                                        value={this.state.password}
                                        onChange={this.onPasswordChange}
                                        data-validation-required-message="Please enter correct password."
                                    />
                                    <p className="help-block warning-text-danger"></p>
                                    </div>
                                </div>
                                <div className="row">
                                 
                                    <div className="col-auto">
                                        <button type="submit" className="btn btn-primary btn-xl uptop-button" id="logInButton">
                                            Submit</button>
                                       
                                    </div>
                                    <div className="col-auto mt-auto ml-auto mr-0 mb-0 text-right pr-0"> <button  className="btn btn-default btn-sm forgot-password "  aria-hidden="true" >Forgot your password?</button></div>
                                    
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


 

        </div>
      </nav>
    );
  }
}

export default Nav;
