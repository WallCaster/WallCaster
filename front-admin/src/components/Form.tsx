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
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import type { Config } from '../types/config';
import Checkbox from './Checkbox';
import Input from './Input';

const navigation = [
  { name: 'General', href: '#general', icon: AdjustmentsHorizontalIcon, current: true },
  { name: 'Query', href: '#query', icon: MagnifyingGlassIcon, current: false },
  { name: 'Filter', href: '#filter', icon: FunnelIcon, current: false },
];

function classNames(...classes: (boolean | undefined | string)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminForm({ config, setConfig }: { config: Config; setConfig: (config: Config) => void }) {
  const [temp, setTemp] = useState(config);

  useEffect(() => {
    setTemp(config);
  }, [config]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setConfig(temp);
  }

  return (
    <div className='lg:grid lg:grid-cols-12 lg:gap-x-5'>
      <aside className='py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3'>
        <nav className='space-y-1'>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? 'bg-gray-50 text-indigo-700 hover:text-indigo-700 hover:bg-white'
                  : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50',
                'group rounded-md px-3 py-2 flex items-center text-sm font-medium',
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              <item.icon
                className={classNames(
                  item.current
                    ? 'text-indigo-500 group-hover:text-indigo-500'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'flex-shrink-0 -ml-1 mr-3 h-6 w-6',
                )}
                aria-hidden='true'
              />
              <span className='truncate'>{item.name}</span>
            </a>
          ))}
        </nav>
      </aside>

      <div className='space-y-6 sm:px-6 lg:px-0 lg:col-span-9'>
        <form onSubmit={onSubmit} id='general'>
          <div className='shadow sm:rounded-md sm:overflow-hidden'>
            <div className='bg-white py-6 px-4 space-y-6 sm:p-6'>
              <div>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>General Settings</h3>
                <p className='mt-1 text-sm text-gray-500'>
                  This information will be displayed publicly so be careful what you share.
                </p>
              </div>

              <div className='grid grid-cols-3 gap-6'>
                <Input
                  className='col-span-2'
                  id='maxStoreSize'
                  label='Maximum store size'
                  value={temp.maxStoreSize}
                  setValue={(s) => setTemp({ ...temp, maxStoreSize: parseInt(s) })}
                  type='number'
                  args={{ min: 1, max: 1000 }}
                />
              </div>
            </div>
            <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
              <button
                type='submit'
                className='bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Save
              </button>
            </div>
          </div>
        </form>

        <form onSubmit={onSubmit} id='query'>
          <div className='shadow sm:rounded-md sm:overflow-hidden'>
            <div className='bg-white py-6 px-4 space-y-6 sm:p-6'>
              <div>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>Query</h3>
                <p className='mt-1 text-sm text-gray-500'>Use a permanent address where you can recieve mail.</p>
              </div>

              <div className='grid grid-cols-3 gap-6'>
                <Checkbox
                  className='col-span-3 border-t pt-6'
                  id='useRandomApi'
                  label='Use random API'
                  value={temp.query.useRandomApi}
                  setValue={(b) => setTemp({ ...temp, query: { ...temp.query, useRandomApi: b } })}
                  desc='Use the randomly generated posts API for testing purposes'
                />
                <div
                  className={`grid grid-cols-3 gap-6 col-span-3 ${
                    !temp.query.useRandomApi && 'pointer-events-none opacity-20'
                  }`}
                >
                  <Input
                    className='col-span-1'
                    id='fetchInterval'
                    label='Fetch interval (in seconds)'
                    value={temp.query.random.fetchInterval}
                    setValue={(s) =>
                      setTemp({
                        ...temp,
                        query: {
                          ...temp.query,
                          random: {
                            ...temp.query.random,
                            fetchInterval: parseFloat(s),
                          },
                        },
                      })
                    }
                    type='number'
                    args={{ min: .1, max: 1000, step: 0.1 }}
                  />
                </div>
                <Checkbox
                  className='col-span-3 border-t pt-6'
                  id='useTwitterApi'
                  label='Use Twitter API'
                  value={temp.query.useTwitterApi}
                  setValue={(b) => setTemp({ ...temp, query: { ...temp.query, useTwitterApi: b } })}
                  desc='Allow requests to Twitter API'
                />
                <div
                  className={`grid grid-cols-3 gap-6 col-span-3 ${
                    !temp.query.useTwitterApi && 'pointer-events-none opacity-20'
                  }`}
                >
                  <Input
                    className='col-span-1'
                    id='fetchInterval'
                    label='Fetch interval (in seconds)'
                    value={temp.query.twitter.fetchInterval}
                    setValue={(s) =>
                      setTemp({
                        ...temp,
                        query: {
                          ...temp.query,
                          twitter: {
                            ...temp.query.twitter,
                            fetchInterval: parseFloat(s),
                          },
                        },
                      })
                    }
                    type='number'
                    args={{ min: 5, max: 1000, step: 0.1 }}
                  />
                  <Input
                    className='col-span-2'
                    id='fetchQuantity'
                    label='Fetch quantity'
                    value={temp.query.twitter.fetchQuantity}
                    setValue={(s) =>
                      setTemp({
                        ...temp,
                        query: {
                          ...temp.query,
                          twitter: {
                            ...temp.query.twitter,
                            fetchQuantity: parseInt(s),
                          },
                        },
                      })
                    }
                    type='number'
                    args={{ min: 1, max: 100 }}
                  />
                  <Input
                    className='col-span-1'
                    id='dateFrom'
                    label='Date from'
                    value={temp.query.twitter.dateRange.start}
                    setValue={(s) =>
                      setTemp({
                        ...temp,
                        query: {
                          ...temp.query,
                          twitter: {
                            ...temp.query.twitter,
                            dateRange: { ...temp.query.twitter.dateRange, start: new Date(s) },
                          },
                        },
                      })
                    }
                    type='date'
                  />
                  <Input
                    className='col-span-1'
                    id='dateTo'
                    label='Date to'
                    value={temp.query.twitter.dateRange.end}
                    setValue={(s) =>
                      setTemp({
                        ...temp,
                        query: {
                          ...temp.query,
                          twitter: {
                            ...temp.query.twitter,
                            dateRange: { ...temp.query.twitter.dateRange, end: new Date(s) },
                          },
                        },
                      })
                    }
                    type='date'
                  />
                </div>
              </div>
            </div>
            <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
              <button
                type='submit'
                className='bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Save
              </button>
            </div>
          </div>
        </form>

        <form onSubmit={onSubmit} id='filter'>
          <div className='shadow sm:rounded-md sm:overflow-hidden'>
            <div className='bg-white py-6 px-4 space-y-6 sm:p-6'>
              <div>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>Filters</h3>
                <p className='mt-1 text-sm text-gray-500'>
                  Provide basic informtion about the job. Be specific with the job title.
                </p>
              </div>
              <div className='grid grid-cols-3 gap-6'>
                <Checkbox
                  className='col-span-3'
                  id='useEnglishSentiment'
                  label='Filter by sentiment (Only in English)'
                  value={temp.filter.useEnglishSentiment}
                  setValue={(b) => setTemp({ ...temp, filter: { ...temp.filter, useEnglishSentiment: b } })}
                  desc='Filter out tweets with negative sentiment'
                />
                <Checkbox
                  className='col-span-3'
                  id='useForbiddenWords'
                  label='Filter Forbidden Words'
                  value={temp.filter.useForbiddenWords}
                  setValue={(b) => setTemp({ ...temp, filter: { ...temp.filter, useForbiddenWords: b } })}
                  desc='Filter out tweets containing forbidden words'
                />
                <Checkbox
                  className='col-span-3'
                  id='allowVideo'
                  label='Allow video'
                  value={temp.filter.allowVideo}
                  setValue={(b) => setTemp({ ...temp, filter: { ...temp.filter, allowVideo: b } })}
                  desc='Allow tweets with video'
                />
                <Checkbox
                  className='col-span-3'
                  id='allowImage'
                  label='Allow image'
                  value={temp.filter.allowImage}
                  setValue={(b) => setTemp({ ...temp, filter: { ...temp.filter, allowImage: b } })}
                  desc='Allow tweets with image'
                />
              </div>
            </div>
            <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
              <button
                type='submit'
                className='bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600'
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
