import ChangeIndicator from './ChangeIndicator';

export function FormComponent({
  id,
  onSubmit,
  children,
  title,
  description,
  hasChanges,
  onCancel,
}: {
  id: string;
  onSubmit?: () => void;
  children: React.ReactNode;
  title: string;
  description?: string;
  hasChanges?: boolean;
  onCancel?: () => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit();
      }}
      id={id}
    >
      <div className='shadow sm:rounded-md sm:overflow-hidden'>
        <div className='bg-white py-6 px-4 space-y-6 sm:p-6'>
          <div>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>General Settings</h3>
            <p className='mt-1 text-sm text-gray-500'>Settings that affect the server in general.</p>
          </div>
          <div className='flex flex-col gap-6'>{children}</div>
        </div>
        {onSubmit && <ChangeIndicator hasChanges={hasChanges || false} onCancel={onCancel}/>}
      </div>
    </form>
  );
}
