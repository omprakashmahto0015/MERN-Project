import { Suspense } from "react";
import SearchClient from "./SearchClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8">Loading search results...</div>}>
      <SearchClient />
    </Suspense>
  );
}
