import { ShieldCheckIcon, ShieldExclamationIcon } from '@heroicons/react/20/solid';
import type { FilterData } from '../types/post';

export default function FilterIndicator({
  passed,
  descPassed,
  descRejected,
}: {
  passed: boolean | undefined;
  descPassed: string;
  descRejected: string;
}) {
  if (passed === undefined) return null;

  if (passed)
    return (
      <div title={descPassed}>
        <ShieldCheckIcon className='w-5 h-5 shrink-0 text-green-500 ' />
      </div>
    );

  return (
    <div title={descRejected}>
      <ShieldExclamationIcon className='w-5 h-5 shrink-0 text-red-500 ' />
    </div>
  );
}
