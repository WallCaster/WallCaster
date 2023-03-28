import { formatDate } from '../utils/date';

export default function Input({
  id,
  label,
  value,
  type,
  setValue,
  args,
  className,
}: {
  id: string;
  label: string;
  className?: string;
  type: string;
  value: number | Date | string;
  setValue: (value: string) => void;
  args?: any;
}) {
  if (type === 'date')
    return (
      <div className={`${className}`}>
        <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
          {label}
        </label>
        <div className='mt-1'>
          <input
            type='date'
            value={formatDate(new Date(value))}
            onChange={(e) => {
              console.log(e.target.value);
              setValue(e.target.value);
            }}
            name={id}
            id={id}
            {...args}
            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
          />
        </div>
      </div>
    );
  return (
    <div className={`${className}`}>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <div className='mt-1'>
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name={id}
          id={id}
          {...args}
          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
        />
      </div>
    </div>
  );
}
