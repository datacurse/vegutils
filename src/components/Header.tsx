import Hamburger from "./hamburger";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <div className='border-b-[1px] border-gray-200 w-full'>
      <div className='h-16 flex flex-row justify-between max-w-screen-2xl px-2 mx-auto page-full-width:max-w-full'>
        <div className='flex flex-row space-x-3 items-center text-lg font-semibold'>
          <img src="/images/icon.png" className='w-8 h-8 rounded-md' />
          <div>vegutils</div>
        </div>
        <div className='flex flex-row space-x-6 items-center'>
          <div>Contact</div>
          <div>About</div>
          <div>Github</div>
          <ThemeToggle />
          <div className="block lg:hidden">
            <Hamburger />
          </div>
        </div>
      </div>
    </div>
  );
};

