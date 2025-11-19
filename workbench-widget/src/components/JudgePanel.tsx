import React, { useState } from 'react';

interface Props {
  runId: string;
}

export default function JudgePanel({ runId }: Props) {
  const [outcome, setOutcome] = useState('');

  const handleJudge = async (status: 'pass' | 'fail') => {
    // TODO: Call MCP tool cv_update_run_judge
    console.log('Judging run:', runId, status);
  };

  return (
    <div className="space-y-4">
      <textarea
        value={outcome}
        onChange={(e) => setOutcome(e.target.value)}
        placeholder="Paste the AI's output here for judgment..."
        className="w-full h-32 p-4 border border-gray-300 rounded-lg"
      />

      <div className="flex gap-4">
        <button
          onClick={() => handleJudge('pass')}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          ✓ Pass & Bank Asset
        </button>
        <button
          onClick={() => handleJudge('fail')}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          ✗ Fail
        </button>
      </div>
    </div>
  );
}
