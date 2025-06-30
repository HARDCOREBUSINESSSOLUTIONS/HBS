
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import AuthModal from './AuthModal';
import { toast } from 'sonner';
import HardcoreButton from './HardcoreButton';
import { cleanupAuthState } from '@/utils/authUtils';

const navItems = [
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Live Agent', href: '/agent' },
  { name: 'Agent Builder', href: '/agent-builder' },
  { name: 'Reports', href: '/reports' },
  { name: 'Contact', href: '/contact' },
];

const Header = () => {
  const { user, loading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleSignOut = async () => {
    cleanupAuthState();
    const { error } = await supabase.auth.signOut({ scope: 'global' });
    if (error) {
      toast.error('Sign out failed: ' + error.message);
    } else {
      toast.success('Signed out successfully.');
    }
    window.location.href = '/';
  };

  return (
    <>
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
            {user && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `text-sm font-semibold uppercase tracking-wider transition-colors ${
                    isActive ? 'text-hardcore-pink' : 'text-gray-300 hover:text-white'
                  }`
                }
              >
                Admin
              </NavLink>
            )}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="w-24 h-8 bg-cyber-indigo/20 animate-pulse rounded-md" />
            ) : user ? (
              <>
                <span className="text-sm text-gray-300 hidden lg:block">{user.email}</span>
                <HardcoreButton onClick={handleSignOut} size="default" className="px-4 py-2 text-sm">
                   Sign Out
                </HardcoreButton>
              </>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-hardcore-pink px-4 py-2 text-sm font-bold text-white shadow-lg shadow-hardcore-pink/20 transition-all hover:bg-white hover:text-hardcore-pink hover:shadow-hardcore-pink/40"
              >
                 <span className="absolute -inset-full top-0 block -translate-x-full -skew-x-12 transform bg-white/30 transition-all duration-500 group-hover:translate-x-0 group-hover:skew-x-0" />
                 <span className="relative">GET STARTED</span>
              </button>
            )}
          </div>
        </div>
      </header>
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
};

export default Header;
