import { Post, SocialNetwork, WithId } from '../types/post';

export const PostCard = ({ post }: { post: WithId<Post> }) => {
  if (post.socialNetwork === SocialNetwork.TWITTER) return <TwitterPostCard post={post} />;
  else return <p>Social network not supported yet ({post.socialNetwork})</p>;
};

const TwitterPostCard = ({ post }: { post: WithId<Post> }) => {
  let authorImage = post.author.image;
  if (authorImage === undefined)
    authorImage = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png';

  const time: string = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(new Date(post.date));
  const date: string = new Intl.DateTimeFormat('en-US', { weekday: 'short', day: 'numeric', year: 'numeric' }).format(
    new Date(post.date),
  );

  const retweets = Math.round(Math.random() * 10000);
  const quoteTweets = Math.round(Math.random() * 1000);
  const likes = Math.round(Math.random() * 1000);

  return (
    <div className='flex flex-col bg-white text-black p-7 rounded-xl shadow-xl border my-5 md:m-10 gap-4 overflow-hidden'>
      <div className='flex gap-4'>
        <div className='avatar mask mask-circle h-12 w-12 shrink-0'>
          <img src={authorImage} alt='avatar' />
        </div>
        <div className='flex flex-col justify-center'>
          <p className='font-bold leading-4'>{post.author.name}</p>
          <p className='text-gray-600'>{post.author.username}</p>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <p className='text-2xl'>{post.content.text}</p>
        <div className='text-gray-600 text-lg'>{time + ' · ' + date}</div>
        <div className='flex gap-5 border-t flex-wrap pt-4'>
          <p>
            <span className='font-bold'>{retweets.toLocaleString()}</span> Retweets
          </p>
          <p>
            <span className='font-bold'>{quoteTweets.toLocaleString()}</span> Quote Tweets
          </p>
          <p>
            <span className='font-bold'>{likes.toLocaleString()}</span> Likes
          </p>
        </div>
      </div>
    </div>
  );
};
