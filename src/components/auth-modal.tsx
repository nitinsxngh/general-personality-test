'use client';

import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Spinner,
} from '@nextui-org/react';
import { useAuth } from '@/contexts/AuthContext';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@nextui-org/shared-icons';
import { GoogleIcon } from './icons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn, signUp, signInWithGoogle } = useAuth();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          setIsLoading(false);
          return;
        }
        await signUp(email, password);
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);

    try {
      await signInWithGoogle();
      onSuccess();
      onClose();
    } catch (error: any) {
      setError(error.message || 'Google sign-in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" placement="center">
      <ModalContent>
        <Card>
          <CardHeader className="flex flex-col gap-1 pb-0">
            <h2 className="text-2xl font-bold text-center">
              {isLogin ? 'Sign In' : 'Create Account'}
            </h2>
            <p className="text-default-500 text-center">
              {isLogin 
                ? 'Sign in to take your personality assessment' 
                : 'Create an account to get started'
              }
            </p>
          </CardHeader>
          <CardBody className="gap-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isRequired
                variant="bordered"
              />
              
              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isRequired
                variant="bordered"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />

              {!isLogin && (
                <Input
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  isRequired
                  variant="bordered"
                  type={isVisible ? "text" : "password"}
                />
              )}

              {error && (
                <div className="text-danger text-sm text-center bg-danger-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                color="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>

            <Divider className="my-4" />
            
            <div className="text-center">
              <p className="text-sm text-default-500 mb-4">Or continue with</p>
              <Button
                onClick={handleGoogleSignIn}
                variant="bordered"
                size="lg"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
                startContent={!isLoading && <GoogleIcon size={20} />}
              >
                {isLoading ? (
                  <Spinner size="sm" />
                ) : (
                  `Continue with Google`
                )}
              </Button>
            </div>

            <Divider />

            <div className="text-center">
              <p className="text-sm text-default-500">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <Button
                variant="light"
                size="sm"
                onClick={toggleMode}
                className="mt-2"
              >
                {isLogin ? 'Create Account' : 'Sign In'}
              </Button>
            </div>
          </CardBody>
        </Card>
      </ModalContent>
    </Modal>
  );
};
