// app/test/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';

export default function TestPage() {
  return (
    <div>
      <h1>Test Page</h1>
          {/* <Link href="/test/subtest"> <Button> Click me</Button></Link> */}
          <Link href="/test/subtest" className={buttonVariants({ variant: "outline" })}>Sub Test</Link>
          <Link href="/test/tables" className={buttonVariants({ variant: "outline" })}>Tables</Link>
    </div>
  );
}
