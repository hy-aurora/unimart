import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-12 w-60 bg-indigo-100 dark:bg-indigo-900/30" />
          <Skeleton className="h-5 w-96 bg-indigo-100 dark:bg-indigo-900/30" />
        </div>
        
        <Skeleton className="h-16 w-full rounded-xl bg-indigo-100 dark:bg-indigo-900/30" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border rounded-xl overflow-hidden border-indigo-100 dark:border-indigo-900/50">
              <Skeleton className="aspect-square w-full bg-indigo-100 dark:bg-indigo-900/30" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-4/5 bg-indigo-100 dark:bg-indigo-900/30" />
                <Skeleton className="h-4 w-1/3 bg-indigo-100 dark:bg-indigo-900/30" />
                <Skeleton className="h-8 w-28 bg-indigo-100 dark:bg-indigo-900/30" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <Skeleton className="h-10 w-64 rounded-lg bg-indigo-100 dark:bg-indigo-900/30" />
        </div>
      </div>
    </div>
  )
}

