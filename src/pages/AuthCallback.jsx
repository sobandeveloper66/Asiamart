import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { socialLogin } = useCart();
  const [status, setStatus] = useState('verifying'); // 'verifying' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const processOAuthCallback = async () => {
      try {
        // Parse parameters from both URL hash (#access_token=... or #id_token=...) and query string (?access_token=... or ?error=...)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const queryParams = new URLSearchParams(window.location.search);

        const accessToken = hashParams.get('access_token') || queryParams.get('access_token');
        const idToken = hashParams.get('id_token') || queryParams.get('id_token');
        const error = hashParams.get('error') || queryParams.get('error');
        const stateProvider = hashParams.get('state') || queryParams.get('state');

        if (error) {
          setStatus('error');
          setErrorMessage(error === 'access_denied' ? 'Authorization was declined on the provider page.' : `Provider error: ${error}`);
          toast.error('Social login was cancelled or unsuccessful.');
          setTimeout(() => navigate('/'), 2500);
          return;
        }

        if (!accessToken && !idToken) {
          setStatus('error');
          setErrorMessage('No verification tokens were received from the social authentication provider.');
          toast.error('Authentication verification failed: Missing tokens.');
          setTimeout(() => navigate('/'), 2500);
          return;
        }

        const detectedProvider = stateProvider || 'Social Provider';

        // Send tokens directly to our custom Backend Self-API (/api/auth/social) to securely fetch & verify the profile
        const result = await socialLogin(
          detectedProvider,
          null, // Email resolved directly from provider API on backend
          null, // Name resolved directly from provider API on backend
          null, // Avatar resolved directly from provider API on backend
          accessToken,
          idToken
        );

        if (result?.success) {
          setStatus('success');
          toast.success(`Successfully verified with ${detectedProvider}! Welcome back to AsiaMart! 🚀`);
          setTimeout(() => navigate('/'), 1200);
        } else {
          throw new Error('Backend token validation unsuccessful.');
        }
      } catch (err) {
        console.error('OAuth Callback Processing Error:', err);
        setStatus('error');
        setErrorMessage(err.message || 'An error occurred during identity verification.');
        toast.error('Failed to verify identity with provider.');
        setTimeout(() => navigate('/'), 2500);
      }
    };

    processOAuthCallback();
  }, [navigate, location, socialLogin]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-brand-card border border-brand-border rounded-3xl p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
        
        {/* Background glow styling */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        {status === 'verifying' && (
          <div className="space-y-4 py-4">
            <div className="flex justify-center pt-2">
              <FiLoader size={36} className="text-brand-red animate-spin" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-brand-primary tracking-wide">
                Verifying Your Social Identity...
              </h3>
              <p className="text-xs text-brand-secondary leading-relaxed max-w-xs mx-auto">
                Please wait while we validate your security token with the provider and configure your store session.
              </p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4 py-4 animate-in zoom-in-95 duration-200">
            <div className="mx-auto w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20 flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <FiCheckCircle size={36} />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-brand-primary">
                Verification Complete!
              </h3>
              <p className="text-xs text-brand-secondary">
                Your account is authenticated. Redirecting you to the AsiaMart storefront now...
              </p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4 py-4 animate-in zoom-in-95 duration-200">
            <div className="mx-auto w-16 h-16 bg-red-500/10 text-red-500 rounded-full border border-red-500/20 flex items-center justify-center shadow-lg shadow-red-500/10">
              <FiAlertCircle size={36} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-brand-primary">
                Authentication Failed
              </h3>
              <p className="text-xs text-red-400 font-semibold px-2">
                {errorMessage}
              </p>
              <p className="text-[11px] text-brand-secondary">
                Redirecting you back to the home page shortly...
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="mt-4 px-6 py-2.5 bg-brand-card-hover text-brand-primary hover:text-white border border-brand-border rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Return to Home
            </button>
          </div>
        )}

        <div className="pt-4 border-t border-brand-border/60 text-[10px] text-brand-secondary flex items-center justify-center gap-1.5 font-semibold">
          <span>🔒 Protected by OAuth 2.0 Direct API & Self Verification</span>
        </div>

      </div>
    </div>
  );
}
