const skeletonBlock = "animate-pulse rounded bg-secondary";

function SkeletonBlock({ className }: { className: string }) {
  return <div data-slot='skeleton' className={`${skeletonBlock} ${className}`} />;
}

function PanelSkeleton({ className, chartHeight }: { className: string; chartHeight: string }) {
  return (
    <div className={`rounded-xl bg-card p-5 ${className}`}>
      <div className='flex items-center justify-between'>
        <SkeletonBlock className='h-4 w-28' />
        <SkeletonBlock className='h-7 w-24' />
      </div>
      <SkeletonBlock className={`mt-4 w-full ${chartHeight}`} />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <main
      aria-busy='true'
      className='mx-auto flex max-w-[1400px] flex-col gap-3.5 px-6 pt-3.5 pb-20'
    >
      <section aria-hidden='true' className='grid grid-cols-6 gap-3.5 max-[1080px]:grid-cols-3'>
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className='flex min-w-0 flex-col gap-2 rounded-xl bg-card px-[17px] py-[15px]'
          >
            <SkeletonBlock className='h-4 w-24' />
            <div className='flex h-10 items-center gap-2'>
              <SkeletonBlock className={`h-8 ${index < 2 ? "w-20" : "w-16"}`} />
              <SkeletonBlock className='h-3 w-9' />
              <SkeletonBlock className='h-6 min-w-0 flex-1' />
            </div>
            <SkeletonBlock className='h-3 w-28' />
          </div>
        ))}
      </section>

      <section
        aria-hidden='true'
        className='grid grid-cols-12 gap-3.5 max-[1080px]:flex max-[1080px]:flex-col'
      >
        <PanelSkeleton className='col-span-8' chartHeight='h-[190px]' />
        <PanelSkeleton className='col-span-4' chartHeight='h-[190px]' />
        <PanelSkeleton className='col-span-8' chartHeight='h-[160px]' />
        <PanelSkeleton className='col-span-8' chartHeight='h-[160px]' />
        <PanelSkeleton className='col-span-4' chartHeight='h-[220px]' />
        <PanelSkeleton className='col-span-12' chartHeight='h-[100px]' />
      </section>
    </main>
  );
}
