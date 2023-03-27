import { ShieldCheckIcon, ShieldExclamationIcon } from '@heroicons/react/20/solid';
import type { FilterData } from '../types/post';

export default function FilterIndicator({
  passed,
  descPassed,
  descRejected,
  long = false,
}: {
  passed: boolean | undefined;
  descPassed: string;
  descRejected: string;
  long?: boolean;
}) {
  if (passed === undefined) return null;
  if (long) {
    if (passed)
      return (
        <div title={descPassed} className='flex items-center p-3 rounded-sm gap-4'>
          <ShieldCheckIcon className='w-5 h-5 shrink-0 text-green-500 ' />
          <div className='text-sm'>

          {descPassed}
          </div>
        </div>
      );

    return (
      <div title={descRejected} className='flex items-center bg-red-100 p-3 rounded-sm text-red-800 gap-4'>
        <ShieldExclamationIcon className='w-5 h-5 shrink-0 text-red-500 ' />
        <div className='text-sm'>{descRejected}</div>
      </div>
    );
  }
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
