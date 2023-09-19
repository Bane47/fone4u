import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Navbar.css';
import { ToastContainer, toast } from 'react-toastify';

function MyNavbar() {
  const store = localStorage.UserDetail;
  const navigate = useNavigate();


  return (
    <div >
      <nav class="navbar navbar-expand-lg myNav px-0 py-2 fixed-top ">
        <div class="container">
          {/*      
            <a class="navbar-brand" href="#">
                <img src="https://preview.webpixels.io/web/img/logos/clever-light.svg" class="h-8" alt="..." />
            </a>
            */}
          <Link className='text-decoration-none nav-item nav-link mx-2' to='/'><h3 className='fone4u-title'>Fone4U</h3></Link>
          {/* {store && (
                <Link className='text-decoration-none nav-item nav-link mx-2' to='/dashboard'>Explore</Link>
              )} */}

          <button class="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
            aria-label="Toggle navigation">
            <i class="fa-solid fa-bars-staggered"></i>            </button>

          <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav mx-lg-auto" id="top">


            </div>
            <div class="navbar-nav ms-lg-4" id="right">
            </div>
            <div class="d-flex align-items-lg-center mt-3 mt-lg-0">
              {!store && (
                <>
                  <Link className='border-0  text-decoration-none nav-item nav-link mx-2' to="/register" >Register </Link>

                  <Link className='text-decoration-none border-0  nav-item nav-link mx-2' to="/login" > Login</Link>
                </>
              )}
              {store && (<>
                <button className='text-decoration-none border-0  nav-item nav-link mx-2' onClick={() => {
                  localStorage.removeItem("UserDetail");
                  localStorage.removeItem("Role")
                  navigate('/login');
                  window.location.reload();
                  toast.success("Logging out!")
                }}> Logout</button>

              </>
              )}
              <ToastContainer />
            </div>
          </div>
        </div>
      </nav>

    </div>
  );
}

export default MyNavbar;