
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HardcoreButton from './HardcoreButton';
import { Button } from './ui/button';
import { cleanupAuthState } from '@/utils/authUtils';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');

  const handleTabChange = (value: string) => {
    if (value === 'signin' || value === 'signup') {
      setActiveTab(value);
      setEmail('');
      setPassword('');
    }
  };

  const handleSignInWithGoogle = async () => {
    cleanupAuthState();
    await supabase.auth.signOut({ scope: 'global' }).catch(console.error);

    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/profile-setup`,
      },
    });
    if (error) {
      toast.error(error.message);
      setLoading(false);
    }
    // On success, Supabase handles the redirection.
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    cleanupAuthState();
    await supabase.auth.signOut({ scope: 'global' }).catch(console.error);

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Signed in successfully!');
      onOpenChange(false);
      window.location.href = '/profile-setup';
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    cleanupAuthState();
    await supabase.auth.signOut({ scope: 'global' }).catch(console.error);
    
    setLoading(true);
    const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
            emailRedirectTo: `${window.location.origin}/profile-setup`
        }
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.info('Check your email for the confirmation link to complete setup.');
      onOpenChange(false);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-deep-black text-white border-cyber-indigo">
        <DialogHeader>
          <DialogTitle className="font-heading text-hardcore-pink">AUTHENTICATE</DialogTitle>
          <DialogDescription className="text-gray-400">
            Access your profile or create a new one to get started.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="signin" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-cyber-indigo/50">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email-signin">Email</Label>
                <Input id="email-signin" type="email" placeholder="m@example.com" value={email} onChange={e => setEmail(e.target.value)} required className="bg-cyber-indigo/20" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signin">Password</Label>
                <Input id="password-signin" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="bg-cyber-indigo/20"/>
              </div>
              <HardcoreButton type="submit" disabled={loading} className="w-full">
                {loading ? 'Authenticating...' : 'Sign In'}
              </HardcoreButton>
            </form>
            <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-deep-black px-2 text-gray-500">Or</span>
                </div>
            </div>
            <Button variant="outline" className="w-full mt-2 bg-transparent text-white hover:bg-cyber-indigo/20 hover:text-white border-cyber-indigo/50" onClick={handleSignInWithGoogle} disabled={loading}>
              Sign In with Google
            </Button>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input id="email-signup" type="email" placeholder="m@example.com" value={email} onChange={e => setEmail(e.target.value)} required className="bg-cyber-indigo/20"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">Password</Label>
                <Input id="password-signup" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="bg-cyber-indigo/20"/>
              </div>
              <HardcoreButton type="submit" disabled={loading} className="w-full">
                {loading ? 'Creating Profile...' : 'Sign Up'}
              </HardcoreButton>
            </form>
            <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-deep-black px-2 text-gray-500">Or</span>
                </div>
            </div>
            <Button variant="outline" className="w-full mt-2 bg-transparent text-white hover:bg-cyber-indigo/20 hover:text-white border-cyber-indigo/50" onClick={handleSignInWithGoogle} disabled={loading}>
              Sign Up with Google
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
