export const Header = () => {
  return (
    <div className='border-b-[1px] border-gray-200 w-full'>
      <div className='h-16 flex flex-row justify-between max-w-screen-2xl px-4 sm:px-6 md:px-8 mx-auto page-full-width:max-w-full'>
        <div className='flex flex-row space-x-3 items-center text-lg font-semibold'>
          <img src="/images/favicon.png" className='w-8 h-8' />
          <div>Wakusaurus</div>
        </div>
        <div className='flex flex-row space-x-6 items-center'>
          <div>Waku</div>
          <div>About</div>
          <div>Github</div>
        </div>
      </div>
    </div>
  );
};

