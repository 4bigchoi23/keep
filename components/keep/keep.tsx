import Link from 'next/link';

export default function Keep() {
  return (
    <h1 className="keep">
      <Link href="/" className="keep-link">
        <span className="keep-mark"></span>
        <span className="keep-font">KEEP</span>
      </Link>
    </h1>
  );
}
