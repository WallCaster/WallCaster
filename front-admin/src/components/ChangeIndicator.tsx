export default function ChangeIndicator(props: { hasChanges: boolean; onCancel: () => void }) {
  return (
    <div className='px-4 py-3 bg-gray-50 text-right sm:px-6 flex gap-3 items-center justify-end'>
      {props.hasChanges && <div className='text-sm opacity-50'>You have some unsaved changes</div>}
      <button
        type='button'
        disabled={!props.hasChanges}
        className='bg-gray-200 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-600 hover:bg-gray-300 hover:text-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:hover:bg-gray-200 disabled:cursor-not-allowed'
        onClick={() => props.onCancel()}
      >
        Cancel
      </button>
      <button
        type='submit'
        disabled={!props.hasChanges}
        className='bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 disabled:cursor-not-allowed'
      >
        Save
      </button>
    </div>
  );
}
