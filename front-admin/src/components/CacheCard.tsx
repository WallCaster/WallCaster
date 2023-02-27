import type { FilterData, Post } from '../types/post';
import { TrashIcon, ShieldCheckIcon } from '@heroicons/react/20/solid';

export default function CacheCard({
  post,
  cacheDelete,
}: {
  post: Post & FilterData;
  cacheDelete: (id: string) => void;
}) {
  return (
    <div
      className='border rounded-lg grid grid-cols-3 justify-between w-full px-4 py-3 hover:text-red-800 hover:bg-red-100 cursor-pointer group'
      onClick={() => {
        cacheDelete(post.id);
      }}
    >
      <div className='flex items-center gap-3 shrink col-span-2'>
        <h1 className='whitespace-nowrap shrink-0 font-bold'>{post.author.name}</h1>
        <p className='whitespace-nowrap overflow-hidden text-ellipsis'>{post.content.text}</p>
      </div>
      <div className='flex items-center justify-end gap-2'>
        <ShieldCheckIcon className='w-5 h-5 text-green-500' />
        <ShieldCheckIcon className='w-5 h-5 text-green-500' />
        <ShieldCheckIcon className='w-5 h-5 text-green-500' />
        <TrashIcon className='w-5 h-5 group-hover:text-red-800 group-hover:opacity-100 opacity-10' />
      </div>
    </div>
  );
}
