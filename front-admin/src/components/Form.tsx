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
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  FunnelIcon,
  PhotoIcon,
  RssIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { ChangeEvent, useEffect, useState } from 'react';
import type { Config } from '../types/config';
import type { FilterData, Post } from '../types/post';
import CacheCard from './CacheCard';
import ChangeIndicator from './ChangeIndicator';
import Checkbox from './Checkbox';
import { FormComponent } from './FormComponent';
import Input from './Input';
import InputTags from './InputTags';
import { LiveFeed } from './LiveFeed';

const navigation = [
  { name: 'Live Feed', href: '#feed', icon: RssIcon, current: false },
  { name: 'General', href: '#general', icon: AdjustmentsHorizontalIcon, current: false },
  { name: 'Query', href: '#query', icon: MagnifyingGlassIcon, current: false },
  { name: 'Filter', href: '#filter', icon: FunnelIcon, current: false },
  { name: 'Photos', href: '#photos', icon: PhotoIcon, current: false },
];

function classNames(...classes: (boolean | undefined | string)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminForm({
  config,
  setConfig,
  onCancel,
  images,
  setImages,
}: {
  config: Config;
  setConfig: (config: Config) => void;
  images: File[];
  setImages: (images: File[]) => void;
  onCancel: () => void;
}) {
  const [temp, setTemp] = useState(config);
  const [hasChanges, setHasChanges] = useState(false);
  const [imagesTemp, setImagesTemp] = useState<File[]>([]);
  // const [imagesUploaded, setImagesUploaded] = useState<File[]>([]);

  useEffect(() => {
    setTemp(config);
    setImagesTemp(images)
  }, [config, images]);

  useEffect(() => {
    if (hasChanges && JSON.stringify(temp) === JSON.stringify(config) && imagesTemp?.length === images?.length) {
      setHasChanges(false);
    } else if (!hasChanges && JSON.stringify(temp) !== JSON.stringify(config)) {
      setHasChanges(true);
    } else if (!hasChanges && imagesTemp?.length !== images?.length) {
      setHasChanges(true);
    }
  }, [temp, config, images, imagesTemp]);

  function onSubmit() {
    setConfig(temp);
    setImages(imagesTemp);
    console.log("imagesTemp.length = " + imagesTemp.length);
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files);

      setImagesTemp(previousFileList => [...previousFileList, ...fileList]);
      // setImagesUploaded(fileList)
    }
  }; 

  function deleteImage(index : number) {
    setImagesTemp([
      ...imagesTemp.slice(0, index),
      ...imagesTemp.slice(index + 1)
    ]);
  }
  

  return (
    <>
      <div className='lg:grid p-6 lg:grid-cols-12 lg:gap-x-5 w-full flex flex-col gap-6 max-w-5xl'>
        <aside className='lg:col-span-2'>
          <nav className='space-y-1 sticky top-10'>
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

        <div className='space-y-6 lg:col-span-10'>
          <FormComponent
            onSubmit={onSubmit}
            onCancel={onCancel}
            id='general'
            title='General Settings'
            description='Settings that affect the server in general.'
            hasChanges={hasChanges}
          >
            <Input
              className='col-span-2'
              id='maxStoreSize'
              label='Maximum store size'
              value={temp.maxStoreSize}
              setValue={(s) => setTemp({ ...temp, maxStoreSize: parseInt(s) })}
              type='number'
              args={{ min: 1, max: 1000 }}
            />
            <Input
              className='col-span-2'
              id='rotationInterval'
              label='Rotation interval'
              value={temp.rotationInterval}
              setValue={(s) => setTemp({ ...temp, rotationInterval: parseFloat(s) })}
              type='number'
              args={{ min: 0.1, max: 1000, step: 0.1 }}
            />
          </FormComponent>
          <FormComponent
            onSubmit={onSubmit}
            onCancel={onCancel}
            id='query'
            title='Query Settings'
            description='Settings related to searching post through multiple APIs.'
            hasChanges={hasChanges}
          >
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
                args={{ min: 0.1, max: 1000, step: 0.1 }}
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
              <InputTags
                className='col-span-3'
                id='whitelistHashtags'
                label='Whitelisted Hashtags'
                prefix='#'
                value={temp.query.twitter.whitelistHashtags}
                setValue={(s) =>
                  setTemp({
                    ...temp,
                    query: {
                      ...temp.query,
                      twitter: {
                        ...temp.query.twitter,
                        whitelistHashtags: s,
                      },
                    },
                  })
                }
              />
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
                args={{ min: 10, max: 100 }}
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
          </FormComponent>
          <FormComponent
            onSubmit={onSubmit}
            onCancel={onCancel}
            id='filter'
            title='Filter Settings'
            hasChanges={hasChanges}
            description='Settings related to filtering posts before they are displayed.'
          >
            <Checkbox
              className='col-span-3'
              id='useEnglishSentiment'
              label='Filter by sentiment (Only in English)'
              value={temp.filter.useSentiment}
              setValue={(b) => setTemp({ ...temp, filter: { ...temp.filter, useSentiment: b } })}
              desc='Filter out tweets with negative sentiment'
            />
            <Checkbox
              className='col-span-3'
              id='useBanwords'
              label='Filter Banwords'
              value={temp.filter.useBanwords}
              setValue={(b) => setTemp({ ...temp, filter: { ...temp.filter, useBanwords: b } })}
              desc='Filter out tweets containing forbidden words'
            />
            <InputTags
              className='col-span-3'
              id='whitelistHashtags'
              label='Banwords list'
              value={temp.filter.forbiddenWords}
              setValue={(s) =>
                setTemp({
                  ...temp,
                  filter: {
                    ...temp.filter,
                    forbiddenWords: s,
                  },
                })
              }
            />
            <Checkbox
              className='col-span-3'
              id='allowImage'
              label='Filter images'
              value={temp.filter.useBlockImages}
              setValue={(b) => setTemp({ ...temp, filter: { ...temp.filter, useBlockImages: b } })}
              desc='Disallow tweets with images'
            />
          </FormComponent>
          <FormComponent
            onSubmit={onSubmit}
            onCancel={onCancel}
            id='photos'
            title='Photos'
            hasChanges={hasChanges}
            description='List of photos to display on screen.'
          >
            <input
              type='file'
              multiple
              id='add_photos'
              name='add_photos'
              accept='image/*'
              onChange={handleImageUpload}
            ></input>


            <div className='flex overflow-x-auto'>
              <div style={{ whiteSpace: 'nowrap' }}>
                {(imagesTemp !== undefined) && imagesTemp.map((image, index) => (
                  <div className='relative m-0.5' style={{ display: 'inline-block'}}>
                    <button
                      type='button'
                      className='absolute top-0 right-0 m-0.5 p-2 text-gray-900 hover:bg-red-300 opacity-75 rounded-lg'
                      onClick={() => deleteImage(index)}
                      title='Delete photo'>
                      <XMarkIcon className='h-6 w-6'></XMarkIcon>
                    </button>
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Image ${index}`}
                      className='max-h-40'/>
                  </div>
                ))}
              </div>
            </div>
          </FormComponent>
        </div>
      </div>
    </>
  );
}
