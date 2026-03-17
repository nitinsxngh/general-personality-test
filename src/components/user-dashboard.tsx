'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserTestResults, type Report } from '@/actions';
import { Link } from '@/navigation';
import { ArrowRightIcon } from './icons';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [testResults, setTestResults] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUserResults = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const results = await getUserTestResults(user.uid);
      setTestResults(results);
    } catch (error) {
      console.error('Error loading test results:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadUserResults();
    }
  }, [user, loadUserResults]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-default-600">Loading your test results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-600 mb-2">
          Your ILC Assessment History
        </h1>
        <p className="text-default-600">
          Track your personality assessment results and career insights over time.
        </p>
      </div>

      {testResults.length === 0 ? (
        <Card className="text-center p-8">
          <CardBody>
            <div className="mb-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">No Tests Taken Yet</h3>
              <p className="text-default-600 mb-6">
                Take your first ILC personality assessment to discover your career potential.
              </p>
            </div>
            <Button
              as={Link}
              href="/test"
              color="primary"
              size="lg"
              endContent={<ArrowRightIcon />}
            >
              Take Assessment
            </Button>
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-4">
          {testResults.map((result, index) => (
            <Card key={result.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">
                    ILC Personality Assessment #{index + 1}
                  </h3>
                  <p className="text-sm text-default-500">
                    Completed on {formatDate(result.timestamp)}
                  </p>
                </div>
                <Chip color="primary" variant="flat">
                  {result.language.toUpperCase()}
                </Chip>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                  {result.results.map((domain) => (
                    <div key={domain.domain} className="text-center">
                      <div className="text-sm font-medium text-default-600 mb-1">
                        {domain.domain}
                      </div>
                      <div className="text-2xl font-bold text-primary-600">
                        {domain.score}
                      </div>
                      <div className="text-xs text-default-500">
                        {domain.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button
                    as={Link}
                    href={`/result/${result.id}`}
                    color="primary"
                    variant="bordered"
                    size="sm"
                    endContent={<ArrowRightIcon />}
                  >
                    View Details
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Button
          as={Link}
          href="/test"
          color="primary"
          size="lg"
          endContent={<ArrowRightIcon />}
        >
          Take New Assessment
        </Button>
      </div>
    </div>
  );
};
