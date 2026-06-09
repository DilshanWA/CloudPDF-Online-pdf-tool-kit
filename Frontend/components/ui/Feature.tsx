import { FileText, Lock, Zap, Shield } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Multiple Format Support",
    description: "Convert Word, Excel, PowerPoint, images and more to PDF",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process your documents in seconds with zero waiting",
  },
  {
    icon: Lock,
    title: "Password Protected",
    description: "Secure your PDFs with encrypted passwords",
  },
  {
    icon: Shield,
    title: "Privacy Guaranteed",
    description: "Your files are processed locally and never stored on servers",
  },
]

export default function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 bg-primary/5">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">Powerful Features</h2>
          <p className="text-lg text-black max-w-2xl mx-auto">
            Everything you need for professional document management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="p-6 bg-gray-100 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">{feature.title}</h3>
                <p className="text-black/70">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
