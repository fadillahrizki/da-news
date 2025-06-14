function Filter({dateStart, dateEnd, handleDateStartChange, handleDateEndChange}) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center p-4 gap-4">
      <div className="w-full">
        <label htmlFor="beginningDate" className="text-gray-800 dark:text-white text-sm">Beginning Date</label>
        <input id="beginningDate" onChange={handleDateStartChange} name="start" type="date" className="mt-2 bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:[color-scheme:dark] " placeholder="Select date start" value={dateStart}/>
      </div>
      <div className="w-full">
        <label htmlFor="endingDate" className="text-gray-800 dark:text-white text-sm">Ending Date</label>
        <input id="endingDate" onChange={handleDateEndChange} name="end" type="date" className="mt-2 bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:[color-scheme:dark]" placeholder="Select date end" value={dateEnd}/>
      </div>
    </div>
  );
}

export default Filter;