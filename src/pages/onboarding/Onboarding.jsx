// Onboarding.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import OwnerDetailsForm from './OwnerDetailsForm';
import StoreDetailsForm from './StoreDetailsForm';
import { signup } from '../../Redux Toolkit/features/auth/authThunk';
import { createStore, getStoreByAdmin } from '../../Redux Toolkit/features/store/storeThunks';
import { getUserProfile } from '../../Redux Toolkit/features/user/userThunks';
import { useNavigate } from 'react-router';

const Onboarding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isCompleted } = useSelector((state) => state.onboarding);

  const [step, setStep] = useState(1);
  const [fadeIn, setFadeIn] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    storeName: '',
    storeType: '',
    storeAddress: '',
  });
  const [localError, setLocalError] = useState(null);
  const [localLoading, setLocalLoading] = useState(false);

  // Normalize any error shape to string
  const normalizeError = (err, fallback) => {
    if (!err) return fallback;
    if (typeof err === 'string') return err;
    if (typeof err === 'object') {
      return err?.message || err?.error || err?.data?.message || JSON.stringify(err) || fallback;
    }
    return fallback;
  };

  useEffect(() => {
    const checkOnboarding = async () => {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        setLocalLoading(true);
        try {
          const userRes = await dispatch(getUserProfile(jwt)).unwrap();
          if (userRes && userRes.role === 'ROLE_STORE_ADMIN') {
            try {
              const storeRes = await dispatch(getStoreByAdmin(jwt)).unwrap();
              if (storeRes && storeRes.id) {
                navigate('/store');
                return;
              } else {
                setStep(2);
              }
            } catch (err) {
              setStep(2);
            }
          }
        } catch (err) {
          localStorage.removeItem('jwt');
        } finally {
          setLocalLoading(false);
        }
      }
    };
    checkOnboarding();
    // eslint-disable-next-line
  }, [dispatch]);

  const handleStepSubmit = async (stepData) => {
    setLocalError(null);
    const updatedFormData = { ...formData, ...stepData };
    setFormData(updatedFormData);

    if (step === 1) {
      setLocalLoading(true);
      try {
        const signupRes = await dispatch(signup({
          fullName: updatedFormData.fullName,
          email: updatedFormData.email,
          password: updatedFormData.password,
          role: 'ROLE_STORE_ADMIN',
        })).unwrap();

        // Handle both response shapes: { jwt } or { data: { jwt } }
        const jwt = signupRes?.data?.jwt || signupRes?.jwt;
        if (jwt) {
          localStorage.setItem('jwt', jwt);
        }

        setLocalError(null);
        setFadeIn(false);
        setTimeout(() => {
          setStep(2);
          setFadeIn(true);
        }, 150);
      } catch (err) {
        setLocalError(normalizeError(err, 'Signup failed'));
      } finally {
        setLocalLoading(false);
      }

    } else if (step === 2) {
      setLocalLoading(true);
      try {
        await dispatch(createStore({
          brand: updatedFormData.storeName,
          storeType: updatedFormData.storeType,
          storeAddress: updatedFormData.storeAddress,
        })).unwrap();
        navigate('/store');
      } catch (err) {
        setLocalError(normalizeError(err, 'Store creation failed'));
      } finally {
        setLocalLoading(false);
      }
    }
  };

  const handleStepBack = () => {
    if (step > 1) {
      setLocalError(null);
      setFadeIn(false);
      setTimeout(() => {
        setStep(step - 1);
        setFadeIn(true);
      }, 150);
    }
  };

  useEffect(() => {
    if (isCompleted) {
      alert('Onboarding completed successfully!');
    }
  }, [isCompleted]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <OwnerDetailsForm
            initialValues={{
              fullName: formData.fullName,
              email: formData.email,
              password: formData.password,
              confirmPassword: formData.confirmPassword,
            }}
            onSubmit={handleStepSubmit}
            onBack={handleStepBack}
          />
        );
      case 2:
        return (
          <StoreDetailsForm
            initialValues={{
              storeName: formData.storeName,
              storeType: formData.storeType,
              storeAddress: formData.storeAddress,
            }}
            onSubmit={handleStepSubmit}
            onBack={handleStepBack}
          />
        );
      default:
        return null;
    }
  };

  // Safe error string — never pass object to React
  const displayError = localError || error;
  const errorString = displayError
    ? normalizeError(displayError, 'Something went wrong')
    : null;

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-primary/5 via-white to-indigo-50">
      <div className="flex min-h-[100dvh]">

        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-primary to-purple-600 text-white p-4 z-20">
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-lg font-bold leading-tight">Welcome to Your POS System</h1>
            <p className="text-white/80 text-xs mt-1">Set up your business profile in minutes</p>
          </div>
        </div>

        {/* Left Side - Desktop only */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 via-[#047857] to-[#022c22] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
          </div>
          <div className="relative z-10 flex flex-col justify-center items-center text-white px-12">
            <div className="text-center max-w-md">
              <div className="mb-8">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-6 leading-tight">
                Welcome to Your
                <span className="block text-yellow-300">POS System</span>
              </h1>
              <p className="text-lg text-primary/80 mb-8 leading-relaxed">
                Set up your business profile and start managing your store efficiently.
                It only takes a few minutes to get everything configured.
              </p>
              <div className="space-y-4 text-left">
                {[
                  'Easy inventory management',
                  'Real-time sales tracking',
                  'Secure payment processing',
                ].map((feat) => (
                  <div key={feat} className="flex items-center">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-primary/80">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-start lg:items-center justify-center px-4 sm:px-6 lg:px-8 pt-40 pb-8 lg:pt-8 lg:h-screen lg:overflow-y-auto">
          <div className="w-full max-w-md">

            {/* Progress */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Step {step} of 2
                </h2>
                <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {step === 1 ? 'Owner Details' : 'Store Details'}
                </span>
              </div>
              {/* Mobile step bars */}
              <div className="flex gap-2 mb-3 lg:hidden">
                {[1, 2].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      s <= step ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-600 to-[#022c22] h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(step / 2) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Error — always string, never object */}
            {errorString && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg shadow-sm text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{errorString}</span>
                </div>
              </div>
            )}

            {/* Loading overlay */}
            {localLoading && (
              <div className="fixed inset-0 flex items-center justify-center bg-white/60 z-50">
                <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}

            {/* Card */}
            <Card className="w-full shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6 pt-4 sm:pt-6">
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
                  {step === 1 ? 'Create Your Account' : 'Store Information'}
                </CardTitle>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                  {step === 1
                    ? "Let's start by setting up your account details"
                    : 'Tell us about your business'}
                </p>
              </CardHeader>
              <CardContent className="px-4 sm:px-8 pb-4 sm:pb-8">
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    fadeIn ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                  }`}
                >
                  {renderStep()}
                </div>
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="mt-6 sm:mt-8 text-center pb-4">
              <p className="text-xs sm:text-sm text-gray-500">
                Already have an account?{' '}
                <a href="/login" className="text-primary hover:text-green-900 font-medium">
                  Sign in here
                </a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;