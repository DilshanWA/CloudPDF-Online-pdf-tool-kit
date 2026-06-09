import { Upload, Cog, Download } from "lucide-react"

const steps = [
  {
    number: "1",
    icon: Upload,
    title: "Upload Your File",
    description: "Select the file you want to convert or process from your device",
  },
  {
    number: "2",
    icon: Cog,
    title: "Configure Settings",
    description: "Choose your preferred options and conversion parameters",
  },
  {
    number: "3",
    icon: Download,
    title: "Download Result",
    description: "Get your processed file instantly - no waiting, no registration",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">How It Works</h2>
          <p className="text-lg text-black max-w-2xl mx-auto">
            Three simple steps to convert and process your documents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div
            className="hidden md:block absolute top-1/4 left-0 right-0 h-1 bg-gray-200 z-10"
            style={{ top: "60px" }}
          />

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative z-20 w-20 h-20 bg-primary/50 rounded-full flex items-center justify-center shadow-lg">
                    <Icon size={40} className="text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-black">{step.title}</h3>
                    <p className="text-black/70">{step.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
