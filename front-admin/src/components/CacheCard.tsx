import type { FilterData, Post } from '../types/post';
import { TrashIcon, ShieldCheckIcon } from '@heroicons/react/20/solid';
import FilterIndicator from './FilterIndicator';

export default function CacheCard({
  post,
  cacheDelete,
}: {
  post: Post & FilterData;
  cacheDelete: (id: string) => void;
}) {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60 * 1000;
  const date = new Date(post.filterDate) 
  // date is in UTC, so we need to convert it to local time
  date.setTime(date.getTime() - offset);


  // format with xx s/min/h/day ago
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  let diffStr = '';
  if (diff < 1) {
    diffStr = 'now';
  } else if (diff < 60) {
    diffStr = `${diff} s ago`;
  } else if (diff < 3600) {
    diffStr = `${Math.floor(diff / 60)} min ago`;
  } else if (diff < 86400) {
    diffStr = `${Math.floor(diff / 3600)} h ago`;
  } else {
    diffStr = `${Math.floor(diff / 86400)} day ago`;
  }

  return (
    <div
      className='border rounded-lg grid grid-cols-4 justify-between w-full px-4 py-3 hover:text-red-800 hover:bg-red-100 cursor-pointer group'
      onClick={() => {
        cacheDelete(post.id);
      }}
    >
      <div className='flex items-start gap-5 shrink col-span-3'>
        <div className='flex flex-col'>
          <h1 className='whitespace-nowrap shrink-0 font-bold text-sm leading-4 max-w-[6rem] text-ellipsis overflow-hidden'>
            {post.author.name}
          </h1>
          <h3 className='text-xs opacity-40'>{diffStr}</h3>
        </div>
        <p className='overflow-hidden text-ellipsis text-xs line-clamp-3'>{post.content.text}</p>
      </div>
      <div className='flex items-center justify-end gap-2 shrink-0'>
        <FilterIndicator
          passed={post.passedSentiment}
          descPassed='This post is not negative'
          descRejected='This post is negative'
        />
        <FilterIndicator
          passed={post.passedBanwords}
          descPassed='This post does not contain banwords'
          descRejected='This post contains banwords'
        />
        <FilterIndicator
          passed={post.passedImages}
          descPassed='This post does not contain images'
          descRejected='This post contains images'
        />
        <FilterIndicator
          passed={post.passedNsfw}
          descPassed='This post does not contain NSFW images'
          descRejected='This post contains NSFW images'
        />
        <TrashIcon className='w-5 h-5 group-hover:text-red-800 group-hover:opacity-100 opacity-10 shrink-0' />
      </div>
    </div>
  );
}
