import { QuestionContent } from '@/components/QuestionCard'
import { Suspense } from 'react';

export default function QuestionCard() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <QuestionContent/>
      </Suspense>
    );
  }