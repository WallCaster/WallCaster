import ChangeIndicator from './ChangeIndicator';

export function FormComponent({
  id,
  onSubmit,
  children,
  title,
  description,
  hasChanges,
  onCancel,
  className,
}: {
  id: string;
  onSubmit?: () => void;
  children: React.ReactNode;
  title: string;
  description?: string;
  hasChanges?: boolean;
  onCancel?: () => void;
  className?: string;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit();
      }}
      id={id}
      className={className}
    >
      <div className='shadow sm:rounded-md overflow-hidden'>
        <div className='bg-white py-6 px-4 space-y-6 sm:p-6'>
          <FormTitle title={title} description={description} />
          <div className='flex flex-col gap-6'>{children}</div>
        </div>
        {onSubmit && onCancel && <ChangeIndicator hasChanges={hasChanges || false} onCancel={onCancel} />}
      </div>
    </form>
  );
}

export function FormTitle({ title, description }: { title: string; description?: string }) {
  return (
    <div>
      <h3 className='text-lg leading-6 font-medium text-gray-900'>{title}</h3>
      <p className='mt-1 text-xs text-gray-400'>{description}</p>
    </div>
  );
}
