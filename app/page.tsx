"use client"

import { useState, useEffect, useRef } from "react"
import QRCode from "qrcode"
import { Download, RefreshCw, Link, Type, Palette } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"

export default function QRCodeGenerator() {
  const [input, setInput] = useState("")
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [foregroundColor, setForegroundColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF")
  const [qrSize, setQrSize] = useState([300])
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState("M")
  const [margin, setMargin] = useState([2])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()

  const colorPresets = [
    { name: "Classic", fg: "#000000", bg: "#FFFFFF" },
    { name: "Blue", fg: "#1e40af", bg: "#dbeafe" },
    { name: "Green", fg: "#166534", bg: "#dcfce7" },
    { name: "Purple", fg: "#7c3aed", bg: "#ede9fe" },
    { name: "Red", fg: "#dc2626", bg: "#fee2e2" },
    { name: "Orange", fg: "#ea580c", bg: "#fed7aa" },
    { name: "Dark", fg: "#ffffff", bg: "#1f2937" },
    { name: "Gradient", fg: "#6366f1", bg: "#f0f9ff" },
  ]

  const generateQRCode = async (text: string) => {
    if (!text.trim()) {
      setQrCodeUrl("")
      return
    }

    setIsGenerating(true)
    try {
      const canvas = canvasRef.current
      if (canvas) {
        await QRCode.toCanvas(canvas, text, {
          width: qrSize[0],
          margin: margin[0],
          errorCorrectionLevel: errorCorrectionLevel as any,
          color: {
            dark: foregroundColor,
            light: backgroundColor,
          },
        })
        const dataUrl = canvas.toDataURL()
        setQrCodeUrl(dataUrl)
      }
    } catch (error) {
      console.error("Error generating QR code:", error)
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateQRCode(input)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [input, foregroundColor, backgroundColor, qrSize, errorCorrectionLevel, margin])

  const downloadQRCode = () => {
    if (!qrCodeUrl) return

    const link = document.createElement("a")
    link.download = "qrcode.png"
    link.href = qrCodeUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Success",
      description: "QR code downloaded successfully!",
    })
  }

  const clearInput = () => {
    setInput("")
    setQrCodeUrl("")
  }

  const applyColorPreset = (preset: (typeof colorPresets)[0]) => {
    setForegroundColor(preset.fg)
    setBackgroundColor(preset.bg)
  }

  const handleExampleClick = (example: string) => {
    setInput(example)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">QR Code Generator</h1>
          <p className="text-lg text-gray-600">Generate QR codes from any text or URL instantly</p>
        </div>

        {/* Customization Section - Full Width at Top */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Customization
            </CardTitle>
            <CardDescription>Customize colors and style of your QR code</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Color Presets */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Color Presets</Label>
                <div className="grid grid-cols-2 gap-2">
                  {colorPresets.map((preset) => (
                    <Button
                      key={preset.name}
                      variant="outline"
                      size="sm"
                      onClick={() => applyColorPreset(preset)}
                      className="justify-start gap-2 h-8"
                    >
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-sm border" style={{ backgroundColor: preset.fg }} />
                        <div className="w-3 h-3 rounded-sm border" style={{ backgroundColor: preset.bg }} />
                      </div>
                      <span className="text-xs">{preset.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Colors */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fg-color">Foreground Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="fg-color"
                      type="color"
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="w-16 h-10 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="flex-1 font-mono text-sm"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bg-color">Background Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="bg-color"
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-16 h-10 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="flex-1 font-mono text-sm"
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>
              </div>

              {/* Style Options */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Size: {qrSize[0]}px</Label>
                  <Slider value={qrSize} onValueChange={setQrSize} max={500} min={200} step={50} className="w-full" />
                </div>

                <div className="space-y-2">
                  <Label>Margin: {margin[0]}px</Label>
                  <Slider value={margin} onValueChange={setMargin} max={10} min={0} step={1} className="w-full" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="error-level">Error Correction</Label>
                  <Select value={errorCorrectionLevel} onValueChange={setErrorCorrectionLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">Low (7%)</SelectItem>
                      <SelectItem value="M">Medium (15%)</SelectItem>
                      <SelectItem value="Q">Quartile (25%)</SelectItem>
                      <SelectItem value="H">High (30%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content - Input and QR Code Display */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                Input
              </CardTitle>
              <CardDescription>Enter any text, URL, or message to generate a QR code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text">Text</TabsTrigger>
                  <TabsTrigger value="url">URL</TabsTrigger>
                </TabsList>
                <TabsContent value="text" className="space-y-4">
                  <div>
                    <Label htmlFor="text-input">Text Message</Label>
                    <Textarea
                      id="text-input"
                      placeholder="Enter your text message here..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="url" className="space-y-4">
                  <div>
                    <Label htmlFor="url-input">Website URL</Label>
                    <Input
                      id="url-input"
                      type="url"
                      placeholder="https://example.com"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Quick Examples:</Label>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleExampleClick("https://github.com")}>
                    GitHub
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleExampleClick("Hello, World!")}>
                    Hello World
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleExampleClick("mailto:contact@example.com")}>
                    Email
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleExampleClick("tel:+1234567890")}>
                    Phone
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={clearInput} className="flex-1 bg-transparent">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Display Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5" />
                Generated QR Code
              </CardTitle>
              <CardDescription>Your customized QR code will appear here</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative w-full flex justify-center">
                  <div className="p-4 bg-white rounded-lg shadow-sm border">
                    <canvas
                      ref={canvasRef}
                      className={`block rounded-lg ${qrCodeUrl ? "shadow-md" : ""}`}
                      style={{
                        display: qrCodeUrl ? "block" : "none",
                        width: `${Math.min(qrSize[0], 280)}px`,
                        height: `${Math.min(qrSize[0], 280)}px`,
                        maxWidth: "100%",
                      }}
                    />
                    {!qrCodeUrl && !isGenerating && (
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50"
                        style={{
                          width: `${Math.min(qrSize[0], 280)}px`,
                          height: `${Math.min(qrSize[0], 280)}px`,
                          minWidth: "200px",
                          minHeight: "200px",
                        }}
                      >
                        <div className="text-center text-gray-500 p-4">
                          <div className="w-12 h-12 mx-auto mb-3 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Link className="h-6 w-6" />
                          </div>
                          <p className="text-sm font-medium">Enter text to generate</p>
                          <p className="text-xs text-gray-400 mt-1">QR code will appear here</p>
                        </div>
                      </div>
                    )}
                    {isGenerating && (
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50"
                        style={{
                          width: `${Math.min(qrSize[0], 280)}px`,
                          height: `${Math.min(qrSize[0], 280)}px`,
                          minWidth: "200px",
                          minHeight: "200px",
                        }}
                      >
                        <div className="text-center text-gray-500">
                          <RefreshCw className="h-6 w-6 mx-auto mb-2 animate-spin text-blue-500" />
                          <p className="text-sm font-medium">Generating...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {qrCodeUrl && (
                  <Button onClick={downloadQRCode} className="w-full max-w-xs" size="lg">
                    <Download className="h-4 w-4 mr-2" />
                    Download QR Code
                  </Button>
                )}

                {input && (
                  <div className="w-full p-4 bg-gray-50 rounded-lg border">
                    <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Content</Label>
                    <p className="text-sm text-gray-800 break-all mt-2 leading-relaxed">{input}</p>
                  </div>
                )}

                {/* Color Preview */}
                <div className="w-full p-4 bg-gray-50 rounded-lg border">
                  <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Color Scheme</Label>
                  <div className="flex items-center justify-center gap-6 mt-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: foregroundColor }}
                      />
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Foreground</p>
                        <p className="text-xs font-mono font-medium">{foregroundColor}</p>
                      </div>
                    </div>
                    <div className="w-px h-8 bg-gray-300"></div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded-full border-2 border-gray-200 shadow-sm"
                        style={{ backgroundColor: backgroundColor }}
                      />
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Background</p>
                        <p className="text-xs font-mono font-medium">{backgroundColor}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium">Real-time Generation</h4>
                  <p className="text-gray-600">QR codes update instantly as you customize</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium">Color Customization</h4>
                  <p className="text-gray-600">Choose any colors or use preset themes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium">Style Options</h4>
                  <p className="text-gray-600">Adjust size, margin, and error correction</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium">Download Ready</h4>
                  <p className="text-gray-600">High-quality PNG with custom styling</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
