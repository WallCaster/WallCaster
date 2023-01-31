/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Checkbox({
  id,
  label,
  desc,
  value,
  setValue,
  args,
  className,
}: {
  id: string;
  label: string;
  desc: string;
  value: boolean;
  setValue: (value: boolean) => void;
  args?: any;
  className?: string;
}) {
  return (
    <div className={`${className} relative flex items-start`}>
      <div className='flex items-center h-5'>
        <input
          id={id}
          aria-describedby={`${id}-description`}
          name={id}
          checked={value}
          onChange={(e) => setValue(e.target.checked)}
          type='checkbox'
          {...args}
          className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
        />
      </div>
      <div className='ml-3 text-sm'>
        <label htmlFor={id} className='font-medium text-gray-700'>
          {label}
        </label>
        <p id={`${id}-description`} className='text-gray-500'>
          {desc}
        </p>
      </div>
    </div>
  );
}
