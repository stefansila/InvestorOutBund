import { useEffect } from 'react'
import './global.css'
import Navbar from './components/Navbar'

function App() {
  useEffect(() => {
    // Wait for DOM to be fully rendered and jQuery to be available
    const initializeAnimations = () => {
      if (typeof window.$ === 'undefined') {
        console.log('jQuery not ready, retrying...');
        setTimeout(initializeAnimations, 100);
        return;
      }

      console.log('Initializing animations...');

      try {
        // Fade in animations
        function fadeIn(el, delay) {
          const elements = window.$(el);
          console.log(`Found ${elements.length} elements for selector: ${el}`);
          
          if (elements.length === 0) return;
          
          elements.css({ "opacity": "0", "transform": "translateY(30px)" });
          
          const handleScroll = () => {
            elements.each(function () {
              const element = window.$(this);
              const elementOffset = element.offset();
              
              if (elementOffset && elementOffset.top) {
                const offsetTop = elementOffset.top - window.$(window).height() + 50;
                if (window.$(window).scrollTop() > offsetTop) {
                  const animationDelay = window.$(window).width() > 992 ? delay : 0;
                  setTimeout(() => {
                    element.css({ 
                      "opacity": "1", 
                      "transform": "translateY(0px)", 
                      "transition": "all 800ms ease" 
                    });
                  }, animationDelay);
                }
              }
            });
          };
          
          window.$(window).on("scroll.fadeIn", handleScroll);
          handleScroll(); // Trigger once
        }

        // Initialize fade-in animations
        fadeIn("[fade-in=true]", 0);
        fadeIn("[fade-in-03=true]", 300);
        fadeIn("[fade-in-06=true]", 600);
        fadeIn("[fade-in-09=true]", 900);

        // Counter animation
        const windowHeight = window.$(window).height();
        const counters = window.$('.counter');
        console.log(`Found ${counters.length} counter elements`);
        
        if (counters.length > 0) {
          const handleCounterScroll = () => {
            const scrollTop = window.$(window).scrollTop();
            counters.each(function() {
              const counter = window.$(this);
              const counterOffset = counter.offset();
              
              if (counterOffset && counterOffset.top && scrollTop + windowHeight > counterOffset.top && !counter.hasClass('s')) {
                console.log('Animating counter:', counter.attr('counter'));
                counter.addClass('s');
                const counterAttr = counter.attr('counter');
                if (counterAttr) {
                  const params = counterAttr.split(',');
                  const [start, end, duration, prefix = '', suffix = ''] = params.map((v, i) => i < 3 ? +v : v.trim());
                  
                  const formatNumber = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  
                  window.$({n: start}).animate({n: end}, {
                    duration: duration * 1000,
                    step: function() { 
                      counter.text(prefix + formatNumber(Math.floor(this.n)) + suffix);
                    },
                    complete: function() { 
                      counter.text(prefix + formatNumber(end) + suffix);
                    }
                  });
                }
              }
            });
          };
          
          window.$(window).on('scroll.counter', handleCounterScroll);
          handleCounterScroll(); // Trigger once
        }

        console.log('Animations initialized successfully');
      } catch (error) {
        console.error('Animation initialization error:', error);
      }
    };

    // Start initialization after a short delay to ensure DOM is ready
    setTimeout(initializeAnimations, 100);

    // Cleanup function
    return () => {
      if (window.$) {
        window.$(window).off('scroll.fadeIn scroll.counter');
      }
    };
  }, []);

  return (
    <div className="App">
      <Navbar />
      
      <section className="section-hero">
        <div className="container container-relative">
          <div fade-in="true" className="gap-24-center hero-wrrapper">
            <h1 className="h1-48">
              <span className="display-block">The World's </span>
              <span>Most Comprehensive Investor Database</span>
            </h1>
            <div className="cta-flex">
              <a 
                href="#" 
                button-action="open-calendly" 
                className="cta-white border-radius-6"
              >
                Demo the product
              </a>
              <a 
                href="#" 
                button-action="open-calendly" 
                className="cta-transparent border-radius-6"
              >
                Book a demo
              </a>
            </div>
          </div>
        </div>
        <div className="bg-wrapper">
          <video 
            src="/assets/4a02fa97fa36bc7fd50745c236fdecaf_3768624.mp4" 
            loop 
            muted 
            autoPlay 
            playsInline 
            className="video-cover"
          />
          <div className="overlay"></div>
          <div className="hero-linear-gradient"></div>
        </div>
      </section>

      <section className="padding-100-100">
        <div className="container">
          <div className="section-content-wrapper content-stretch">
            <div fade-in="true" className="gap-32 mw-45">
              <div className="gap-16">
                <h2 className="h2-36">
                  The most comprehensive, timely, reliable data to help you master the evolving financial market.
                </h2>
                <p>
                  Robust public and private market datasets, meticulously kept and ever-expanding.
                </p>
              </div>
              <div className="cta-flex">
                <a 
                  href="#" 
                  button-action="open-calendly" 
                  className="cta-white-shadow border-radius-6"
                >
                  Demo the product
                </a>
              </div>
            </div>
            <div className="grid-2 mw-50">
              <div fade-in="true" className="box-item border-radius-12">
                <img 
                  src="/assets/f0c0635764545074f92029a3da5acb34_548.svg" 
                  loading="lazy" 
                  alt="Check icon" 
                  className="check-icon"
                />
                <div className="gap-6">
                  <span counter="0,2,1,,tn" className="box-item-no counter">0tn</span>
                  <span>in deployable capital</span>
                </div>
              </div>
              <div fade-in-03="true" className="box-item border-radius-12">
                <img 
                  src="/assets/f0c0635764545074f92029a3da5acb34_548.svg" 
                  loading="lazy" 
                  alt="Check icon" 
                  className="check-icon"
                />
                <div className="gap-6">
                  <span counter="0,10,2,,k" className="box-item-no counter">0k</span>
                  <span>active mandates</span>
                </div>
              </div>
              <div fade-in="true" className="box-item border-radius-12">
                <img 
                  src="/assets/f0c0635764545074f92029a3da5acb34_548.svg" 
                  loading="lazy" 
                  alt="Check icon" 
                  className="check-icon"
                />
                <div className="gap-6">
                  <span counter="0,200,2,,k" className="box-item-no counter">0k</span>
                  <span>active funds</span>
                </div>
              </div>
              <div fade-in-03="true" className="box-item border-radius-12">
                <img 
                  src="/assets/f0c0635764545074f92029a3da5acb34_548.svg" 
                  loading="lazy" 
                  alt="Check icon" 
                  className="check-icon"
                />
                <div className="gap-6">
                  <span counter="0,2,1,,m+" className="box-item-no counter">0m+</span>
                  <span>investors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="section-trusted padding-100-100">
        <div className="container">
          <div className="section-content-wrapper mobile-content-wrap">
            <div fade-in="true" className="table-wrapper mw-55 border-radius-12">
              <div className="table-header">
                <span className="table-title table-title-black">InvestorOutbound</span>
                <span className="table-title">Competitor A</span>
                <span className="table-title">Competitor B</span>
              </div>
              <div className="table-rows-wrapper">
                <div className="table-row">
                  <div className="table-row-title">
                    <img 
                      src="/assets/809ca2697601106e28e706f8d9c0d125_2401.svg" 
                      loading="lazy" 
                      alt="Real-time data icon" 
                      className="table-icon"
                    />
                    <span>Real-time data</span>
                  </div>
                  <div className="table-right">
                    <div className="table-center">
                      <img 
                        src="/assets/4be4aa70955cd90085ce0b3153c9c061_598.svg" 
                        loading="lazy" 
                        alt="Check" 
                        className="table-check-icon"
                      />
                    </div>
                    <div className="table-center">
                      <img 
                        src="/assets/4be4aa70955cd90085ce0b3153c9c061_598.svg" 
                        loading="eager" 
                        alt="Check" 
                        className="table-check-icon"
                      />
                    </div>
                    <div className="table-center">
                      <img 
                        src="/assets/bba6ea282d1c366cc2a785f26d760913_839.svg" 
                        loading="eager" 
                        alt="Cross" 
                        className="table-check-icon"
                      />
                    </div>
                  </div>
                </div>
                <div className="table-row">
                  <div className="table-row-title">
                    <img 
                      src="/assets/4d1e65647ad773af149618b0539c0039_2031.svg" 
                      loading="lazy" 
                      alt="Custom analytics icon" 
                      className="table-icon"
                    />
                    <span>Custom analytics</span>
                  </div>
                  <div className="table-right">
                    <div className="table-center">
                      <img 
                        src="/assets/4be4aa70955cd90085ce0b3153c9c061_598.svg" 
                        loading="lazy" 
                        alt="Check" 
                        className="table-check-icon"
                      />
                    </div>
                    <div className="table-center">
                      <img 
                        src="/assets/bba6ea282d1c366cc2a785f26d760913_839.svg" 
                        loading="eager" 
                        alt="Cross" 
                        className="table-check-icon"
                      />
                    </div>
                    <div className="table-center">
                      <img 
                        src="/assets/4be4aa70955cd90085ce0b3153c9c061_598.svg" 
                        loading="eager" 
                        alt="Check" 
                        className="table-check-icon"
                      />
                    </div>
                  </div>
                </div>
                <div className="table-row">
                  <div className="table-row-title">
                    <img 
                      src="/assets/3a2300053912609bfbe699c6f150cc61_3507.svg" 
                      loading="lazy" 
                      alt="Advanced forecasting icon" 
                      className="table-icon"
                    />
                    <span>Advanced forecasting</span>
                  </div>
                  <div className="table-right">
                    <div className="table-center">
                      <img 
                        src="/assets/4be4aa70955cd90085ce0b3153c9c061_598.svg" 
                        loading="lazy" 
                        alt="Check" 
                        className="table-check-icon"
                      />
                    </div>
                    <div className="table-center">
                      <img 
                        src="/assets/bba6ea282d1c366cc2a785f26d760913_839.svg" 
                        loading="eager" 
                        alt="Cross" 
                        className="table-check-icon"
                      />
                    </div>
                    <div className="table-center">
                      <img 
                        src="/assets/bba6ea282d1c366cc2a785f26d760913_839.svg" 
                        loading="eager" 
                        alt="Cross" 
                        className="table-check-icon"
                      />
                    </div>
                  </div>
                </div>
                <div className="table-row">
                  <div className="table-row-title">
                    <img 
                      src="/assets/1592df958c58965741bc243f6dca7a07_2815.svg" 
                      loading="lazy" 
                      alt="AI-powered insights icon" 
                      className="table-icon"
                    />
                    <span>AI-powered insights</span>
                  </div>
                  <div className="table-right">
                    <div className="table-center">
                      <img 
                        src="/assets/4be4aa70955cd90085ce0b3153c9c061_598.svg" 
                        loading="lazy" 
                        alt="Check" 
                        className="table-check-icon"
                      />
                    </div>
                    <div className="table-center">
                      <img 
                        src="/assets/bba6ea282d1c366cc2a785f26d760913_839.svg" 
                        loading="eager" 
                        alt="Cross" 
                        className="table-check-icon"
                      />
                    </div>
                    <div className="table-center">
                      <img 
                        src="/assets/bba6ea282d1c366cc2a785f26d760913_839.svg" 
                        loading="eager" 
                        alt="Cross" 
                        className="table-check-icon"
                      />
                    </div>
                  </div>
                </div>
                <div className="table-row table-row-last">
                  <div className="table-row-title">
                    <img 
                      src="/assets/2635d4c5680e3d03f5557b3be89cfee5_1508.svg" 
                      loading="lazy" 
                      alt="Global coverage icon" 
                      className="table-icon"
                    />
                    <span>Global coverage</span>
                  </div>
                  <div className="table-right">
                    <div className="table-center">
                      <img 
                        src="/assets/4be4aa70955cd90085ce0b3153c9c061_598.svg" 
                        loading="lazy" 
                        alt="Check" 
                        className="table-check-icon"
                      />
                    </div>
                    <div className="table-center">
                      <img 
                        src="/assets/4be4aa70955cd90085ce0b3153c9c061_598.svg" 
                        loading="eager" 
                        alt="Check" 
                        className="table-check-icon"
                      />
                    </div>
                    <div className="table-center">
                      <img 
                        src="/assets/4be4aa70955cd90085ce0b3153c9c061_598.svg" 
                        loading="eager" 
                        alt="Check" 
                        className="table-check-icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gap-32 mw-39">
              <div fade-in="true" className="gap-16">
                <h2 className="h2-36">Trusted by industry-leading organisations worldwide</h2>
                <p>See how we compare to our competitors across key features and capabilities.</p>
              </div>
              <div fade-in="true" className="cta-flex">
                <a 
                  href="#" 
                  button-action="open-calendly" 
                  className="cta-white-shadow border-radius-6"
                >
                  Demo the product
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="padding-100-100">
        <div className="container">
          <div className="gap-48-center">
            <div className="gap-16-center">
              <h2 fade-in="true" className="h2-36 mobile-mw-256">Simple, Transparent Pricing</h2>
              <p fade-in="true">Choose the plan that's right for you and start exploring your data today.</p>
            </div>
            <div className="pricing-wrapper">
              <div fade-in="true" className="pricing-item">
                <div className="gap-8">
                  <span className="pricing-title">Database Access</span>
                  <span>
                    <span className="price-text">$10,000</span>
                    <span> /year</span>
                  </span>
                  <span className="text-14">Unlimited Database Access</span>
                </div>
                <div className="gap-16">
                  <a href="#" className="cta-pricing border-radius-12">Try Now</a>
                  <div className="custom-list">
                    <div className="custom-list-item">
                      <img 
                        src="/assets/3dc5f6e610226df49b1a9ba057fed634_550.svg" 
                        loading="lazy" 
                        alt="Check" 
                        className="list-check"
                      />
                      <span>Full investor database access</span>
                    </div>
                    <div className="custom-list-item">
                      <img 
                        src="/assets/3dc5f6e610226df49b1a9ba057fed634_550.svg" 
                        loading="lazy" 
                        alt="Check" 
                        className="list-check"
                      />
                      <span>Advanced search & filtering</span>
                    </div>
                    <div className="custom-list-item">
                      <img 
                        src="/assets/3dc5f6e610226df49b1a9ba057fed634_550.svg" 
                        loading="lazy" 
                        alt="Check" 
                        className="list-check"
                      />
                      <span>Detailed investor profiles</span>
                    </div>
                    <div className="custom-list-item">
                      <img 
                        src="/assets/3dc5f6e610226df49b1a9ba057fed634_550.svg" 
                        loading="lazy" 
                        alt="Check" 
                        className="list-check"
                      />
                      <span>Export capabilities</span>
                    </div>
                  </div>
                </div>
              </div>
              <div fade-in-03="true" className="pricing-item pricing-border border-radius-12">
                <div className="gap-8">
                  <span className="pricing-title">Database + Outreach</span>
                  <span>
                    <span className="price-text">$20,000</span>
                    <span> /year</span>
                  </span>
                  <span className="text-14">10,000 Emails Per Day + Unlimited Database Access</span>
                </div>
                <div className="gap-16">
                  <a href="#" className="cta-pricing border-radius-12">Try Now</a>
                  <div className="custom-list">
                    <div className="custom-list-item">
                      <img 
                        src="/assets/3dc5f6e610226df49b1a9ba057fed634_550.svg" 
                        loading="lazy" 
                        alt="Check" 
                        className="list-check"
                      />
                      <span>Everything in Database Access</span>
                    </div>
                    <div className="custom-list-item">
                      <img 
                        src="/assets/3dc5f6e610226df49b1a9ba057fed634_550.svg" 
                        loading="lazy" 
                        alt="Check" 
                        className="list-check"
                      />
                      <span>10,000 daily email limit</span>
                    </div>
                    <div className="custom-list-item">
                      <img 
                        src="/assets/3dc5f6e610226df49b1a9ba057fed634_550.svg" 
                        loading="lazy" 
                        alt="Check" 
                        className="list-check"
                      />
                      <span>AI-powered outreach</span>
                    </div>
                    <div className="custom-list-item">
                      <img 
                        src="/assets/3dc5f6e610226df49b1a9ba057fed634_550.svg" 
                        loading="lazy" 
                        alt="Check" 
                        className="list-check"
                      />
                      <span>Campaign analytics</span>
                    </div>
                    <div className="custom-list-item">
                      <img 
                        src="/assets/3dc5f6e610226df49b1a9ba057fed634_550.svg" 
                        loading="lazy" 
                        alt="Check" 
                        className="list-check"
                      />
                      <span>Template library</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-cta">
        <div className="container container-relative">
          <div className="gap-16 mw-490">
            <h2 fade-in="true" className="h2-36 text-color-white">Making data analysis simple and accessible for everyone.</h2>
            <div fade-in="true" className="cta-flex">
              <a 
                href="#" 
                button-action="open-calendly" 
                className="cta-white border-radius-6"
              >
                Demo the product
              </a>
            </div>
          </div>
        </div>
        <img 
          src="/assets/da18c0d6aee2b63601e1738b32eb4263_27031.avif" 
          loading="eager" 
          alt="Laptop showing data analysis interface" 
          className="laptop-abs"
        />
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-wrapper">
            <div className="footer-top">
              <a href="/" className="">
                <img 
                  src="/assets/8bc54e6fe0731e96ac212efe6f107229_28220.png" 
                  loading="lazy" 
                  alt="InvestorOutbound Logo" 
                  className="footer-logo"
                />
              </a>
              <div className="footer-links-wrapper">
                <div className="footer-links-row">
                  <span className="footer-link-title">Product</span>
                  <a href="#features" data-target="#features" className="footer-link">Features</a>
                  <a href="#pricing" data-target="#pricing" className="footer-link">Pricing</a>
                </div>
                <div className="footer-links-row">
                  <span className="footer-link-title">Support</span>
                  <a href="#" className="footer-link">Documentation</a>
                  <a href="#" button-action="open-calendly" className="footer-link">Contact</a>
                </div>
                <div className="footer-links-row">
                  <span className="footer-link-title">Legal</span>
                  <a href="#" className="footer-link">Privacy Policy</a>
                  <a href="#" className="footer-link">Terms of Service</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© 2025 InvestorOutbound. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
