import React from 'react';
import type { ASSETPrompt } from '../types';

interface Props {
  asset: ASSETPrompt;
}

export default function ContextReview({ asset }: Props) {
  return (
    <div className="space-y-4">
      {asset.assistant && (
        <div>
          <h3 className="font-semibold">Assistant (DAB)</h3>
          <p className="text-sm text-gray-600">{asset.assistant.name} - {asset.assistant.role}</p>
        </div>
      )}

      {asset.sources.length > 0 && (
        <div>
          <h3 className="font-semibold">Sources ({asset.sources.length} Core Blocks)</h3>
          <ul className="text-sm text-gray-600">
            {asset.sources.map(source => (
              <li key={source.id}>• {source.name}</li>
            ))}
          </ul>
        </div>
      )}

      {asset.shape && (
        <div>
          <h3 className="font-semibold">Output Shape</h3>
          <p className="text-sm text-gray-600">{asset.shape.name}</p>
        </div>
      )}
    </div>
  );
}
