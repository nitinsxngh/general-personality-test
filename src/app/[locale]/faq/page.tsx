'use client';
import { title } from '@/components/primitives';
import { Accordion, AccordionItem } from '@nextui-org/accordion';

export default function FaqPage() {
  const faq = [
    {
      question: 'How does the ILC Personality Assessment work?',
      answer:
        'Our ILC assessment uses scientifically validated personality models including the Big Five framework to analyze your traits across five dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. The test takes about 10 minutes to complete and provides detailed insights into your personality profile.'
    },
    {
      question: 'How do I get career recommendations?',
      answer:
        'After completing the personality test, you can upload your resume to get personalized career recommendations. Our AI analyzes both your personality traits and professional experience to suggest the best career paths and job opportunities for you.'
    },
    {
      question: 'Is the personality test free?',
      answer:
        'Yes, the basic personality assessment is completely free. No registration is required, and you can take the test as many times as you want.'
    },
    {
      question: 'How accurate are the personality results?',
      answer:
        'Our ILC assessment is based on scientifically validated personality models, including the Big Five framework, which is widely recognized as the most reliable framework for personality assessment. The results provide accurate insights into your personality traits.'
    },
    {
      question: 'Can recruiters use this platform to find candidates?',
      answer:
        'Yes! Recruiters can access our platform to find candidates whose personality traits align with their company culture and job requirements. This helps reduce hiring time and improve employee retention.'
    },
    {
      question: 'What other ILC services are available?',
      answer:
        'ILC offers a complete ecosystem including Resume Builder for professional resume creation, Student Assessment for educational institutions (Class 1-8), and ILC Forum for community discussions. All services work together to support career development.'
    },
    {
      question: 'How do I print my test results?',
      answer:
        'You can print your results directly from your browser or save them as a PDF document. The results page is optimized for printing and includes all your personality insights and career recommendations.'
    },
    {
      question: 'Is my data secure and private?',
      answer:
        'Yes, we take data privacy seriously. Your personal information and test results are encrypted and stored securely. We never share your data with third parties without your explicit consent.'
    },
    {
      question: 'Can I retake the personality test?',
      answer:
        'Yes, you can retake the test as many times as you want. However, for the most accurate results, we recommend taking it when you\'re in a calm, focused state of mind.'
    },
    {
      question: 'How do I contact support?',
      answer:
        'If you have any questions or need assistance, please contact us at support@ilc.limited. We typically respond within 24 hours and are happy to help with any issues or questions you may have.'
    }
  ];
  return (
    <div>
      <h1 className={title()}>Frequently asked questions.</h1>
      <Accordion className='mt-10'>
        {faq.map((item, index) => (
          <AccordionItem
            key={index}
            textValue={item.question}
            title={
              <span className='text-foreground text-large font-medium'>
                {item.question}
              </span>
            }
          >
            <div className='py-2 pt-0 pb-6 text-base text-default-500'>
              {item.answer}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
