
import { Twitter, Linkedin, GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-cyber-indigo/20 bg-deep-black">
      <div className="container mx-auto grid w-full grid-cols-1 items-center gap-4 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Hardcore Business Solutions. Annihilating Inefficiency.</p>
        <nav className="flex justify-center gap-6">
          <Link to="/about" className="text-sm text-gray-400 hover:text-hardcore-pink transition-colors">About</Link>
          <Link to="/pricing" className="text-sm text-gray-400 hover:text-hardcore-pink transition-colors">Pricing</Link>
          <Link to="/privacy" className="text-sm text-gray-400 hover:text-hardcore-pink transition-colors">Privacy Policy</Link>
          <Link to="/contact" className="text-sm text-gray-400 hover:text-hardcore-pink transition-colors">Contact</Link>
        </nav>
        <div className="flex justify-end space-x-4">
          <a href="#" className="text-gray-400 hover:text-hardcore-pink transition-colors" aria-label="Twitter"><Twitter size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-hardcore-pink transition-colors" aria-label="LinkedIn"><Linkedin size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-hardcore-pink transition-colors" aria-label="Git Branch"><GitBranch size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
