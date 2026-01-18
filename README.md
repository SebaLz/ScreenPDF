# 📄 ScreenPDF

**Fast, Private, and Zero-Server Image-to-PDF Converter.**

Most "free" PDF converters on the web require you to upload your sensitive documents to their servers. **ScreenPDF is different.** It performs 100% of the processing locally in your browser. Your images never leave your device, and your data stays yours.

[**Go to Workspace**](https://screenpdf.sebastianalcaraz.com)

---

## ✨ Why ScreenPDF?

- **🔒 Privacy by Design**: No uploads, no servers, no data collection. Just pure client-side magic.
- **⚡ Instant Processing**: Since there's no upload/download latency, generating PDFs is near-instant.
- **🛠️ Built-in Editor**: Crop, rotate, and reorder your images before exporting.
- **📱 Mobile Friendly**: Designed to work as well on your phone as it does on your desktop.

## 🚀 Features

- **Drag & Drop Workspace**: Simply throw your JPG, PNG, or WebP files in.
- **Smart Reordering**: Move pages around with an intuitive drag-and-drop queue.
- **Precise Editing**:
  - Presets for A4, 16:9, 4:3, or free-form cropping.
  - Quick 90° rotations.
  - Zoom and pan for the perfect frame.
- **Customizable Exports**:
  - Multiple page sizes: A4, US Letter, or "Auto" to match your image dimensions.
  - Control margins (None, Small, Medium).
  - "Contain" or "Cover" image fit modes.

## 🛠️ Built With

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **PDF Engine**: [pdf-lib](https://pdf-lib.js.org/) & [pdfjs-dist](https://mozilla.github.io/pdf.js/)
- **State**: [Zustand](https://github.com/pmndrs/zustand)
- **Drag & Drop**: [dnd-kit](https://dnd-kit.com/)
- **Image Editing**: [react-easy-crop](https://github.com/ValentinH/react-easy-crop)

## 💻 Local Development

Want to run it yourself?

1. **Clone & Install**
   ```bash
   git clone https://github.com/SebaLz/screenpdf.git
   cd screenpdf
   npm install
   ```

2. **Run Dev Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## 📝 How it works 

ScreenPDF uses the browser's **Canvas API** to handle image transformations (crops/rotations) and **pdf-lib** to assemble the final document. By leveraging **Local Object URLs**, we can preview and manipulate large images without ever sending a single byte over the network.

---

Built with ❤️ by [Sebastian Alcaraz](https://sebastianalcaraz.com)
🐙 [@SebaLz](https://github.com/SebaLz/) | 💼 [LinkedIn](https://www.linkedin.com/in/sebastian-alcaraz/)
