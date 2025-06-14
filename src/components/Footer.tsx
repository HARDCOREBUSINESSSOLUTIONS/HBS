
import { Twitter, Linkedin, GitBranch } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-cyber-indigo/20 bg-deep-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Hardcore Business Solutions. Annihilating Inefficiency.</p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-hardcore-pink transition-colors"><Twitter size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-hardcore-pink transition-colors"><Linkedin size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-hardcore-pink transition-colors"><GitBranch size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
