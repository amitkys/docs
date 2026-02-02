import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <h1 className="text-2xl font-bold mb-4">Documents about him, his projects, learning & more..</h1>
      <p>
        You can open{' '}
        <Link href="/sabnamAI" className="font-medium underline">
          /sabnamAI
        </Link>{' '}
        and see the documentation.
      </p>
    </div>
  );
}
