import "@/styles/style.css"

import { allLabKanaban, kanbans } from "@/constants/constants"
import {
  useCallback,
  useEffect,
  useState,
  type ChangeEventHandler,
  type MouseEventHandler
} from "react"

function IndexPopup() {
  const [names, setNames] = useState<string[]>([])

  const onOpenKanbansHandler: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      chrome.tabs.create({ url: allLabKanaban })

      names.forEach((name) => {
        if (name in kanbans) {
          chrome.tabs.create({ url: kanbans[name] })
        }
      })
    }, [names])

  const onChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      const names = e.target.value
        .split(/\s+/)
        .filter((name) => name in kanbans)
      setNames(names)
    },
    []
  )

  return (
    <div className="h-96 w-96 border-black bg-white">
      <div>
        <textarea onChange={onChangeHandler} />
        <button onClick={onOpenKanbansHandler}>おしてね</button>
      </div>
    </div>
  )
}

export default IndexPopup
