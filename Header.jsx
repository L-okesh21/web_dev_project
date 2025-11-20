import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Smart Planner', path: '/smart-trip-planner', icon: 'Brain' },
    { name: 'Route Explorer', path: '/route-explorer', icon: 'Map' },
    { name: 'Budget Optimizer', path: '/budget-optimizer', icon: 'Calculator' },
    { name: 'Trip Dashboard', path: '/trip-dashboard', icon: 'BarChart3' },
  ];

  const secondaryItems = [
    { name: 'Account Settings', path: '/account-settings', icon: 'Settings' },
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link 
          to="/homepage" 
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Icon name="Compass" size={20} color="white" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold text-foreground">TripCraft</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-muted ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-subtle'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.name}</span>
            </Link>
          ))}
          
          {/* More Menu */}
          <div className="relative group">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:text-primary hover:bg-muted transition-all duration-300">
              <Icon name="MoreHorizontal" size={16} />
              <span>More</span>
            </button>
            
            {/* Dropdown */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-high opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="py-2">
                {secondaryItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`flex items-center space-x-3 px-4 py-2 text-sm hover:bg-muted transition-colors duration-200 ${
                      isActivePath(item?.path)
                        ? 'text-primary bg-muted' :'text-popover-foreground'
                    }`}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center space-x-3">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Button variant="default" size="sm" className="bg-cta hover:bg-cta/90">
            Start Planning
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-200"
          aria-label="Toggle mobile menu"
        >
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="px-4 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            {secondaryItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            <div className="pt-4 mt-4 border-t border-border space-y-2">
              <Button variant="outline" fullWidth onClick={() => setIsMobileMenuOpen(false)}>
                Sign In
              </Button>
              <Button variant="default" fullWidth className="bg-cta hover:bg-cta/90" onClick={() => setIsMobileMenuOpen(false)}>
                Start Planning
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;