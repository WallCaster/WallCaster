export default function ChangeIndicator(props: { hasChanges: boolean }) {
  return (
    <div className='px-4 py-3 bg-gray-50 text-right sm:px-6 flex gap-5 items-center justify-end'>
      {props.hasChanges && <div>You have some unsaved changes</div>}
      <button
        type='submit'
        disabled={!props.hasChanges}
        className='bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Save
      </button>
    </div>
  );
}
