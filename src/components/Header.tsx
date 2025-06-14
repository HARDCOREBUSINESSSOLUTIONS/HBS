
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Live Agent', href: '/agent' },
  { name: 'Reports', href: '/reports' },
  { name: 'Contact', href: '/contact' },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyber-indigo/20 bg-deep-black/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center">
          <span className="font-heading text-2xl tracking-wider text-white">HARDCORE</span>
          <span className="font-heading text-2xl text-hardcore-pink">.</span>
        </NavLink>
        <nav className="hidden space-x-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `text-sm font-semibold uppercase tracking-wider transition-colors ${
                  isActive ? 'text-hardcore-pink' : 'text-gray-300 hover:text-white'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
        <a href="#" className="hidden md:inline-flex items-center justify-center rounded-md bg-hardcore-pink px-4 py-2 text-sm font-bold text-white shadow-lg shadow-hardcore-pink/20 transition-all hover:bg-white hover:text-hardcore-pink hover:shadow-hardcore-pink/40">
          GET STARTED
        </a>
      </div>
    </header>
  );
};

export default Header;
