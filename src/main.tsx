import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './styles.css';
class Boundary extends React.Component<{children:React.ReactNode},{error:boolean}>{state={error:false};static getDerivedStateFromError(){return {error:true};}render(){return this.state.error?<main className="recovery-page"><h1>Let’s get back to the garage.</h1><p>The interface encountered a problem. Your saved progress is still on this device.</p><button onClick={()=>location.reload()}>Reload the workshop</button><button onClick={()=>{if(confirm('Clear this device’s saved progress and restart?')){localStorage.removeItem('autocrew-garage-to-grid-v1');location.hash='#/welcome';location.reload();}}}>Restart with a clean workshop</button></main>:this.props.children;}}
createRoot(document.getElementById('root')!).render(<Boundary><App/></Boundary>);
