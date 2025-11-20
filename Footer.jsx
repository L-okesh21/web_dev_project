import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    product: [
      { name: 'Smart Trip Planner', path: '/smart-trip-planner' },
      { name: 'Route Explorer', path: '/route-explorer' },
      { name: 'Budget Optimizer', path: '/budget-optimizer' },
      { name: 'Trip Dashboard', path: '/trip-dashboard' }
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
      { name: 'Contact', path: '/contact' }
    ],
    support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Travel Guides', path: '/guides' },
      { name: 'Community', path: '/community' },
      { name: 'Safety Tips', path: '/safety' }
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Accessibility', path: '/accessibility' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/tripcraft' },
    { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com/tripcraft' },
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com/tripcraft' },
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com/company/tripcraft' }
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <Link to="/homepage" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="Compass" size={24} color="white" strokeWidth={2.5} />
                </div>
                <span className="text-2xl font-bold">TripCraft</span>
              </Link>
              
              <p className="text-secondary-foreground/80 leading-relaxed max-w-md">
                Transform travel planning from stressful research into an intuitive, data-driven experience. Smart travel starts with smart planning.
              </p>

              {/* Newsletter Signup */}
              <div className="space-y-3">
                <h4 className="font-semibold">Stay Updated</h4>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-background/10 border border-border/20 rounded-lg text-secondary-foreground placeholder:text-secondary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    <Icon name="Send" size={16} />
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={`Follow us on ${social?.name}`}
                  >
                    <Icon name={social?.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-8 lg:col-span-3">
              {/* Product Links */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Product</h4>
                <ul className="space-y-3">
                  {footerLinks?.product?.map((link) => (
                    <li key={link?.name}>
                      <Link
                        to={link?.path}
                        className="text-secondary-foreground/80 hover:text-primary transition-colors"
                      >
                        {link?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Links */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Company</h4>
                <ul className="space-y-3">
                  {footerLinks?.company?.map((link) => (
                    <li key={link?.name}>
                      <Link
                        to={link?.path}
                        className="text-secondary-foreground/80 hover:text-primary transition-colors"
                      >
                        {link?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Links */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Support</h4>
                <ul className="space-y-3">
                  {footerLinks?.support?.map((link) => (
                    <li key={link?.name}>
                      <Link
                        to={link?.path}
                        className="text-secondary-foreground/80 hover:text-primary transition-colors"
                      >
                        {link?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-secondary-foreground/60 text-sm">
              © {currentYear} TripCraft. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              {footerLinks?.legal?.map((link) => (
                <Link
                  key={link?.name}
                  to={link?.path}
                  className="text-secondary-foreground/60 hover:text-primary transition-colors text-sm"
                >
                  {link?.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-border/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-secondary-foreground/60">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span>SSL Secured & Privacy Protected</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Globe" size={16} className="text-primary" />
                <span>Available in 156 Countries</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-accent" />
                <span>Trusted by 50,000+ Travelers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;