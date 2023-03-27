import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ArrowsRightLeftIcon, TrashIcon as TrashIconSolid } from '@heroicons/react/20/solid';
import { useState } from 'react';
import type { FilterData, Post } from '../types/post';
import { dateToAgo } from '../utils/date';
import FilterIndicator from './FilterIndicator';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
export function LiveFeed({
  trash,
  trashDelete,
  cache,
  cacheDelete,
  restore,
  clearTrash,
}: {
  trash: (Post & FilterData)[];
  trashDelete: (id: string) => void;
  cache: (Post & FilterData)[];
  cacheDelete: (id: string) => void;
  restore: (id: string) => void;
  clearTrash: () => void;
}) {
  const [showQueue, setShowQueue] = useState(true);

  return (
    <div className='bg-white border-y w-full relative'>
      <button
        className='p-3 md:hidden absolute z-10 top-3 left-3 rounded-md bg-slate-100 font-semibold hover:bg-slate-200 active:bg-slate-300 text-xs flex gap-2 items-center'
        onClick={() => setShowQueue(!showQueue)}
      >
        <ArrowsRightLeftIcon className='w-4 h-4' />
        Show {!showQueue ? 'Queue' : 'Trash'}
      </button>
      <div className='md:hidden grid grid-cols-1 h-full divide-x'>
        {showQueue ? (
          <Table title='Queue' posts={cache} onDelete={cacheDelete}></Table>
        ) : (
          <Table title='Trash' posts={trash} onDelete={trashDelete} onRestore={restore} onClear={clearTrash}></Table>
        )}
      </div>
      <div className='hidden md:grid grid-cols-2 h-full divide-x'>
        <Table title='Queue' posts={cache} onDelete={cacheDelete}></Table>
        <Table title='Trash' posts={trash} onDelete={trashDelete} onRestore={restore} onClear={clearTrash}></Table>
      </div>
    </div>
  );
}

function Table({
  title,
  posts,
  onDelete,
  onRestore,
  onClear,
}: {
  title: string;
  posts: (Post & FilterData)[];
  onDelete: (id: string) => void;
  onRestore?: (id: string) => void;
  onClear?: () => void;
}) {
  const [selected, setSelected] = useState<null | (Post & FilterData)>(null);
  return (
    <div className='relative'>
      {selected !== null && (
        <div className='absolute overflow-hidden inset-0 z-20 flex items-center justify-center p-10 transition-all'>
          <div
            className='absolute inset-0 bg-black/10 backdrop-blur cursor-pointer'
            onClick={() => setSelected(null)}
          ></div>
          <div className='bg-white rounded-lg overflow-y-auto p-10 w-full max-w-2xl max-h-full h-fit z-30 shadow-lg flex flex-col gap-4'>
            <h1 className='font-semibold text-xl flex items-center gap-5 w-full'>
              {selected.author.image && (
                <img src={selected.author.image} alt='Author' className='w-10 h-10 rounded-full' />
              )}
              {selected.author.name}
              <div className='m-auto'></div>
              <div className='text-sm font-normal'>{new Date(selected.date).toUTCString()}</div>
            </h1>
            <div>{selected.content.text}</div>
            <div className='flex overflow-x-auto h-32 overflow-y-hidden gap-1'>
              {selected.content.images &&
                selected.content.images.map((image, index) => (
                  <img key={index} src={image} alt={`Image ${index}`} className='h-32 min-w-fit' />
                ))}
            </div>
            <div className='border-t my-4'></div>
            <h1 className='font-semibold text-xl'>Filters information</h1>
            <div className='flex flex-col gap-2'>
              <FilterIndicator
                passed={selected.passedSentiment}
                descPassed='This post is not negative'
                descRejected='This post is negative'
                long
              />
              <FilterIndicator
                passed={selected.passedBanwords}
                descPassed='This post does not contain banwords'
                descRejected='This post contains banwords'
                long
              />
              <FilterIndicator
                passed={selected.passedImages}
                descPassed='This post does not contain images'
                descRejected='This post contains images'
                long
              />
            </div>
            <div className='border-t my-4'></div>
            <div className='flex gap-5 flex-wrap justify-end'>
              <button
                className='p-5 rounded-md bg-slate-100 hover:bg-slate-200 active:bg-slate-300 flex items-center'
                onClick={() => {
                  setSelected(null);
                }}
              >
                Cancel
              </button>
              {onRestore && (
                <button
                  className='p-5 rounded-md bg-slate-100 hover:bg-slate-200 active:bg-slate-300 flex items-center'
                  onClick={() => {
                    if (onRestore) onRestore(selected.id);
                    setSelected(null);
                  }}
                >
                  <ArrowLeftIcon className='w-5 h-5 mr-2' />
                  Restore
                </button>
              )}
              <button
                className='p-5 rounded-md bg-red-100 hover:bg-red-200 active:bg-red-300 text-red-800 flex items-center'
                onClick={() => {
                  onDelete(selected.id);
                  setSelected(null);
                }}
              >
                <TrashIcon className='w-5 h-5 mr-2' />
                {onRestore ? 'Delete permanently' : 'Move to trash'}
              </button>
            </div>
          </div>
        </div>
      )}
      <h3 className='leading-6 relative flex items-center justify-center text-gray-900 bg-white p-5 font-semibold text-2xl'>
        {title}
        <div className='absolute right-3 flex items-center gap-2'>
          {onClear && (
            <button
              className='p-3 rounded-md bg-red-100 hover:bg-red-200 gap-2 active:bg-red-300 font-semibold text-red-800 text-xs flex items-center'
              onClick={() => {
                onClear();
              }}
            >
              <TrashIconSolid className='w-4 h-4' />
              Empty trash
            </button>
          )}
        </div>
      </h3>
      <div className='flex flex-col gap-2 h-[60vh] overflow-y-auto'>
        <div className='inline-block min-w-full align-middle'>
          <table className='min-w-full border-separate bg-blue-500' style={{ borderSpacing: 0 }}>
            <thead className='bg-white'>
              <tr>
                <th
                  scope='col'
                  className='sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-sm font-semibold text-end text-gray-900 backdrop-blur backdrop-filter lg:table-cell'
                >
                  Timestamp
                </th>
                <th
                  scope='col'
                  className='sticky top-0 z-10 border-b hidden sm:table-cell border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8'
                >
                  Author
                </th>
                <th
                  scope='col'
                  className='sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter'
                >
                  Message
                </th>
                <th
                  scope='col'
                  className='sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8 text-right'
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className=''>
              {posts.map((post, index) => (
                <tr
                  key={post.id}
                  className='group hover:bg-blue-50 hover:text-blue-700 hover:-translate-x-2 transition-all duration-75 cursor-pointer bg-white'
                  onClick={() => {
                    setSelected(post);
                  }}
                >
                  <td
                    className={classNames(
                      index !== posts.length - 1 ? 'border-b border-gray-200' : '',
                      'whitespace-nowrap px-2 py-3 text-sm hidden text-end lg:table-cell',
                    )}
                  >
                    {dateToAgo(post.filterDate)}
                  </td>
                  <td
                    className={classNames(
                      index !== posts.length - 1 ? 'border-b border-gray-200' : '',
                      'whitespace-nowrap hidden sm:table-cell py-3 pl-3 pr-2 text-sm font-medium sm:pl-6 lg:pl-8',
                    )}
                  >
                    {post.author.name}
                  </td>
                  <td
                    className={classNames(
                      index !== posts.length - 1 ? 'border-b border-gray-200' : '',
                      'pl-2 mr-5 py-3 whitespace-nowrap max-w-xs overflow-hidden text-sm',
                    )}
                  >
                    {post.content.text}
                  </td>

                  <td
                    className={classNames(
                      index !== posts.length - 1 ? 'border-b border-gray-200' : '',
                      'relative whitespace-nowrap py-3 pr-3 pl-2 text-right text-sm font-medium sm:pr-6 lg:pr-8',
                    )}
                  >
                    <div className='flex justify-end items-center gap-1'>
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
