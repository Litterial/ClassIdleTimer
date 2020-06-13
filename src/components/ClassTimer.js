import React, {Component,createRef} from 'react';
import IdleTimer from 'react-idle-timer';
import Modal from 'react-modal';

class ClassTimer extends Component{
    static displayName = ClassTimer.name;
    constructor(props){
        super(props)
        this.state={
            modal:false,
            seconds:0,
            minutes:2
        }
        this.idleTimer = null
        this.modalTimer = createRef();
    }

    countDown = () => setInterval(this.changeClock,1000);    
    toggleModal = () =>this.setState({modal:!this.state.modal});
    idleUser =() => {
      this.setState({modal:true});
      this.modalTimer.current = setTimeout( this.stopCountdown,2*60*1000)
    }
    stopCountdown = () =>    
      {   
          this.countDown = () => clearInterval(this.changeClock);
          this.setState({modal:false,minutes:2,seconds:0});
        }
      
    changeClock = ()  => { 
      if(!this.state.modal)
      {
          clearInterval(this.changeClock);
          return;
      }
       const remainder = (this.state.seconds - 1) % 60;
       const modulo = (remainder >= 0)? remainder : remainder + 60;
       const minutes = (modulo === 59)? this.state.minutes -1 : this.state.minutes;
       this.setState({minutes:minutes,seconds:modulo});
   }

    
    render()
    {   const {seconds,minutes,modal} = this.state
        const digits = (seconds<10)? `0${seconds}` :seconds
        return(
        <div>
            <IdleTimer ref={ref => {this.idleTimer = ref}} onIdle={this.idleUser} timeout={3*60*1000}>
                <Modal isOpen={modal} onAfterOpen={this.countDown}>
                <div>
                    <h1>Modal is open</h1>
                    <h1>{minutes}:{digits}</h1>
                    <button onClick={this.stopCountdown}>Close Modal</button>
                </div>
                </Modal>
                <button onClick={this.toggleModal}>Open Modal</button>
            </IdleTimer>

        </div>)
    }
}

export default ClassTimer;