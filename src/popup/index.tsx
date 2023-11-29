import "@/styles/style.css"

import { allLabKanaban, kanbans } from "@/constants/constants"
import {
  useCallback,
  useState,
  type ChangeEventHandler,
  type FormEventHandler
} from "react"

function IndexPopup() {
  const [names, setNames] = useState<Array<keyof typeof kanbans>>([])

  const onOpenKanbansHandler: FormEventHandler<HTMLFormElement> =
    useCallback(() => {
      names.forEach((name) => {
        chrome.tabs.create({ url: kanbans[name].url })
      })

      chrome.tabs.create({ url: allLabKanaban })
    }, [names])

  const onChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      const names = e.target.value
        .split(/\s+/)
        .filter((name): name is keyof typeof kanbans => name in kanbans)
        .sort((a, b) => kanbans[b].level - kanbans[a].level)
      setNames(names)
    },
    []
  )

  return (
    <div className="w-80 border-black bg-white">
      <form className="mx-auto px-8 py-4" onSubmit={onOpenKanbansHandler}>
        <textarea
          onChange={onChangeHandler}
          id="message"
          rows={4}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="ここに適当にペースト"></textarea>
        <button
          type="submit"
          className="mt-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">
          かんばんを開く
        </button>
      </form>
    </div>
  )
}

export default IndexPopup
