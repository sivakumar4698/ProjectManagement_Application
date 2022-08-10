import {Navbar} from 'react-bootstrap';
import Logo from '../assets/logo.png'

const Header = () => {
  return (
    <div>
        <Navbar bg="dark" variant="dark">
        <img
              alt=""
              src={Logo}
              width="200"
              height="200" 
            />
            <h2>
            <span style={{color:"#1677C4"}}>Project</span>{' '}
            <span style={{color:"#EA4FB4"}}>Management</span>{' '}
            <span style={{color:"#ffffff"}}>App</span>
            </h2> 
        
      </Navbar>
    </div>
  )
}

export default Header;
