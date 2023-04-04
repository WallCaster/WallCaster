import { XMarkIcon } from '@heroicons/react/24/outline';

export default function InputTags({
  id,
  label,
  value,
  setValue,
  prefix = "",
  args,
  className,
}: {
  id: string;
  label: string;
  className?: string;
  prefix?: string;
  value: string[];
  setValue: (value: string[]) => void;
  args?: any;
}) {
  return (
    <div className={`${className} flex gap-3 flex-col`}>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label} (comma separated)
      </label>
      <div className='mt-1'>
        <input
          type={'text'}
          value={value.join(',')}
          onChange={(e) => setValue(e.target.value.split(','))}
          name={id}
          id={id}
          {...args}
          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
        />
      </div>
      <div className='flex gap-3 flex-wrap'>
        {value.map((v, i) => (
          <div
            key={i}
            className='flex gap-2 bg-blue-200 text-blue-600 w-fit rounded-full px-3 items-center text-sm py-1'
          >
            <p>{prefix}{v}</p>
            <button type='button'
            className='h-4 w-4' onClick={() => {console.log("TEJIOJADWDAWO");
            ;setValue(value.filter((_, j) => j !== i))}}>
              <XMarkIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
