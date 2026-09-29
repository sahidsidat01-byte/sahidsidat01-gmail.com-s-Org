import React, { useState } from 'react';
import { UserProfile, signInUser, signUpUser, signOutUser } from '../services/supabaseService';
import { isSupabaseConfigured } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onUserChange: (user: UserProfile | null) => void;
  onOpenSupabaseSetup: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChange,
  onOpenSupabaseSetup,
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const { user, error } = await signInUser(email, password);
    setIsLoading(false);

    if (error) {
      setErrorMessage(error);
    } else if (user) {
      onUserChange(user);
      setSuccessMessage(`Welcome back, ${user.fullName}!`);
      setTimeout(() => {
        onClose();
      }, 1200);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const { user, error } = await signUpUser(email, password, fullName, phone);
    setIsLoading(false);

    if (error) {
      setErrorMessage(error);
    } else if (user) {
      onUserChange(user);
      setSuccessMessage(`Profile created! Welcome to Rose Garden.`);
      setTimeout(() => {
        onClose();
      }, 1400);
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
    onUserChange(null);
    setSuccessMessage('Signed out successfully.');
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[85] bg-black/65 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-auto max-h-[90vh] overflow-y-auto border border-[#dec1b2]/40">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#0D234C] text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[24px] text-[#e87524]" style={{ fontVariationSettings: "'FILL' 1" }}>
                account_circle
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#9a4600] uppercase tracking-wider block">
                Patron Access
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b1c1c]">
                {currentUser ? 'Guest Profile' : authMode === 'signin' ? 'Sign In to Rose Garden' : 'Create Patron Account'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f0eded] hover:bg-[#e4e2e1] text-[#574237] flex items-center justify-center active:scale-90"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* If Signed In */}
        {currentUser ? (
          <div className="space-y-5">
            <div className="p-4 bg-[#f6f3f2] rounded-2xl border border-[#dec1b2]/40 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#ffdbcb] text-[#763300] font-serif text-lg font-bold flex items-center justify-center">
                {currentUser.fullName ? currentUser.fullName.slice(0, 2).toUpperCase() : 'RG'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-base font-bold text-[#1b1c1c] truncate">
                    {currentUser.fullName}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    currentUser.role === 'admin' ? 'bg-[#0D234C] text-white' : 'bg-[#ffdbcb] text-[#341100]'
                  }`}>
                    {currentUser.role}
                  </span>
                </div>
                <span className="text-xs text-[#8a7265] block truncate mt-0.5">{currentUser.email}</span>
                {currentUser.phone && (
                  <span className="text-xs text-[#574237] block mt-0.5">{currentUser.phone}</span>
                )}
              </div>
            </div>

            <div className="p-3.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs space-y-1">
              <span className="font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Authenticated Patron Account
              </span>
              <p className="text-[11px] opacity-90">
                Your reservations, table dining bookings, and custom butler requests synchronize with Supabase cloud.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={onOpenSupabaseSetup}
                className="flex-1 py-2.5 rounded-xl border border-[#dec1b2] text-[#574237] hover:bg-[#f6f3f2] text-xs font-semibold"
              >
                Supabase Settings
              </button>
              <button
                onClick={handleSignOut}
                className="flex-1 py-2.5 rounded-xl bg-red-800 text-white hover:bg-red-900 text-xs font-bold active:scale-95 transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Mode Switcher */}
            <div className="grid grid-cols-2 p-1 bg-[#f0eded] rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signin');
                  setErrorMessage(null);
                }}
                className={`py-2 rounded-lg transition-all ${
                  authMode === 'signin' ? 'bg-white text-[#1b1c1c] shadow-xs' : 'text-[#8a7265]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signup');
                  setErrorMessage(null);
                }}
                className={`py-2 rounded-lg transition-all ${
                  authMode === 'signup' ? 'bg-white text-[#1b1c1c] shadow-xs' : 'text-[#8a7265]'
                }`}
              >
                Register
              </button>
            </div>

            {/* Form */}
            <form onSubmit={authMode === 'signin' ? handleSignIn : handleSignUp} className="space-y-3 text-xs">
              {authMode === 'signup' && (
                <>
                  <div>
                    <label className="font-bold text-[#8a7265] uppercase block mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Lady Evelyn Montgomery"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3f2] text-sm text-[#1b1c1c] focus:outline-none focus:bg-white border border-transparent focus:border-[#dec1b2]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#8a7265] uppercase block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98200 12345"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3f2] text-sm text-[#1b1c1c] focus:outline-none focus:bg-white border border-transparent focus:border-[#dec1b2]"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="font-bold text-[#8a7265] uppercase block mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patron@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3f2] text-sm text-[#1b1c1c] focus:outline-none focus:bg-white border border-transparent focus:border-[#dec1b2]"
                />
              </div>

              <div>
                <label className="font-bold text-[#8a7265] uppercase block mb-1">Password</label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3f2] text-sm text-[#1b1c1c] focus:outline-none focus:bg-white border border-transparent focus:border-[#dec1b2]"
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 text-red-800 text-xs border border-red-200">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs border border-emerald-200">
                  {successMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-[#9a4600] hover:bg-[#763300] text-white font-bold text-xs sm:text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <span>{authMode === 'signin' ? 'Sign In as Patron' : 'Complete Registration'}</span>
                )}
              </button>
            </form>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={onOpenSupabaseSetup}
                className="text-[11px] text-[#8a7265] hover:text-[#9a4600] underline"
              >
                Supabase Backend & Database Credentials
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
