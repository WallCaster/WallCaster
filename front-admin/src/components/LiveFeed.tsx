import type { FilterData, Post } from '../types/post';
import CacheCard from './CacheCard';

export function LiveFeed({
  trash,
  trashDelete,
  cache,
  cacheDelete,
}: {
  trash: (Post & FilterData)[];
  trashDelete: (id: string) => void;
  cache: (Post & FilterData)[];
  cacheDelete: (id: string) => void;
}) {
  return (
    <div className='bg-white py-6 px-4 space-y-6 sm:p-6'>
      <div>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>Trash</h3>
        <p className='mt-1 text-sm text-gray-500'>
          Posts that have been deleted from the server. You can delete them from the server trash or restore them.
        </p>
      </div>
      <div className='flex flex-col gap-2 max-h-80 overflow-y-auto'>
        {trash.map((post) => (
          <CacheCard key={post.id} post={post} cacheDelete={trashDelete} />
        ))}
      </div>
    </div>
  );
}
