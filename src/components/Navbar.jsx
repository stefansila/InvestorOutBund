function Navbar() {
  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar-wrapper">
          <a href="/" className="">
            <img 
              src="/assets/94d7684931a0583435e49b6639fa2340_10285.svg" 
              loading="lazy" 
              alt="Logo" 
              className="navbar-logo"
            />
          </a>
          <div className="navbar-right">
            <a href="#" className="cta-blur border-radius-6">
              Login
            </a>
            <a 
              href="#" 
              button-action="open-calendly" 
              className="inline-link mobile-hide"
            >
              <span>Book a Demo</span>
              <img 
                src="/assets/5719f5b13f168572a3834afffce78e46_643.svg" 
                loading="lazy" 
                alt="Arrow" 
                className="cta-arrow"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar 