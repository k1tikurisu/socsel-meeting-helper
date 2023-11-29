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
        .sort((a, b) => kanbans[a].level - kanbans[b].level)
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
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          placeholder="ここに適当にペースト"></textarea>
        <button
          type="submit"
          className="ring-offset-background border-input bg-background mt-2 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-100">
          かんばんを開く
        </button>
      </form>
    </div>
  )
}

export default IndexPopup
