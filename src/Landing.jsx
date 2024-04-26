import React from 'react';

const Landing = () => {
  return (
    <div className="font-sans">
      <header className="header">
        <div className='flex'>
            <img  src="https://www.pngitem.com/pimgs/m/216-2165086_transparent-planning-icon-png-urban-design-planning-icon.png" alt="EcoCity Builder" className="logo w-10 h-10" />
            <h1 className='px-4 text-2xl pt-1 font-semibold'>EcoCity Builder</h1>
        </div>
        <nav className='pr-6'>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <section className="hero">
        <h1 className="text-5xl font-bold">Welcome to EcoCity Builder</h1>
        <p className="mt-4 text-lg">Build sustainable and eco-friendly cities with our innovative platform.</p>
        <button className="mt-8 cta">Get Started</button>
      </section>
      <section id="features" className="features">
        <h2 className="text-3xl font-bold">Key Features</h2>
        <div className="flex flex-wrap justify-center mt-4">
          <div className="feature bg-blue-100 rounded-md hover:shadow-md p-6">
            <h3 className="mt-4 text-xl font-bold pb-4">Advanced Plot Analysis</h3>
            <p>Gain insights into air quality index, temperature, and elevation of your plot.</p>
          </div>
          <div className="feature bg-blue-100 rounded-md hover:shadow-md p-6">
            <h3 className="mt-4 text-xl font-bold pb-4">Interactive Plot Design</h3>
            <p>Design your plot on the map using our interactive canvas.</p>
          </div>
          <div className="feature bg-blue-100 rounded-md hover:shadow-md p-6">
            <h3 className="mt-4 text-xl font-bold pb-4">AI-Powered Design Suggestions</h3>
            <p>Get AI recommendations on how to improve your design for a more sustainable city.</p>
          </div>
        </div>
      </section>
      <section id="about" className="about">
        <h2 className="text-2xl">About EcoCity Builder</h2>
        <p className="mt-4 text-lg">Learn more about our mission and how we are shaping the future of sustainable cities.</p>
      </section>
      <footer className="footer">
        <p>Contact Us: info@ecocitybuilder.com</p>
        <div className="social-links mt-4">
          <a href="https://facebook.com/ecocitybuilder">Facebook</a>
          <a href="https://twitter.com/ecocitybuilder">Twitter</a>
          <a href="https://instagram.com/ecocitybuilder">Instagram</a>
        </div>
        <p className="mt-4">&copy; 2024 EcoCity Builder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
