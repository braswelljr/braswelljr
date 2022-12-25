const Custom500 = () => {
  return (
    <section
      className={
        'fixed inset-0 grid h-screen place-content-center px-4 text-center'
      }
    >
      <div className="">
        <div className="flex flex-auto flex-col items-center justify-center sm:flex-row">
          <h1 className="text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white/40 sm:mr-6 sm:border-r sm:border-neutral-900/50 sm:pr-6 sm:dark:border-white/50">
            500
          </h1>
          <h2 className="mt-2 text-lg text-neutral-700 dark:text-white sm:mt-0">
            An error occurred on the server.
          </h2>
        </div>
      </div>
    </section>
  )
}

export default Custom500
