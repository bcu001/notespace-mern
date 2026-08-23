import { Zap } from "lucide-react"

const RateLimitUI = () => {
  return (
   <div className="flex justify-center items-center ">
     <div className="flex justify-start items-center gap-4 border-base-content/10 border p-4 max-w-6xl">
        <div className="rounded-full bg-base-300 p-2 flex items-center justify-center">
            <Zap className="size-7 "/>
        </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-bold">Rate Limit Reached</h2>
        <p className="text-base-content">You've made too many requests in a short period. Please wait a moment.</p>
        <p className="text-sm text-base-content/70">Try again in a few seconds for the best exprience.</p>
      </div>
    </div>
   </div>
  )
}

export default RateLimitUI
